package cn.glut.controller;

import cn.glut.pojo.ResultMsg;
import cn.glut.pojo.User;
import cn.glut.pojo.UserLogin;
import cn.glut.service.CommodityService;
import cn.glut.service.UserMsgService;
import cn.glut.service.UserService;
import cn.glut.util.JwtRedisUtil;
import cn.glut.util.JwtUtil;
import cn.glut.util.MailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/manage")
public class ManageLoginController {
    @Autowired
    UserService userService;
    @Autowired
    UserMsgService userMsgService;
    @Autowired
    RedisTemplate redisTemplate;
    @Autowired
    MailUtil mailUtil;
    @Autowired
    JwtRedisUtil jwtRedisUtil;
    @Autowired
    CommodityService commodityService;

    @PostMapping("/login")
    public ResultMsg userLogin(@RequestBody UserLogin userLogin) {
        ResultMsg resultMsg = userService.userLoginManage(userLogin.getUsername(), userLogin.getPassword(),false);
        Map resultData = resultMsg.getResultData();
        if(resultMsg.isSuccess()){
            User user = (User)resultData.get("user");
            Date createTime = new Date();
            Map<String, Object> jwtMap = new HashMap();
            jwtMap.put("token", user.getUserId());
            jwtMap.put("ctreatTime", createTime);
            String token = JwtUtil.getToken(jwtMap);
            redisTemplate.opsForValue().set("userid" + user.getUserId(), createTime, 1, TimeUnit.DAYS);
            Map<String, String> tokenMap = new HashMap<>();
            user.setIsLogin(1);
            userService.updateUser(user);
            tokenMap.put("token", token);
            resultMsg.setResultData(tokenMap);
            return resultMsg;
        }
        return resultMsg;
    }
    //挤压登录
    @PostMapping("/relogin")
    public ResultMsg reUserLogin(@RequestBody UserLogin userLogin) {
        ResultMsg resultMsg = userService.userLoginManage(userLogin.getUsername(), userLogin.getPassword(),true);
        Map resultData = resultMsg.getResultData();
        if(resultMsg.isSuccess()){
            User user = (User)resultData.get("user");
            Date createTime = new Date();
            Map<String, Object> jwtMap = new HashMap();
            jwtMap.put("token", user.getUserId());
            jwtMap.put("ctreatTime", createTime);
            String token = JwtUtil.getToken(jwtMap);
            redisTemplate.opsForValue().set("userid" + user.getUserId(), createTime, 1, TimeUnit.DAYS);
            Map<String, String> tokenMap = new HashMap<>();
            user.setIsLogin(1);
            userService.updateUser(user);
            tokenMap.put("token", token);
            resultMsg.setResultData(tokenMap);
            return resultMsg;
        }
        return resultMsg;
    }
    @GetMapping("/exit")
    public ResultMsg exitLogin(@RequestHeader String token) {
        ResultMsg resultMsg = new ResultMsg();
        User userByToken = jwtRedisUtil.getUserByToken(token);
        if (jwtRedisUtil.isExistToken(token)) {
            userByToken.setIsLogin(0);
            redisTemplate.delete("userid" + userByToken.getUserId());
            userService.updateUser(userByToken);
            resultMsg.setState(200);
            resultMsg.setSuccess(true);
            resultMsg.setMsg("退出成功");
        } else {
            resultMsg.setState(0);
            resultMsg.setMsg("异常退出");
        }
        return resultMsg;
    }
}
