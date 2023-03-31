package cn.glut.service;

import cn.glut.pojo.Commodity;
import cn.glut.pojo.Order;
import cn.glut.pojo.User;
import org.springframework.stereotype.Service;

import java.math.BigInteger;


public interface OrderService {
    public Order createOrder(User user, Commodity commodity);
}
