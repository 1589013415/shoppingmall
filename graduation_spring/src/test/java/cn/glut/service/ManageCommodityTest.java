package cn.glut.service;

import cn.glut.config.SpringConfig;
import cn.glut.pojo.ManageCommodityFront;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes= SpringConfig.class)
public class ManageCommodityTest{
    @Autowired
    ManageCommodityService manageCommodityService;
    @Test
    public void getCommodities(){
        List<ManageCommodityFront> commodities = manageCommodityService.getCommodities(new ManageCommodityFront());
        System.out.println(commodities);
    }
}
