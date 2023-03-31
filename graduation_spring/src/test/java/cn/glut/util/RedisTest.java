package cn.glut.util;

import cn.glut.config.SpringConfig;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import redis.clients.jedis.Jedis;

import javax.rmi.CORBA.Util;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class RedisTest {
    @Autowired
    RedisTemplate<String,Object> redisTemplate;
    @Autowired
    RedisUtil redisUtil;
    private Jedis jedis=null;
    String ip="127.0.0.1";
    @Before
    public void before(){
        jedis=new Jedis(ip);
    }
    @Test
    public void connectRedisTest(){
        jedis.set("name","text");
        System.out.println(jedis.get("name"));
    }
    @Test
    public void RedisUitlTest(){
        ValueOperations valueOperations = redisTemplate.opsForValue();
        System.out.println(valueOperations.get("name").toString());

    }
    @Test
    public void setValue(){
        redisUtil.get("");
    }

}
