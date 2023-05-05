package cn.glut.controller;

import cn.glut.pojo.Classify;
import cn.glut.pojo.ManageCommodityFront;
import cn.glut.pojo.ResultMsg;
import cn.glut.service.CommodityService;
import cn.glut.service.ManageCommodityService;
import cn.glut.service.impl.ManageCommodityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/api/manage")
public class ManageCommodityController {
    @Autowired
    private ManageCommodityService manageCommodityService=new ManageCommodityServiceImpl();
    @Autowired
    RedisTemplate redisTemplate;
    @Autowired
    CommodityService commodityService;
    @GetMapping("/listcommodities")
    public ResultMsg listCommodities(){
        List<ManageCommodityFront> commodities = manageCommodityService.getCommodities(new ManageCommodityFront());
            HashMap<String, List<ManageCommodityFront>> map = new HashMap<>();
            map.put("commodities",commodities);
            return new ResultMsg(200,"获取商品管理数据成功",true,map);

    }
    @PostMapping("/audit/{commodityid}/{flag}/{failbecause}")
    public ResultMsg audit(@PathVariable String commodityid, @PathVariable String flag,@PathVariable String failbecause){
        try {
            manageCommodityService.auditCommodity(commodityid,flag,failbecause);
            List<Classify> classify = commodityService.getClassify();
            Iterator<Classify> iterator = classify.iterator();
            while (iterator.hasNext()){
                Classify classifyObj = iterator.next();
                redisTemplate.delete("commoditiesList"+classifyObj.getKey());
            }
            redisTemplate.delete("commoditiesListall");
            return new ResultMsg(200,"审核操作成功:",true,null);
        } catch (Exception e) {
            return new ResultMsg(0,"审核操作失败:"+e.getMessage(),false,null);
        }
    }
}
