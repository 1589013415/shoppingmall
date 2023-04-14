package cn.glut.mapper;

import cn.glut.pojo.Commodity;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.math.BigInteger;
import java.util.List;

public interface CommodityMapper {
    @Select("select *from commodity")
    public List<Commodity> getCommodityAll();
    @Select("select *from commodity where userid=#{userid}")
    public List<Commodity> getCommodityByuserid(BigInteger userid);
    @Select("select *from commodity where classifyid=#{classifyid} ")
    public List<Commodity>  getCommoditiesByClassifyId(BigInteger classifyId);
    @Select("select *from commodity where commodityid=#{commodityid}")
    public Commodity getCommodityByCommodityId(BigInteger commodityid);

    @Select("select *from commodity where commodityname like concat('%',#{searchValue},'%') or detail like concat('%',#{searchValue},'%')")
    public List<Commodity> getCommoditySearch(String searchValue);
    @Update("insert into commodity(commodityid,userid,classifyid,commodityname,image,detail,price) " +
    "values (#{commodityid},#{userid},#{classifyid},#{commodityname},#{image},#{detail},#{price})")
    public void addCommodity(Commodity commodity);

    @Update("update commodity set userid=#{userid},classifyid=#{classifyid},commodityname=#{commodityname},image=#{image}, " +
            "detail=#{detail},price=#{price},state=#{state},ispay=#{ispay},failbecause=#{failbecause} " +
            "where commodityid=#{commodityid}")
    public void updateCommodity(Commodity commodity);

    @Delete("delete from commodity where commodityid =#{commodityid}")
    public void deleteCommodity(BigInteger commoidtyid);
}
