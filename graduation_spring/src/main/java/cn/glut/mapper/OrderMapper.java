package cn.glut.mapper;

import cn.glut.pojo.Order;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.math.BigInteger;
import java.util.List;

public interface OrderMapper {
    @Insert("insert `order` (orderid,orderstate,createtime,userplayid,sellerid,commodityid,commodityname,price,payment,paystate,paytime," +
            "sellername,buyername) " +
            "values (#{orderid},#{orderstate},#{createtime},#{userplayid},#{sellerid},#{commodityid},#{commodityname},#{price},#{payment}," +
            "#{paystate},#{paytime},#{sellername},#{buyername})")
    public void createOrder(Order order);

    @Select("select *from `order` wherer orderid=#{orderId}")
    public Order getOrderByOrderId(String orderId);
    @Select ("select *from `order` where userplayid=#{userplayId}")
    public List<Order> getOderByUserplayId(BigInteger userplayId);
    @Select ("select *from `order` where sellerid=#{sellerId}")
    public List<Order> getOderBySellerId(BigInteger sellerId);
    @Update("update `order` set orderid=#{orderid},orderstate=#{orderstate},createtime=#{createtime},userplayid=#{userplayid},sellerid=#{sellerid},commodityid=#{commodityid},price=#{price},payment=#{payment},paystate=#{paystate},paytime=#{paytime}")
    public void updateOrder(Order order);
}
