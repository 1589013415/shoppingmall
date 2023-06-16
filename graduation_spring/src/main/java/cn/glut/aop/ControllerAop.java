package cn.glut.aop;

import cn.glut.pojo.Classify;
import cn.glut.service.CommodityService;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Iterator;
import java.util.List;

//1.交给Spring控制
@Component
//2.通知Spring，此类为Aop类。并在SpringConfig(配置类中) 用注解@EnableAspectJAutoProxy
@Aspect
public class ControllerAop {
    @Autowired
    RedisTemplate redisTemplate;
    @Autowired
    CommodityService commodityService;
    //1.定义切入点
    @Pointcut("execution(* cn.glut.service.*.api*(..))")
    private void clearCacheCommodityBefore(){}
    @Pointcut("execution(* cn.glut.service.*.afterAOP*(..))")
    private void clearCacheCommodityAfter(){}
    @Before("clearCacheCommodityBefore()")
    public void clearCacheBefore(){
        System.out.println("ControllerAop.class deleteRedis()方法：删除了redis中商品缓存");
        List<Classify> classify = commodityService.getClassify();
        Iterator<Classify> iterator = classify.iterator();
        while (iterator.hasNext()){
            Classify classifyObj = iterator.next();
            redisTemplate.delete("commoditiesList"+classifyObj.getKey());
        }
        redisTemplate.delete("commoditiesListall");
    }
    @After("clearCacheCommodityAfter()")
    public void clearCacheAfter(){
        System.out.println("ControllerAop.class deleteRedis()方法：删除了redis中商品缓存");
        List<Classify> classify = commodityService.getClassify();
        Iterator<Classify> iterator = classify.iterator();
        while (iterator.hasNext()){
            Classify classifyObj = iterator.next();
            redisTemplate.delete("commoditiesList"+classifyObj.getKey());
        }
        redisTemplate.delete("commoditiesListall");
    }
}
