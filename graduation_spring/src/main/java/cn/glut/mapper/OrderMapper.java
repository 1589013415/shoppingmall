package cn.glut.mapper;

import cn.glut.pojo.Order;
import cn.glut.pojo.OrderFornt;
import org.apache.ibatis.annotations.Delete;
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
    void createOrder(Order order);

    @Select("select *from `order` where orderid=#{orderId}")
    Order getOrderByOrderId(String orderId);
    @Select("select *from `order` where commodityid=#{commodityid}")
    Order getOrderByCommodityId(String commodityid);
    @Select ("select *from `order` where userplayid=#{userplayId}")
    List<Order> getOderByUserplayId(BigInteger userplayId);
    @Select ("select *from `order` where sellerid=#{sellerId}")
    List<Order> getOderBySellerId(BigInteger sellerId);
    @Select("select *from `order`")
    List<Order> listAllOrder();
    @Select("<script>select * from `order` where 1=1 " +
            "<if test=\"userplayid !=null \">and userplayid = #{userplayid} </if>" +
            "<if test=\"sellerid !=null \">and sellerid = #{sellerid} </if>" +
            "<if test=\"orderstate !=null \">and paystate = #{orderstate} </if>" +
            "<if test=\"orderid !=null and orderid!=&quot;&quot;\">and orderid = #{orderid} </if>" +
            "</script>"
    )
    List<Order> listOrderBySearch(OrderFornt orderFornt);
    @Update("update `order` set orderstate=#{orderstate}," +
            "createtime=#{createtime},userplayid=#{userplayid},sellerid=#{sellerid}," +
            "commodityid=#{commodityid},price=#{price},paystate=#{paystate}," +
            "sellername=#{sellername},buyername=#{buyername},finishtime=#{finishtime}," +
            "deletemarkbuyer=#{deletemarkbuyer},deletemarkseller=#{deletemarkseller},buyerok=#{buyerok},sellerok=#{sellerok} " +
            "where orderid=#{orderid}")
    void updateOrder(Order order);
    @Delete("delete from `order` where orderid=#{orderid}")
    void deleteOrderByOrderId(String orderid);
}
