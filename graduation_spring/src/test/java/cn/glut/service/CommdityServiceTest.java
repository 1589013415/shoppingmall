package cn.glut.service;

import cn.glut.config.SpringConfig;
import cn.glut.pojo.Commodity;
import cn.glut.pojo.User;
import cn.glut.pojo.UserCommodityFront;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigInteger;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes= SpringConfig.class)
public class CommdityServiceTest {
    @Autowired
    CommodityService commodityService;
    @Test
    public void getCommodityClassify(){
        System.out.println(commodityService.getCommodityClassify());
    }
    @Test
    public void getCommodityByUseridService(){
        User user = new User();
        user.setUserId(new BigInteger("1"));
        List<UserCommodityFront> commoditys = commodityService.getCommodityByUserid(user, 1, 3);
        int size = commoditys.size();
        System.out.println();
        System.out.println(size);
        System.out.println(commoditys);
    }
    @Test
    public void deleteImages(){
        commodityService.deleteImages(new BigInteger("1"),new BigInteger("6"));
    }
    @Test
    public void getCommodities(){

    }

}
