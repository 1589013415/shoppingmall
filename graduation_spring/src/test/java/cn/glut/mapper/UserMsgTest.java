package cn.glut.mapper;

import cn.glut.config.SpringConfig;
import cn.glut.pojo.UserMsg;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigInteger;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class UserMsgTest {
    @Autowired
    UserMsgMapper userMsgMapper;
    @Test
    public void getUserMsg(){
        BigInteger bigInteger = new BigInteger("1");
        System.out.println(userMsgMapper.getUserMsg(bigInteger));
    }
    @Test
    public void addUseMsg(){
        UserMsg userMsg = new UserMsg();
        userMsg.setUserid(new BigInteger("1"));
        userMsgMapper.addUserMsg(userMsg);
    }
    @Test
    public void updateUserMsg(){
        UserMsg userMsg=new UserMsg();
        userMsg.setUserid(new BigInteger("8"));
        userMsg.setNickname("卷中卷1");
        userMsgMapper.updateUserMsg(userMsg);

    }
}
