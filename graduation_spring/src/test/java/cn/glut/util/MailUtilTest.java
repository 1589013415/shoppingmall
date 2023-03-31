package cn.glut.util;

import cn.glut.config.SpringConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class MailUtilTest {
    @Autowired
    MailUtil mailUtil;
    @Test
    public void testSend(){
        String emailMsg="邮箱测试";
        String acceptPersonEmail="2788625202@qq.com";
        mailUtil.sendMail(acceptPersonEmail,emailMsg);
    }
    @Test
    public void testVerificationCode(){
//        String s = mailUtil.verificationCode();
//        System.out.println(s);
    }
}
