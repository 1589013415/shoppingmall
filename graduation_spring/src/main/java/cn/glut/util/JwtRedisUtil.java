package cn.glut.util;

import cn.glut.mapper.UserMapper;
import cn.glut.pojo.User;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
@Component
public class JwtRedisUtil {
    @Autowired
    RedisTemplate redisTemplate;
    @Autowired
    UserMapper userMapper;
    public boolean isExistToken(String token){
        DecodedJWT decodedJWT = JwtUtil.verifyToken(token);
        if(decodedJWT==null){
            return false;
        }
        Claim userid = decodedJWT.getClaim("token");
        Object obj = redisTemplate.opsForValue().get("userid" + userid);
        if(obj==null){
            System.out.println("JwtRedisUtil.class：reids中无登录信息的数据");
            return false;
            }
        return true;
    }
    public User getUserByToken(String token){
        User user=null;
        DecodedJWT decodedJWT = JwtUtil.verifyToken(token);
        if(decodedJWT!=null){
            Claim userid = decodedJWT.getClaim("token");
            Object usernameValue = redisTemplate.opsForValue().get("userid" + userid);
            if(usernameValue!=null){
                user = userMapper.getUserByUserId(new BigInteger(userid.toString()));
            }
        }
        return user;

    }
}
