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
import java.util.List;

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
    @GetMapping("/getOrderData")
    public ResultMsg getOrderData(@RequestHeader String token){
        ResultMsg resultMsg = new ResultMsg();
        User user = jwtRedisUtil.getUserByToken(token);
        try {
            HashMap<String, List<Order>> map = new HashMap<>();
            List<Order> orderListBuyer = orderService.getOrderListByBuyerId(user.getUserId());
            List<Order> orderListSeller = orderService.getOrderListBySellerId(user.getUserId());
            map.put("orderListBuyer",orderListBuyer);
            map.put("orderListSeller",orderListSeller);
            resultMsg.setResultData(map);
            resultMsg.setState(200);
            resultMsg.setSuccess(true);
            return resultMsg;
        } catch (Exception e) {
            resultMsg.setMsg("获得商品失败");
            resultMsg.setState(0);
            resultMsg.setSuccess(false);
            return resultMsg;
        }
    }
}
