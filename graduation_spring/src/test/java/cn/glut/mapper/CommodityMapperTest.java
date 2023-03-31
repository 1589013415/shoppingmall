package cn.glut.mapper;

import cn.glut.config.SpringConfig;
import cn.glut.pojo.Commodity;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigInteger;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class CommodityMapperTest {
    @Autowired
    private CommodityMapper commodityMapper;
    @Test
    public void getCommoditys(){
        System.out.println(commodityMapper.getCommodityAll());
    }
    @Test
    public void getCommoditysByuserid(){
        BigInteger userid=new BigInteger("1");
        System.out.println(commodityMapper.getCommodityByuserid(userid));
    }
    @Test
    public void deleteCommoditysByuserid(){
        commodityMapper.deleteCommodity(new BigInteger("5"));
    }
    @Test
    public  void searchCommodity(){
        String searchValue="手机";
        List<Commodity> commoditySearch = commodityMapper.getCommoditySearch(searchValue);
        System.out.println(commoditySearch);
    }
}
