package cn.glut.service.impl;

import cn.glut.mapper.CommodityMapper;
import cn.glut.mapper.OrderMapper;
import cn.glut.mapper.UserMapper;
import cn.glut.pojo.Order;
import cn.glut.pojo.OrderFornt;
import cn.glut.pojo.User;
import cn.glut.service.ManageOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
@Service
public class ManageOrderServiceImpl implements ManageOrderService {
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private CommodityMapper commodityMapper;
    @Override
    public List<OrderFornt> listOrderManage(OrderFornt orderFornt) throws Exception {
        orderFornt=process(orderFornt);
        ArrayList<OrderFornt> list = new ArrayList<OrderFornt>();
        List<Order> orders=null;
        String stateMsg = orderFornt.getStateMsg();
        if(stateMsg!=null&&orderFornt.getStateMsg().equals("初始化")){
            orders = orderMapper.listAllOrder();
        }else {
                orders=orderMapper.listOrderBySearch(orderFornt);
        }
        for (Order order:orders
        ) {
            User buyerUserObj = userMapper.getUserByUserId(order.getUserplayid());
            User sellerUserObj = userMapper.getUserByUserId(order.getSellerid());
            order.setStateMsg(order.getPaystate());
            OrderFornt orderForntNew = new OrderFornt();
            orderForntNew.setOrderid(order.getOrderid());
            orderForntNew.setOrderstate(order.getStateMsg());
            orderForntNew.setCreatetime(order.getCreatetime());
            orderForntNew.setFinishtime(order.getFinishtime());
            orderForntNew.setUsername(buyerUserObj.getUserName());
            orderForntNew.setSellerUsername(sellerUserObj.getUserName());
            orderForntNew.setPrice(String.valueOf(order.getPrice()));
            list.add(orderForntNew);
        }
        return list;
    }

    @Transactional
    @Override
    public void deleteOrder(OrderFornt orderFornt) throws Exception {
        Order order = orderMapper.getOrderByOrderId(orderFornt.getOrderid());
        if(order==null) throw new Exception("订单不存在");
        if(order.getPaystate()==1){//已完成的订单,需要删除商品
            orderMapper.deleteOrderByOrderId(order.getOrderid());
            commodityMapper.deleteCommodity(order.getCommodityid());
            return;
        }
        if(order.getPaystate()==3){//退款的不用删除商品
            orderMapper.deleteOrderByOrderId(order.getOrderid());
            return;
        }
        throw new Exception("订单未完成无法删除");
    }

    private OrderFornt process(OrderFornt orderFornt){
        String username = orderFornt.getUsername();
        String sellerUsername = orderFornt.getSellerUsername();
        if(orderFornt.getOrderstate()!=null&&orderFornt.getOrderstate().equals("all"))orderFornt.setOrderstate(null);
        if(username!=null&&!username.equals("")){
            User buyerUser = userMapper.getUserByUsername(username);
            if(buyerUser!=null){
                orderFornt.setUserplayid(String.valueOf(buyerUser.getUserId()));
            }else {
                orderFornt.setUserplayid(" ");
            }

        }
        if(sellerUsername!=null&&!sellerUsername.equals("")){
            User sellerUser = userMapper.getUserByUsername(sellerUsername);
            if(sellerUser!=null){
                orderFornt.setSellerid(String.valueOf(sellerUser.getUserId()));
            }else {
                orderFornt.setSellerid(" ");
            }
        }
        return orderFornt;
    }
}
