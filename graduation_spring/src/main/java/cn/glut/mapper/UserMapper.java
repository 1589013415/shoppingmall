package cn.glut.mapper;

import cn.glut.pojo.User;
import cn.glut.pojo.UserMsg;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.math.BigInteger;
import java.util.List;

public interface UserMapper {
    @Select("select userid,username,userpassword,roleid,email,state,islogin from user where userid=#{userid}")
    public User getUserByUserId(BigInteger userid);
    @Select("select userid,username,userpassword,roleid,email,state,islogin from user where username=#{userName}")
    public User getUserByUsername(String username);
    @Select("select userid,username,userpassword,roleid,email,state,islogin from user")
    public List<User> getUserAll();

    @Select("select *from usermsg where userid=#{userid}")
    public UserMsg getUserMsg(BigInteger userid );

    @Update("insert into user (username,userpassword,roleid,email,state,islogin) values (#{userName},#{userPassword},#{roleId},#{email},#{state},#{isLogin})")
    public void addUser(User user);
    @Update("update user set username=#{userName},userpassword=#{userPassword},roleid=#{roleId},email=#{email},state=#{state},islogin=#{isLogin} where userid=#{userId}")
    public void updateUser(User user);
    @Insert("insert usermsg (userid,nickname,photo,email,address) values (#{userid},#{nickname},#{photo},#{email},#{address})")
    public void addUserMsg(UserMsg userMsg);
}
