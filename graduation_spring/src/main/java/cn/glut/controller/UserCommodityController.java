package cn.glut.controller;

import cn.glut.pojo.*;
import cn.glut.service.BuyCommodityService;
import cn.glut.service.CommodityService;
import cn.glut.service.UserService;
import cn.glut.util.JwtRedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigInteger;
import java.util.*;

@RestController
@RequestMapping("/api/commodity")
public class UserCommodityController {
    @Autowired
    CommodityService commodityService;
    @Autowired
    UserService userService;
    @Autowired
    JwtRedisUtil jwtRedisUtil;
    @Autowired
    RedisTemplate redisTemplate;
    @Autowired
    BuyCommodityService buyCommodityService;

    @PostMapping("/addcommodity")
    public ResultMsg addCommodity(UserCommodityFront userCommodityFront, @RequestHeader String token) throws IOException {
        User userByToken = jwtRedisUtil.getUserByToken(token);
        ResultMsg resultMsg = new ResultMsg();
        if (userCommodityFront != null) {
            List<MultipartFile> images = userCommodityFront.getImages();
            BigInteger commodityId = commodityService.addCommodity(userByToken, userCommodityFront);
            if (commodityId == null) {
                return new ResultMsg(0, "保存商品信息失败", false, null);
            }
            if (!commodityService.addImages(images, userByToken.getUserId(), commodityId)) {
                commodityService.deleteBecauseAddImages(commodityId);
                return new ResultMsg(0, "上传失败，请检查文件只能小于20mb", false, null);
            }
            resultMsg.setMsg("添加商品成功，请等待审核");
            resultMsg.setSuccess(true);
        } else {
            resultMsg.setMsg("添加商品失败");
        }
        System.out.println("运行了Textcomtroller中的addCommodity方法");
        return resultMsg;
    }

    @GetMapping("/getcommodityclassify")
    public ResultMsg getCommodityClassify() {
        System.out.println("UserCommodityController.class:运行了getCommodityClassify()方法");
        ResultMsg resultMsg = new ResultMsg();
        Map map = new HashMap();
        List<Classify> commodityClassify = commodityService.getCommodityClassify();
        if (commodityClassify.size() != 0) {
            map.put("commdoityClassify", commodityClassify);
            resultMsg.setState(200);
            resultMsg.setSuccess(true);
            resultMsg.setMsg("获得分类成功");
            resultMsg.setResultData(map);
        } else {
            map.put("commdoityClassify", new ArrayList<Classify>());
            resultMsg.setState(200);
            resultMsg.setMsg("失败！！！全部的类型被禁用了，请联系管理人员");
        }
        return resultMsg;
    }

    @GetMapping("/getCommoditysByUserid/{pageNum}/{pageSize}")
    public ResultMsg getCommoditysByUserid(@RequestHeader String token, @PathVariable int pageSize, @PathVariable int pageNum) {
        User userByToken = jwtRedisUtil.getUserByToken(token);
        List<UserCommodityFront> commodityList = commodityService.getCommodityByUserid(userByToken, pageNum, pageSize);
        if (commodityList != null) {
            HashMap<String, List<UserCommodityFront>> stringListHashMap = new HashMap<>();
            stringListHashMap.put("userCommodity", commodityList);
            return new ResultMsg(200, "获得用户个人商品成功", true, stringListHashMap);
        }
        return new ResultMsg(0, "获取数据失败", false, null);
    }

    @GetMapping("/getCommoditysByCommodityid/{commodityid}")
    public ResultMsg getCommodityByCommodityid(@PathVariable BigInteger commodityid) {
        UserCommodityFront commodityByCommodityid = commodityService.getCommodityByCommodityid(commodityid);
        if (commodityByCommodityid != null) {
            HashMap<String, UserCommodityFront> stringListHashMap = new HashMap<>();
            stringListHashMap.put("userCommodity", commodityByCommodityid);
            return new ResultMsg(200, "获得商品信息成功", true, stringListHashMap);
        }
        return new ResultMsg(0, "获取数据失败", false, null);
    }

    @GetMapping("/size")
    public ResultMsg getSize(@RequestHeader String token) {
        User userByToken = jwtRedisUtil.getUserByToken(token);
        HashMap<String, Integer> objectObjectHashMap = new HashMap<>();
        Integer commodityTotal = commodityService.getCommodityTatol(userByToken);
        if (commodityTotal == 0) {
            return new ResultMsg(200, "获取用户商品失败，该用户没有商品", false, null);
        }
        objectObjectHashMap.put("total", commodityTotal);
        return new ResultMsg(200, "获得用户总商品数成功", true, objectObjectHashMap);
    }

    @PostMapping("/updatecommodity")
    public ResultMsg UpdateCommodity(UserCommodityFront userCommodityFront) {
        System.out.println("UserCommodityController.class：apiUpdateCommodity方法被运行了");
        if (commodityService.apiUpdateCommodity(userCommodityFront)) {
            return new ResultMsg(200, "修改成功", true, null);
        }
        return new ResultMsg(0, "修改失败", false, null);
    }

    @DeleteMapping("/deletecommodity/{commodityid}")
    public ResultMsg DeleteCommodity(@PathVariable BigInteger commodityid) {
        if (commodityService.apiDeleteCommodity(commodityid)) {
            return new ResultMsg(200, "删除成功", true, null);
        }
        return new ResultMsg(0, "删除失败", false, null);
    }

    @GetMapping("/isTokenExist")
    public ResultMsg isTokenExist() {
        return new ResultMsg(200, "有效token", true, null);
    }

    @GetMapping("/getCommodityMsgAndUserMsg/{commodityId}")
    public ResultMsg getCommodityMsgAndUserMsg(@PathVariable BigInteger commodityId) {
        UserCommodityFront commodityByCommodityid = commodityService.getCommodityByCommodityid(commodityId);
        if (commodityByCommodityid == null) return new ResultMsg(0, "获得商品信息和卖家信息失败", false, null);
        UserMsg userMsg = userService.getUserMsg(commodityByCommodityid.getUserid());
        HashMap<String, Object> commodityAndUserMsgMap = new HashMap<>();
        if (userMsg != null) {
            commodityAndUserMsgMap.put("commodityMsg", commodityByCommodityid);
            commodityAndUserMsgMap.put("userMsg", userMsg);
            return new ResultMsg(200, "获得成功", true, commodityAndUserMsgMap);
        }
        return new ResultMsg(0, "商品获得失败", false, commodityAndUserMsgMap);
    }

    @PostMapping("/buyCommodity")
    public ResultMsg buyCommodity(@RequestBody BuyCommodityMsg buyCommodityMsg, @RequestHeader String token) {
        User buyUser = jwtRedisUtil.getUserByToken(token);
        return buyCommodityService.buyCommodity(buyCommodityMsg, buyUser);
    }

}
