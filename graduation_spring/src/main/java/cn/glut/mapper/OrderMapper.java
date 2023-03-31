package cn.glut.mapper;

import cn.glut.pojo.Order;
import com.alipay.api.domain.OdAnalysisLineInfo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.math.BigInteger;

public interface OrderMapper {
    @Insert("insert `order` (orderid,orderstate,createtime,userplayid,sellerid,commodityid,price,payment,paystate,paytime) " +
            "values (#{orderid},#{orderstate},#{createtime},#{userplayid},#{sellerid},#{commodityid},#{price},#{payment},#{paystate},#{paytime})")
    public void createOrder(Order order);
    @Select("select *from `order` wherer orderid=#{orderId}")
    public Order getOrderByOrderId(String orderId);
    @Update("update `order` set orderid=#{orderid},orderstate=#{orderstate},createtime=#{createtime},userplayid=#{userplayid},sellerid=#{sellerid},commodityid=#{commodityid},price=#{price},payment=#{payment},paystate=#{paystate},paytime=#{paytime}")
    public void updateOrder(Order order);
}
