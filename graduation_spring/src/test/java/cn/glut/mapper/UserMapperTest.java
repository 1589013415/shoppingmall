package cn.glut.mapper;

import cn.glut.config.SpringConfig;
import cn.glut.mapper.UserMapper;
import cn.glut.pojo.User;
import cn.glut.pojo.UserMsg;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigInteger;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class UserMapperTest {
    @Autowired
    private UserMapper userMapper;

    @Test
    public void getUserById(){
        String str="222240";
        BigInteger id=new BigInteger(str);
        System.out.println(userMapper.getUserByUserId(id));
    }
    @Test
    public void getUserByUsername(){
        String username="222222";
        System.out.println(userMapper.getUserByUsername(username));
    }
    @Test
    public void getUserAll(){
        List<User> userAll = userMapper.getUserAll();
        System.out.println(userAll);
    }
    @Test
    public void addUser(){
        User user =new User();
        user.setUserName("4444");
        user.setUserPassword("111111");
        user.setRoleId(2);
        user.setEmail("44444@");
        userMapper.addUser(user);
    }
    @Test
    public void updateUser(){
        User user =new User();
        user.setUserId(new BigInteger("222227"));
        user.setUserName("333333");
        user.setUserPassword("333333");
        user.setRoleId(2);
        user.setEmail("2788625202@qq.com");
        userMapper.updateUser(user);
    }
    @Test
    public void getUserMsg(){
        UserMsg userMsg = userMapper.getUserMsg(new BigInteger("1"));
        System.out.println(userMsg);
    }

}
