package cn.glut.mapper;

import cn.glut.pojo.Order;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.math.BigInteger;
import java.util.List;

public interface OrderMapper {
    @Insert("insert `order` (orderid,orderstate,createtime,userplayid,sellerid,commodityid,commodityname,price,paystate," +
            "sellername,buyername,finishtime,deletemarkbuyer,deletemarkseller,buyerok,sellerok) " +
            "values (#{orderid},#{orderstate},#{createtime},#{userplayid},#{sellerid},#{commodityid},#{commodityname},#{price}," +
            "#{paystate},#{sellername},#{buyername},#{finishtime},#{deletemarkbuyer},#{deletemarkseller},#{buyerok},#{sellerok})")
    public void createOrder(Order order);

    @Select("select *from `order` where orderid=#{orderId}")
    public Order getOrderByOrderId(String orderId);
    @Select ("select *from `order` where userplayid=#{userplayId}")
    public List<Order> getOderByUserplayId(BigInteger userplayId);
    @Select ("select *from `order` where sellerid=#{sellerId}")
    public List<Order> getOderBySellerId(BigInteger sellerId);
    @Update("update `order` set orderstate=#{orderstate}," +
            "createtime=#{createtime},userplayid=#{userplayid},sellerid=#{sellerid}," +
            "commodityid=#{commodityid},price=#{price},paystate=#{paystate}," +
            "sellername=#{sellername},buyername=#{buyername},finishtime=#{finishtime}," +
            "deletemarkbuyer=#{deletemarkbuyer},deletemarkseller=#{deletemarkseller},buyerok=#{buyerok},sellerok=#{sellerok} " +
            "where orderid=#{orderid}")
    public void updateOrder(Order order);
}
