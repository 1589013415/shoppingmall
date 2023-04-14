package cn.glut.config;

import org.springframework.context.annotation.*;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@ComponentScan({"cn.glut.service","cn.glut.util","cn.glut.aop"})
@PropertySource("classpath:application.properties")
@Import({JdbcConfig.class,MybatisConfig.class,RedisConfig.class})
@EnableAspectJAutoProxy
@EnableTransactionManagement
public class SpringConfig {

}
