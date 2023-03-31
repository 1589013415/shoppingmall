package cn.glut.mapper;

import cn.glut.pojo.Classify;
import org.apache.ibatis.annotations.Select;

import java.math.BigInteger;
import java.util.List;

public interface ClassifyMapper {
    @Select("select *from classify")
    public List<Classify> getClassifyAll();
    @Select("select id from classify where `key`=#{key}")
    public BigInteger getClassifyId(String key);
    @Select("select classname from classify where id=#{id}")
    public String getClassname(BigInteger id);
    @Select("select id from classify where classname=#{className}")
    public BigInteger getClassifyIdByClassName(String className);
}
