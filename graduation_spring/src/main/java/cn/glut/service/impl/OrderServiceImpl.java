package cn.glut.service.impl;

import cn.glut.mapper.CommodityMapper;
import cn.glut.mapper.OrderMapper;
import cn.glut.mapper.UserMsgMapper;
import cn.glut.pojo.*;
import cn.glut.service.CommodityService;
import cn.glut.service.OrderService;
import cn.glut.util.RedisUtil;
import cn.glut.util.VerifyUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderMapper orderMapper;
    @Autowired
    CommodityMapper commodityMapper;
    @Autowired
    UserMsgMapper userMsgMapper;
    @Autowired
    RedisTemplate redisTemplate;
    @Autowired
    CommodityService commodityService;

    @Override
    public Order createOrder(User user, Commodity commodity) {
        if (user == null || commodity == null) return null;
        BigInteger userPayId = user.getUserId();
        BigInteger sellerId = commodity.getUserid();
        String buyerName = userMsgMapper.getUserMsg(userPayId).getNickname();
        String sellerName = userMsgMapper.getUserMsg(sellerId).getNickname();
        BigInteger commodityId = commodity.getCommodityid();
        String commodityname = commodity.getCommodityname();
        long timestamp = System.currentTimeMillis();
        String orderId = userPayId + "" + commodityId + "" + sellerId + "" + timestamp;
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String createTime = simpleDateFormat.format(new Date());
        try {
            Order order = new Order();
            order.setOrderid(orderId);
            order.setOrderstate(1);//0,关闭，1为开启
            order.setCreatetime(createTime);
            order.setUserplayid(userPayId);
            order.setSellerid(sellerId);
            order.setCommodityid(commodityId);
            order.setPrice(commodity.getPrice());
            order.setBuyername(buyerName);
            order.setSellername(sellerName);
            order.setCommodityname(commodityname);
            order.setDeletemarkbuyer(false);
            order.setDeletemarkseller(false);
            order.setBuyerok(false);
            order.setSellerok(false);
            order.setFinishtime("0000-00-00 00:00:00");
            orderMapper.createOrder(order);
            return order;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Order> getOrderListByBuyerId(BigInteger id) {
        ArrayList<Order> orders = new ArrayList<>();
        List<Order> baseOrders = orderMapper.getOderByUserplayId(id);
        for (Order order : baseOrders
        ) {
            if (order.isDeletemarkbuyer()) continue;
            order.setStateMsg(order.getPaystate());
            order.setCanReturn(VerifyUtil.isReturn(order));
            orders.add(order);
        }
        return orders;
    }

    @Override
    public List<Order> getOrderListBySellerId(BigInteger id) {
        ArrayList<Order> orders = new ArrayList<>();
        List<Order> baseOrders = orderMapper.getOderBySellerId(id);
        for (Order order : baseOrders
        ) {
            if (order.isDeletemarkseller()) continue;
            order.setStateMsg(order.getPaystate());
            order.setCanReturn(VerifyUtil.isReturn(order));
            orders.add(order);
        }
        return orders;
    }

    @Override
    public boolean buyerReceipt(String orderId) throws Exception {
        Order order = orderMapper.getOrderByOrderId(orderId);
        order.setBuyerok(true);
        if (order.isSellerok()) {
            order.setPaystate(1);//完成
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String createTime = simpleDateFormat.format(new Date());
            order.setFinishtime(createTime);
            Commodity commodity = commodityMapper.getCommodityByCommodityId(order.getCommodityid());
            commodity.setState(4);
            commodityMapper.updateCommodity(commodity);
        }
        ;

        orderMapper.updateOrder(order);
        return true;
    }

    @Override
    public boolean sellerSend(String orderId) throws Exception {
        Order order = orderMapper.getOrderByOrderId(orderId);
        order.setSellerok(true);
        if (order.isBuyerok()) {
            order.setPaystate(1);//完成
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String createTime = simpleDateFormat.format(new Date());
            order.setFinishtime(createTime);
            Commodity commodity = commodityMapper.getCommodityByCommodityId(order.getCommodityid());
            commodity.setState(4);
            commodityMapper.updateCommodity(commodity);
        }
        ;
        orderMapper.updateOrder(order);
        return true;
    }

    @Override
    public boolean refund(String orderId) throws Exception {
        Order order = orderMapper.getOrderByOrderId(orderId);
        Commodity commodity = commodityMapper.getCommodityByCommodityId(order.getCommodityid());
        commodity.setState(3);
        commodityMapper.updateCommodity(commodity);
        order.setPaystate(2);
        orderMapper.updateOrder(order);
        return true;
    }

    @Override
    public boolean confirmRefund(String orderId) throws Exception {
        Order order = orderMapper.getOrderByOrderId(orderId);
        order.setPaystate(3);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String createTime = simpleDateFormat.format(new Date());
        order.setFinishtime(createTime);
        UserMsg buyerMsg = userMsgMapper.getUserMsg(order.getUserplayid());
        UserMsg sellerMsg = userMsgMapper.getUserMsg(order.getSellerid());
        Commodity commodity = commodityMapper.getCommodityByCommodityId(order.getCommodityid());
        commodity.setState(1);
        commodity.setIspay(0);
        double price = order.getPrice();
        DecimalFormat df = new DecimalFormat("#.00");
        BigDecimal p = new BigDecimal(df.format(price));
        BigDecimal buyerMoney = new BigDecimal(df.format(buyerMsg.getMoney()));
        BigDecimal sellerMoney = new BigDecimal(df.format(sellerMsg.getMoney()));
        double buyerBalance = buyerMoney.add(p).doubleValue();
        double sellerBalance = sellerMoney.subtract(p).doubleValue();
        if (sellerBalance > 0) {
            buyerMsg.setMoney(buyerBalance);
            sellerMsg.setMoney(sellerBalance);
            userMsgMapper.updateUserMsg(buyerMsg);
            userMsgMapper.updateUserMsg(sellerMsg);
            orderMapper.updateOrder(order);
            commodityMapper.updateCommodity(commodity);
            clearCommodityCache();
        } else {
            throw new Exception("你的账户余额不足，无法确认退款");
        }
        order.setPaystate(1);

        return false;
    }

    @Override
    public boolean deleteOrder(OrderFornt orderFornt) throws Exception {
        String flag = orderFornt.getFlag();
        Order order = orderMapper.getOrderByOrderId(orderFornt.getOrderid());
        if (order.getPaystate() != 1) throw new Exception("订单未完成，无法删除订单");
        if(flag.equals("buyer")){
            order.setDeletemarkbuyer(true);
        }else if(flag.equals("seller")){
            order.setDeletemarkseller(true);
        }else {
            throw new Exception("删除订单失败，错误请求");
        }
        orderMapper.updateOrder(order);
        return true;
    }

//    private boolean isReturn(Order order) {
//        String finishtime = order.getFinishtime();
//        if (finishtime.equals("0000-00-00 00:00:00") || finishtime == null) {
//            return true;
//        }
//        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        try {
//            Date parse = simpleDateFormat.parse(finishtime);
//            long time = parse.getTime();
//            long l = System.currentTimeMillis();
//            long result = time - l;
//            long day = TimeUnit.MILLISECONDS.toDays(result);
//            if (day < 3) {
//                return true;
//            } else {
//                return false;
//            }
//        } catch (ParseException e) {
//            throw new RuntimeException(e);
//        }
//    }

    private void clearCommodityCache() {
        List<Classify> classify = commodityService.getClassify();
        Iterator<Classify> iterator = classify.iterator();
        while (iterator.hasNext()) {
            Classify classifyObj = iterator.next();
            redisTemplate.delete("commoditiesList" + classifyObj.getKey());
        }
        redisTemplate.delete("commoditiesListall");
    }
}
