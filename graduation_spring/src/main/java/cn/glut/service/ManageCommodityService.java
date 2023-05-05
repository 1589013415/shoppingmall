package cn.glut.service;

import cn.glut.pojo.ManageCommodityFront;

import java.util.List;

public interface ManageCommodityService {
    public List<ManageCommodityFront> getCommodities(ManageCommodityFront mangeCommodityFront );
    public void auditCommodity(String commodityId,String flag,String failBecause)throws Exception;
    void deleteCommodity(String commodityId) throws Exception;
}
