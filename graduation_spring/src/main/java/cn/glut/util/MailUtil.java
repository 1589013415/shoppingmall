package cn.glut.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Component
public class MailUtil {
    private static final String MY_EMAIL_ADDRESS="luopeng2022@qq.com";
    private static final String AUTHORIZATION_CODE="wuiuonkczmudhfai";
    @Autowired
    RedisTemplate redisTemplate;

    /**
     * 发送邮箱信息
     * @param acceptPersonEmail
     * @param sendMsg
     * @return
     */
    public boolean sendMail(String acceptPersonEmail,String sendMsg){
        Properties props = System.getProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.ssl.enable", "true");
        props.put("mail.smtp.host","smtp.qq.com");// 设置邮件服务器
        props.put("mail.user",MY_EMAIL_ADDRESS);//自己的邮箱
        props.put("mail.password",AUTHORIZATION_CODE);//开启pop3/smtp时的验证码
        props.put("mail.smtp.port","465");
        props.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getDefaultInstance(props,new Authenticator(){
            public PasswordAuthentication getPasswordAuthentication()
            {
                return new PasswordAuthentication(MY_EMAIL_ADDRESS,AUTHORIZATION_CODE); //发件人邮件用户名、授权码
            }
        });
        //代表启用debug模式，可以在控制台输出smtp协议应答的过程
//        session.setDebug(true);

        try{
            // 创建默认的 MimeMessage 对象
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(MY_EMAIL_ADDRESS));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(acceptPersonEmail));
            //设置邮箱标题
            message.setSubject("来自桂工二手商城的信息");
            // 设置消息体
            message.setText(sendMsg);
            // 发送消息
            Transport.send(message);
            return true;
        }catch (MessagingException mex) {
            mex.printStackTrace();
            return false;
        }
    }
    public String verificationCode(String userName){
        String verificationCode="";
        String codeText="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
        char[] chars = codeText.toCharArray();
        for (int i=0;i<4;i++){
            Random random=new Random();
            int randomNumber = random.nextInt(chars.length);
            verificationCode+=chars[randomNumber];
        }
        redisTemplate.opsForValue().set("resetpassword"+userName,verificationCode,5, TimeUnit.MINUTES);
        return verificationCode;
    }
    public String verificationCode(String userName,String type){
        String verificationCode="";
        String codeText="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
        char[] chars = codeText.toCharArray();
        for (int i=0;i<4;i++){
            Random random=new Random();
            int randomNumber = random.nextInt(chars.length);
            verificationCode+=chars[randomNumber];
        }
        redisTemplate.opsForValue().set(type+userName,verificationCode,5, TimeUnit.MINUTES);
        return verificationCode;
    }

}