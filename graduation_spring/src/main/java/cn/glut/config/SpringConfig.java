package cn.glut.config;

import org.springframework.context.annotation.*;

@Configuration
@ComponentScan({"cn.glut.service","cn.glut.util","cn.glut.aop","cn.glut.config.AliPay"})
@PropertySource("classpath:application.properties")
@Import({JdbcConfig.class,MybatisConfig.class,RedisConfig.class})
@EnableAspectJAutoProxy
public class SpringConfig {

}
