package cn.glut;

import cn.glut.config.SpringConfig;
import cn.glut.mapper.CommodityMapper;
import cn.glut.pojo.Commodity;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class MybatisPageHelperTest {
    @Autowired
    CommodityMapper commodityMapper;
    @Test
    public void PageHelperTest(){
        PageHelper.startPage(2,1);
        List<Commodity> commodityAll = commodityMapper.getCommodityAll();
        System.out.println(commodityAll);
        System.out.println(commodityAll.size());
        List<Commodity> commodityAll1 = commodityMapper.getCommodityAll();
        System.out.println(commodityAll1.size());
    }
}
