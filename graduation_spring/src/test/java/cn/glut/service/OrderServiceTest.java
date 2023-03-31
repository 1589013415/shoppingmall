package cn.glut.service;

import cn.glut.config.SpringConfig;
import cn.glut.mapper.CommodityMapper;
import cn.glut.mapper.UserMapper;
import cn.glut.pojo.Commodity;
import cn.glut.pojo.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigInteger;

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
//        User userByUserId = userMapper.getUserByUserId(new BigInteger("1"));
//        Commodity commodityByCommodityId = commodityMapper.getCommodityByCommodityId(new BigInteger("1"));
//        boolean order = orderService.createOrder(userByUserId, commodityByCommodityId);
//        System.out.println(order);
    }
}
