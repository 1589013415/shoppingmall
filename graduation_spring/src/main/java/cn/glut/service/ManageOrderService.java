package cn.glut.service;

import cn.glut.pojo.OrderFornt;

import java.util.List;

public interface ManageOrderService {
    public List<OrderFornt> listOrderManage(OrderFornt orderFornt) throws Exception;
    void deleteOrder(OrderFornt orderFornt) throws Exception;
}
