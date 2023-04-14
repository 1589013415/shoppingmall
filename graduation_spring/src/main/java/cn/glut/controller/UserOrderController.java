package cn.glut.controller;

import cn.glut.pojo.Commodity;
import cn.glut.pojo.Order;
import cn.glut.pojo.ResultMsg;
import cn.glut.pojo.User;
import cn.glut.service.CommodityService;
import cn.glut.service.OrderService;
import cn.glut.util.JwtRedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api/order")
public class UserOrderController {
    @Autowired
    JwtRedisUtil jwtRedisUtil;
    @Autowired
    OrderService orderService;
    @Autowired
    CommodityService commodityService;

    @PostMapping("/createCommodity")
    public ResultMsg createCommodity(@RequestBody Commodity commodity1, @RequestHeader String token) {
        User user = jwtRedisUtil.getUserByToken(token);
        Commodity commodity = commodityService.getCommodityById(commodity1.getCommodityid());
        if (commodity.getState() != 1) return new ResultMsg(0, "购买失败，商品已下架", false, null);
        Order order = orderService.createOrder(user, commodity);
        if (order != null) {
            //成功返回订单号
            HashMap resultData = new HashMap();
            resultData.put("order", order);
            return new ResultMsg(200, "创建订单成功", true, resultData);
        } else {
            return new ResultMsg(0, "创建订单失败", false, null);
        }
    }
}
