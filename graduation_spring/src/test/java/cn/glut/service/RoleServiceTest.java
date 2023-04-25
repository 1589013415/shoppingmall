package cn.glut.service;

import cn.glut.config.SpringConfig;
import cn.glut.pojo.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class RoleServiceTest {
    @Autowired
    private UserService userService;
    @Test
    public void testLoginManage(){
        String userName="999999";
        String userPassword="999999";


    }
}
