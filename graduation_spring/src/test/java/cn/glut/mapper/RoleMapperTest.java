package cn.glut.mapper;

import cn.glut.config.SpringConfig;
import cn.glut.pojo.Role;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes= SpringConfig.class)
public class RoleMapperTest {
    @Autowired
    RoleMapper roleMapper;
    @Test
    public void testSelectRole(){
        Role order = roleMapper.getOrderByOrderId(1);
        System.out.println(order);
    }
}
