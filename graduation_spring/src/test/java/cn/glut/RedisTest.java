package cn.glut;

import cn.glut.config.SpringConfig;
import cn.glut.pojo.Classify;
import cn.glut.pojo.UserColumns;
import cn.glut.service.CommodityService;
import org.aspectj.lang.annotation.Pointcut;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Iterator;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class RedisTest {
    @Autowired
    RedisTemplate redisTemplate;
    @Autowired
    CommodityService commodityService;
    //1.定义切入点
    @Test
    public void deleteRedis(){
        System.out.println("ControllerAop.class deleteRedis()方法：删除了redis中商品缓存");
        List<Classify> classify = commodityService.getClassify();
        Iterator<Classify> iterator = classify.iterator();
        while (iterator.hasNext()){
            Classify classifyObj = iterator.next();
            redisTemplate.delete("commoditiesList"+classifyObj.getKey());
        }
        redisTemplate.delete("commoditiesListall");
    }

    @Test
    public void test(){
        UserColumns userColumns = new UserColumns();
        System.out.println(userColumns);
    }
}
