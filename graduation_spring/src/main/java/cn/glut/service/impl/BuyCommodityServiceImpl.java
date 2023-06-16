package cn.glut.service.impl;

import cn.glut.mapper.CommodityMapper;
import cn.glut.mapper.UserMsgMapper;
import cn.glut.pojo.*;
import cn.glut.service.BuyCommodityService;
import cn.glut.service.CommodityService;
import cn.glut.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DecimalFormat;
import java.util.Iterator;
import java.util.List;

@Service
public class BuyCommodityServiceImpl implements BuyCommodityService {
    @Autowired
    CommodityMapper commodityMapper;
    @Autowired
    UserMsgMapper userMsgMapper;
    @Autowired
    RedisTemplate redisTemplate;
    @Autowired
    CommodityService commodityService;
    @Autowired
    OrderService orderService;
    @Autowired
    BuyCommodityService buyCommodityService;

    /**
     * state
     * 0:你不能购自己的商品；1：商品已出售；2：用户余额不足；200：成功
     */
    @Override
    public ResultMsg buyCommodity(BuyCommodityMsg buyCommodityMsg, User buyUser) {
        ResultMsg resultMsg = new ResultMsg();
        Commodity commodity = commodityMapper.getCommodityByCommodityId(new BigInteger(buyCommodityMsg.getCommodityId()));//获得购买商品信息
        UserMsg seller = userMsgMapper.getUserMsg(new BigInteger(buyCommodityMsg.getSellerId()));//获得卖家信息
        UserMsg buyer = userMsgMapper.getUserMsg(buyUser.getUserId());
        resultMsg.setSuccess(false);
        if (buyCommodityMsg.getSellerId().equals(buyUser.getUserId() + "")) {
            resultMsg.setState(0);
            resultMsg.setMsg("你不能购自己的商品");
            return resultMsg;
        }
        if(commodity.getIspay()==1){
            resultMsg.setState(1);
            resultMsg.setMsg("商品已出售");
            return resultMsg;
        }
        if(commodity.getState()==1&&commodity.getIspay()==0){
            try {
                buyCommodityService.afterAOPBuyAction(commodity,seller,buyer,buyUser);
                resultMsg.setSuccess(true);
                resultMsg.setState(200);
                resultMsg.setMsg("购买成功");
            } catch (Exception e) {
                resultMsg.setState(2);
                resultMsg.setMsg(e.getMessage());
            }
        }
        return resultMsg;
    }

    @Transactional
    public void afterAOPBuyAction(Commodity commodity,UserMsg seller,UserMsg buyer,User buyUser) throws Exception{
        DecimalFormat df =new DecimalFormat("#.00");
        BigDecimal price = new BigDecimal(df.format(commodity.getPrice()));
        BigDecimal sellerMoney = new BigDecimal(df.format(seller.getMoney()));
        BigDecimal buyerMoney = new BigDecimal(df.format(buyer.getMoney()));
        double buyerBalance = buyerMoney.subtract(price).doubleValue();
        double sellerBalance=sellerMoney.add(price).doubleValue();
        if(buyerBalance>=0){
            buyer.setMoney(buyerBalance);
            seller.setMoney(sellerBalance);
            commodity.setIspay(1);
            commodity.setState(3);//支付中
            commodityMapper.updateCommodity(commodity);
            userMsgMapper.updateUserMsg(seller);
            userMsgMapper.updateUserMsg(buyer);

            orderService.createOrder(buyUser,commodity);
        }else {
            throw new Exception("用户余额不足");
        }
    }
}
