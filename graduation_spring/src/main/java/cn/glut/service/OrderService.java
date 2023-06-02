package cn.glut.service;

import cn.glut.pojo.Commodity;
import cn.glut.pojo.Order;
import cn.glut.pojo.OrderFornt;
import cn.glut.pojo.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;


public interface OrderService {
    public Order createOrder(User user, Commodity commodity);
    public List<Order> getOrderListByBuyerId(BigInteger id);
    public List<Order> getOrderListBySellerId(BigInteger id);
    public boolean buyerReceipt(String orderId) throws Exception;
    public boolean sellerSend(String orderId) throws Exception;
    public boolean refund(String orderId) throws Exception;
    @Transactional
    public boolean confirmRefund(String orderId) throws Exception;
    public boolean deleteOrder(OrderFornt orderFornt) throws Exception;
}
