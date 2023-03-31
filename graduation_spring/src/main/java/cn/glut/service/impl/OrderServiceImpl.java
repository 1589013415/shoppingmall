package cn.glut.service.impl;

import cn.glut.mapper.CommodityMapper;
import cn.glut.mapper.OrderMapper;
import cn.glut.pojo.Commodity;
import cn.glut.pojo.Order;
import cn.glut.pojo.User;
import cn.glut.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Date;
@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderMapper orderMapper;
    @Autowired
    CommodityMapper commodityMapper;
    @Override
    public Order createOrder(User user,Commodity commodity) {
        if(user==null||commodity==null)return null;
        BigInteger userPayId=user.getUserId();
        BigInteger sellerId=commodity.getUserid();
        BigInteger commodityId=commodity.getCommodityid();
        long timestamp = System.currentTimeMillis();
        String orderId=userPayId+""+commodityId+""+sellerId+""+timestamp;
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
            orderMapper.createOrder(order);
            return order;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
