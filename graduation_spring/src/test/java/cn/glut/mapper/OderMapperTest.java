package cn.glut.mapper;

import cn.glut.config.SpringConfig;
import cn.glut.pojo.Order;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class OderMapperTest {
    @Autowired
    private OrderMapper orderMapper;
    @Test
    public void createOrder() throws ParseException {
        BigInteger userpalyid=new BigInteger("9");
        BigInteger sellerid=new BigInteger("1");
        BigInteger commodityid=new BigInteger("5");
        long timestamp = System.currentTimeMillis();
        String orderid=userpalyid+""+commodityid+""+sellerid+""+timestamp;

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String createTime = simpleDateFormat.format(new Date());

        Order order = new Order();
        order.setOrderid(orderid);
        order.setOrderstate(0);
        order.setCreatetime(createTime);
        order.setUserplayid(userpalyid);
        order.setSellerid(sellerid);
        order.setCommodityid(commodityid);
        order.setPrice(1);
        order.setPayment(0);
        order.setPaystate(1);
        orderMapper.createOrder(order);
    }
    @Test
    public void getOrderById(){
        List<Order> oderBySellerId = orderMapper.getOderBySellerId(new BigInteger("2"));
        System.out.println(oderBySellerId);
    }
}
