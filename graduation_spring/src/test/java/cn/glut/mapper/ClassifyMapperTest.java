package cn.glut.mapper;

import cn.glut.config.SpringConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigInteger;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class ClassifyMapperTest {
    @Autowired
    ClassifyMapper classifyMapper;
    @Test
    public void getClassifyAll(){
        System.out.println(classifyMapper.getClassifyAll());
    }
    @Test
    public void getClassName(){
        System.out.println(classifyMapper.getClassname(new BigInteger("4")));
    }
    @Test
    public void getClassifyIdByClassName(){
//        System.out.println(classifyMapper.getClassifyIdByClassName("书籍"));
    }
}
