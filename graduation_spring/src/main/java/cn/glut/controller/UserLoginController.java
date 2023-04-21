package cn.glut.controller;

import cn.glut.pojo.*;
import cn.glut.service.CommodityService;
import cn.glut.service.UserMsgService;
import cn.glut.service.UserService;
import cn.glut.util.JwtRedisUtil;
import cn.glut.util.JwtUtil;
import cn.glut.util.MailUtil;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/user")
public class UserLoginController {
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
        ResultMsg resultMsg = new ResultMsg();
        User user = userService.userLogin(userLogin.getUsername(), userLogin.getPassword());
        if (user != null && user.getState() == 0) {
            resultMsg.setMsg("你的账号已经被禁用，请联系管理员");
            resultMsg.setState(2);//用户账号被禁用
        } else if (user != null && user.getIsLogin() == 1) {
            resultMsg.setMsg("用户已登录，请不要重复登录");
            resultMsg.setState(3);//3:用户已登录
        } else if (user != null) {
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
            resultMsg.setMsg("登录成功");
            resultMsg.setState(200);
            resultMsg.setSuccess(true);
            resultMsg.setResultData(tokenMap);
        } else {
            resultMsg.setMsg("登录失败，请输入正确账号和密码");
            resultMsg.setState(0);
        }
        return resultMsg;
    }
    //挤压登录
    @PostMapping("/relogin")
    public ResultMsg reUserLogin(@RequestBody UserLogin userLogin) {
        ResultMsg resultMsg = new ResultMsg();
        User user = userService.userLogin(userLogin.getUsername(), userLogin.getPassword());
        if (user != null && user.getState() == 0) {
            resultMsg.setMsg("你的账号已经被禁用，请联系管理员");
            resultMsg.setState(2);//用户账号被禁用
        } else if (user != null) {
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
            resultMsg.setMsg("登录成功");
            resultMsg.setState(200);
            resultMsg.setSuccess(true);
            resultMsg.setResultData(tokenMap);
        } else {
            resultMsg.setMsg("登录失败，请输入正确账号和密码");
            resultMsg.setState(0);
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

    @PostMapping("/resetpassword")
    public ResultMsg resetPassword(@RequestBody ResetForm resetForm) {
        ResultMsg resultMsg = new ResultMsg();
        String verifyCode = (String) redisTemplate.opsForValue().get("resetpassword" + resetForm.getUserName());
        if (verifyCode != null) {
            User user = userService.resetPassword(resetForm.getUserName(), resetForm.getPassword());
            redisTemplate.delete("userid" + user.getUserId());
            redisTemplate.delete("resetpassword" + user.getUserName());
            resultMsg.setState(200);
            resultMsg.setMsg("重置成功");
            resultMsg.setSuccess(true);
        } else {
            resultMsg.setState(0);
            resultMsg.setMsg("重置失败，请保持证验证码有效并和账号匹配");
        }
        return resultMsg;
    }

    @GetMapping("/getverify/{userName}")
    public ResultMsg getVerifyCode(@PathVariable String userName) {
        ResultMsg resultMsg = new ResultMsg();
        User existUser = userService.isExist(userName);
        if (existUser != null) {
            String verifyCode = mailUtil.verificationCode(existUser.getUserName());
            mailUtil.sendMail(existUser.getEmail(), "你的验证码为：" + verifyCode + "。\n验证码邮箱期为5分钟");
            resultMsg.setState(200);
            resultMsg.setSuccess(true);
            resultMsg.setMsg("验证码已发送至你注册的邮箱，注意查收");
        } else {
            resultMsg.setState(0);
            resultMsg.setMsg("获取验证码失败,请输入正确的账号");
        }
        return resultMsg;
    }

    @PostMapping("/register")
    public ResultMsg register(@RequestBody UserRegister user) {
        System.out.println(user);
        ResultMsg resultMsg = new ResultMsg();
        String verifyCode = (String) redisTemplate.opsForValue().get("resetpassword" + user.getEmail());
        if (user.getVerifyCode().equals(verifyCode)) {
            Map<String, Boolean> map = userService.userRegister(user);
            Set<String> keys = map.keySet();
            Iterator<String> iterator = keys.iterator();
            while (iterator.hasNext()) {
                String msg = iterator.next();
                Boolean aBoolean = map.get(msg);
                resultMsg.setSuccess(aBoolean);
                resultMsg.setMsg(msg);
                if (aBoolean) {
                    redisTemplate.delete("resetpassword" + user.getEmail());
                    resultMsg.setState(200);
                } else {
                    resultMsg.setState(0);
                }
            }
            userMsgService.addUserMsg(user);
        } else {
            resultMsg.setState(0);
            resultMsg.setSuccess(false);
            resultMsg.setMsg("验证码错误");
        }
        return resultMsg;
    }

    @GetMapping("/getverifyRegister/{email}")
    public ResultMsg getVerifyCodeRegister(@PathVariable String email) {
        ResultMsg resultMsg = new ResultMsg();
        String verifyCode = mailUtil.verificationCode(email);
        if (!mailUtil.sendMail(email, "你的验证码为：" + verifyCode + "。\n验证码邮箱期为5分钟")) {
            resultMsg.setState(0);
            resultMsg.setSuccess(false);
            resultMsg.setMsg("无效邮箱");
        } else {
            resultMsg.setState(200);
            resultMsg.setSuccess(true);
            resultMsg.setMsg("验证码已发送至你注册的邮箱，注意查收");
        }
        return resultMsg;
    }

    @GetMapping("/getAllCommodities/{key}")
    public ResultMsg getAllCommodities(@PathVariable String key) throws IOException {
        String msg = "从redis中获取数据";
        ObjectMapper objectMapper = new ObjectMapper();
        List<UserCommodityFront> userCommodityFronts = null;
        String str = (String) redisTemplate.opsForValue().get("commoditiesList" + key);
        if (str == null) {
            msg = "redis中无数据，从mysql数据库中取数据";
            System.out.println(msg);
            userCommodityFronts = commodityService.getCommoditiesBykey(key);
            String commoditiesStr = objectMapper.writeValueAsString(userCommodityFronts);
            redisTemplate.opsForValue().set("commoditiesList" + key, commoditiesStr);
        } else {
            JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, UserCommodityFront.class);
            userCommodityFronts = new ObjectMapper().readValue(str, javaType);
        }
        System.out.println(msg);
        HashMap<String, List<UserCommodityFront>> stringListHashMap = new HashMap<>();
        stringListHashMap.put("allCommoditys", userCommodityFronts);
        return new ResultMsg(200, msg, true, stringListHashMap);
    }

    @GetMapping("/getcommodityclassify")
    public ResultMsg getCommodityClassify() {
        ResultMsg resultMsg = new ResultMsg();
        Map map = new HashMap();
        List<Classify> commodityClassify = commodityService.getCommodityClassifyAndAll();
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

    @GetMapping("/search/{searchValue}/{pageNum}/{pageSize}")
    public ResultMsg getCommoditiesBySearch(@PathVariable String searchValue, @PathVariable int pageNum, @PathVariable int pageSize) {
        List<UserCommodityFront> commoditiesBySearch = commodityService.getCommoditiesBySearch(searchValue, pageNum, pageSize);
        int total = commodityService.getCommoditiesSearchTotal(searchValue);
        HashMap<String, Object> stringListHashMap = new HashMap<>();
        stringListHashMap.put("commoditiesList", commoditiesBySearch);
        stringListHashMap.put("total", total);
        if (commoditiesBySearch.size() == 0) return new ResultMsg(0, "搜索失败", false, stringListHashMap);
        return new ResultMsg(200, "搜索成功", true, stringListHashMap);
    }
}
