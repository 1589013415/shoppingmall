package cn.glut.service;

import cn.glut.config.SpringConfig;
import cn.glut.mapper.CommodityMapper;
import cn.glut.mapper.UserMapper;
import cn.glut.pojo.Commodity;
import cn.glut.pojo.Order;
import cn.glut.pojo.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigInteger;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes= SpringConfig.class)
public class OrderServiceTest {
    @Autowired
    OrderService orderService;
    @Autowired
    UserMapper userMapper;
    @Autowired
    CommodityMapper commodityMapper;
    @Test
    public void createOder(){
        System.out.println("测试git提交");
    }
    @Test
    public void getOrders(){
        List<Order> orderListBySellerId = orderService.getOrderListBySellerId(new BigInteger("2"));
        System.out.println(orderListBySellerId);
    }
}
