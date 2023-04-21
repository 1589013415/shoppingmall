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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
            order.setDeletemarkbuyer(false);
            order.setDeletemarkseller(false);
            order.setBuyerok(false);
            order.setSellerok(false);
            order.setFinishtime("0000-00-00 00:00:00");
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
            if(order.isDeletemarkbuyer())continue;
            order.setStateMsg(order.getPaystate());
            order.setCanReturn(isReturn(order));
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
            if(order.isDeletemarkseller())continue;
            order.setStateMsg(order.getPaystate());
            order.setCanReturn(isReturn(order));
            orders.add(order);
        }
        return orders;
    }

    @Override
    public boolean buyerReceipt(String orderId) throws Exception {
        Order order = orderMapper.getOrderByOrderId(orderId);
        order.setBuyerok(true);
        if(order.isSellerok()){
            order.setPaystate(1);//完成
            long timestamp = System.currentTimeMillis();
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String createTime = simpleDateFormat.format(new Date());
            order.setFinishtime(createTime);
        };

        orderMapper.updateOrder(order);
        return true;
    }

    @Override
    public boolean sellerSend(String orderId) throws Exception {
        Order order = orderMapper.getOrderByOrderId(orderId);
        order.setSellerok(true);
        if(order.isBuyerok()){
            order.setPaystate(1);//完成
            long timestamp = System.currentTimeMillis();
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String createTime = simpleDateFormat.format(new Date());
            order.setFinishtime(createTime);
        };
        orderMapper.updateOrder(order);
        return true;
    }

    @Override
    public boolean refund(String orderId) throws Exception {
        Order order = orderMapper.getOrderByOrderId(orderId);
            order.setPaystate(2);
            orderMapper.updateOrder(order);
            return true;
    }

    @Override
    public boolean deleteOrderBuyer(String orderId) throws Exception {
        Order order = orderMapper.getOrderByOrderId(orderId);
        if(order.getPaystate()!=1)throw new Exception("订单未完成，无法删除订单");
        order.setDeletemarkbuyer(true);
        orderMapper.updateOrder(order);
        return true;
    }

    private boolean isReturn(Order order){
        String finishtime = order.getFinishtime();
        if(finishtime.equals("0000-00-00 00:00:00")||finishtime==null){
            return true;
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date parse = simpleDateFormat.parse(finishtime);
            long time = parse.getTime();
            long l = System.currentTimeMillis();
            long result=time-l;
            long day = TimeUnit.MILLISECONDS.toDays(result);
            if(day<3){
                return true;
            }else {
                return false;
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
