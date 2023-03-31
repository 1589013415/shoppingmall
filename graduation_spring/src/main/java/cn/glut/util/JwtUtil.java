package cn.glut.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.math.BigInteger;
import java.util.Calendar;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class JwtUtil {
    private final static String MY_SECRET_KY="gult!luopeng#graduation";

    /**
     * 生成token
     */
    public static String getToken(Map<String,Object> map){
        String token=null;
        JWTCreator.Builder builder = JWT.create();
        Set keySet = map.keySet();
        Iterator iterator = keySet.iterator();
        for (Map.Entry<String,Object> entry: map.entrySet()) {
            String key=entry.getKey();
            if(map.get(key).getClass().equals(BigInteger.class)){
                Integer integer =new Integer( map.get(key).toString());
                builder.withClaim(entry.getKey(),integer);
            }else {
                builder.withClaim(entry.getKey(), map.get(key).toString());
            }
        }
        //生成不带过期时间的token
//        Calendar calendar=Calendar.getInstance();
//        calendar.add(Calendar.DATE,7);
//        builder.withExpiresAt(calendar.getTime());
        token=builder.sign(Algorithm.HMAC256(MY_SECRET_KY));
        return token;
    }
    /**
     * 检验token，如果返回不为空，则token有效
     */
    public static DecodedJWT verifyToken(String token){
        DecodedJWT verify = null;
        try {
            verify = JWT.require(Algorithm.HMAC256(MY_SECRET_KY)).build().verify(token);
        } catch (Exception e) {
            System.out.println("JwtUtil.class：无效token");;
        }
        return verify;
    }
}
