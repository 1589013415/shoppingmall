package cn.glut.service;

import cn.glut.pojo.*;
import org.springframework.transaction.annotation.Transactional;

public interface BuyCommodityService {
    ResultMsg buyCommodity(BuyCommodityMsg buyCommodityMsg, User buyUser);
    @Transactional
    void afterAOPBuyAction(Commodity commodity,UserMsg seller,UserMsg buyer,User buyUser)throws Exception;
}
