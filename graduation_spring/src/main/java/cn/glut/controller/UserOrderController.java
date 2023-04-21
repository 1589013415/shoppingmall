package cn.glut.controller;

import cn.glut.pojo.*;
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
    @PostMapping("/buyerreceipt")
    public ResultMsg buyerReceipt(OrderFornt orderFornt){
        try {
            orderService.buyerReceipt(orderFornt.getOrderid());
            return new ResultMsg(200,"收货成功",true,null);
        } catch (Exception e) {
            return new ResultMsg(0,e.getMessage(),false,null);
        }
    }
    @PostMapping("/refund")
    public ResultMsg refund(OrderFornt orderFornt){
        try {
            orderService.refund(orderFornt.getOrderid());
            return new ResultMsg(200,"退款操作成功，等待卖家同意退款，如果由问题，请联系客服",true,null);
        } catch (Exception e) {
            return new ResultMsg(0,e.getMessage(),false,null);
        }
    }
    @PostMapping("/deletebuyer")
    public ResultMsg deleteOrder(OrderFornt orderFornt){
        try {
            orderService.deleteOrderBuyer(orderFornt.getOrderid());
            return new ResultMsg(200,"删除订单成功",true,null);
        } catch (Exception e) {
            return new ResultMsg(0,e.getMessage(),false,null);
        }
    }
    @PostMapping("/sendGoods")
    public ResultMsg sendGoods(OrderFornt orderFornt){
        try {
            orderService.sellerSend(orderFornt.getOrderid());
            return new ResultMsg(200,"等待买家确认收到货物",true,null);
        } catch (Exception e) {
            return new ResultMsg(0,e.getMessage(),false,null);
        }
    }

}
