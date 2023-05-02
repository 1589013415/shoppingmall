package cn.glut.controller;

import cn.glut.pojo.ManageCommodityFront;
import cn.glut.pojo.ResultMsg;
import cn.glut.pojo.UserCommodityFront;
import cn.glut.service.ManageCommodityService;
import cn.glut.service.impl.ManageCommodityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/manage")
public class ManageCommodityController {
    @Autowired
    private ManageCommodityService manageCommodityService=new ManageCommodityServiceImpl();
    @GetMapping("/listcommodities")
    public ResultMsg listCommodities(){
        List<ManageCommodityFront> commodities = manageCommodityService.getCommodities(new ManageCommodityFront());
        if(commodities.size()==0){
            HashMap<String, List<ManageCommodityFront>> map = new HashMap<>();
            map.put("commodities",commodities);
            return new ResultMsg(200,"获取商品管理数据成功",true,map);

        }
        return new ResultMsg(0,"获取商品管理数据失败",false,null);
    }
}
