package cn.glut;

import cn.glut.config.SpringConfig;
import cn.glut.config.JdbcConfig;
import cn.glut.service.impl.CommodityServiceImpl;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.beans.PropertyVetoException;

public class app {
    public static void main(String[] args) {
        CommodityServiceImpl commodityService = new CommodityServiceImpl();
    }
}
