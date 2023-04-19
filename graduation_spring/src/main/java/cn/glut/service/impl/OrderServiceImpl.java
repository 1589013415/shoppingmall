package cn.glut.service.impl;

import cn.glut.mapper.CommodityMapper;
import cn.glut.mapper.OrderMapper;
import cn.glut.mapper.UserMsgMapper;
import cn.glut.pojo.Commodity;
import cn.glut.pojo.Order;
import cn.glut.pojo.User;
import cn.glut.pojo.UserMsg;
import cn.glut.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderMapper orderMapper;
    @Autowired
    CommodityMapper commodityMapper;
    @Autowired
    UserMsgMapper userMsgMapper;
    @Override
    public Order createOrder(User user,Commodity commodity) {
        if(user==null||commodity==null)return null;
        BigInteger userPayId=user.getUserId();
        BigInteger sellerId=commodity.getUserid();
        String buyerName = userMsgMapper.getUserMsg(userPayId).getNickname();
        String sellerName = userMsgMapper.getUserMsg(sellerId).getNickname();
        BigInteger commodityId=commodity.getCommodityid();
        String commodityname = commodity.getCommodityname();
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
            order.setBuyername(buyerName);
            order.setSellername(sellerName);
            order.setCommodityname(commodityname);
            orderMapper.createOrder(order);
            return order;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Order> getOrderListByBuyerId(BigInteger id) {
        ArrayList<Order> orders = new ArrayList<>();
        List<Order> baseOrders = orderMapper.getOderByUserplayId(id);
        for (Order order:baseOrders
             ) {
            order.setStateMsg(order.getPaystate());
            orders.add(order);
        }
        return orders;
    }

    @Override
    public List<Order> getOrderListBySellerId(BigInteger id) {
        ArrayList<Order> orders = new ArrayList<>();
        List<Order> baseOrders = orderMapper.getOderBySellerId(id);
        for (Order order:baseOrders
        ) {
            order.setStateMsg(order.getPaystate());
            orders.add(order);
        }
        return orders;
    }

}
