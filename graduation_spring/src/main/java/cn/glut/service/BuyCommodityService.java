package cn.glut.service;

import cn.glut.pojo.*;

public interface BuyCommodityService {
    public ResultMsg buyCommodity(BuyCommodityMsg buyCommodityMsg, User buyUser);
}
