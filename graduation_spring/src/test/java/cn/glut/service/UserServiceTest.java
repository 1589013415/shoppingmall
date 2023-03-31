package cn.glut.service;

import cn.glut.config.SpringConfig;
import cn.glut.pojo.User;
import cn.glut.pojo.UserMsg;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigInteger;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class UserServiceTest {
    @Autowired
    private UserService userService;
    @Test
    public void userLogin(){
        String userName="111111";
        String userPassword="111111";
        User user = userService.userLogin(userName, userPassword);
        System.out.println(user);
    }
    @Test
    public void userRegister(){
        User user =new User();
        user.setUserName("444444");
        user.setUserPassword("111111");
        user.setRoleId(2);
        user.setEmail("111@");
        System.out.println(userService.userRegister(user));
    }
    @Test
    public void updateUser(){
        User user = userService.userLogin("111111", "111111");
        user.setIsLogin(1);
        boolean b = userService.updateUser(user);
        System.out.println(b);
    }
    @Test
    public void getUserMsg(){
//        UserMsg userMsg = userService.getUserMsg(new BigInteger("3"));
//        System.out.println(userMsg);
        Double str1=0.01;
        Double str2=0.01;
        System.out.println(str1+str2);
    }
}
