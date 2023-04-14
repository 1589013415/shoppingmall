package cn.glut.mapper;

import cn.glut.pojo.UserMsg;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.math.BigInteger;

public interface UserMsgMapper {
    @Select("select *from usermsg where userid=#{userid}")
    public UserMsg getUserMsg(BigInteger userid);

    @Insert("insert usermsg (userid,nickname,photo,email,address) values (#{userid},#{nickname},#{photo},#{email},#{address})")
    public void addUserMsg(UserMsg userMsg);

    @Update("update usermsg set nickname=#{nickname},photo=#{photo},email=#{email},address=#{address},money=#{money} where userid=#{userid}")
    public void updateUserMsg(UserMsg userMsg);
}
