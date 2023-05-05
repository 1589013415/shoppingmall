package cn.glut.controller;

import cn.glut.pojo.OrderFornt;
import cn.glut.pojo.ResultMsg;
import cn.glut.service.ManageOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/manage/order")
public class ManageOrderController {
    @Autowired
    private ManageOrderService manageOrderService;
    @PostMapping("/search")
    public ResultMsg search(@RequestBody OrderFornt orderFornt){
        List<OrderFornt> orderFornts = null;
        try {
            orderFornts = manageOrderService.listOrderManage(orderFornt);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        if(orderFornts==null){
            return new ResultMsg(0,"ManageOrderController.class:后台出现异常",false,null);
        }
        HashMap<String, List<OrderFornt>> map = new HashMap<>();
        map.put("orderMangeData",orderFornts);
        return new ResultMsg(200,"获取订单管理数据成功",true,map);
    }
    @PostMapping("/delete")
    public ResultMsg delete(@RequestBody OrderFornt orderFornt){
        try {
            manageOrderService.deleteOrder(orderFornt);
            return new ResultMsg(200,"删除顶单成功",true,null);
        } catch (Exception e) {
            return new ResultMsg(0,e.getMessage(),false,null);
        }

    }
}
