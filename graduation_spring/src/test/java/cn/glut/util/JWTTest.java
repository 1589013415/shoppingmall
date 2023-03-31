package cn.glut.util;

import cn.glut.config.SpringConfig;
import cn.glut.pojo.User;
import cn.glut.util.JwtUtil;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class JWTTest {
    @Autowired
    JwtRedisUtil jwtRedisUtil;
    @Autowired
    RedisTemplate redisTemplate;
    @Test
    public void getToken(){
        Map<String,Object> map=new HashMap();
        map.put("token",1);
        String token = JwtUtil.getToken(map);
        redisTemplate.opsForValue().set("userid"+1,1,1, TimeUnit.DAYS);
        boolean existToken = jwtRedisUtil.isExistToken(token+"1");
        System.out.println("token是否存在:"+existToken);
        User userByToken = jwtRedisUtil.getUserByToken(token+"1");
        System.out.println("通过token获得User:"+userByToken);
    }
    @Test
    public void verifyToken(){
        String token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6IjExMTExMSIsInVzZXJJZCI6IjEifQ.TSfvdJVOsqEq5PkjI8EfBSyB9ly2kplx29NJf7BJZR0";
        DecodedJWT decodedJWT = JwtUtil.verifyToken(token);
        Claim claim = decodedJWT.getClaim("userId");
        String value=String.valueOf(claim);
        System.out.println(value);
    }
    @Test
    public void text(){

    }
}
