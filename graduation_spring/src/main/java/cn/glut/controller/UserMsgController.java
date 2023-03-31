package cn.glut.controller;

import cn.glut.pojo.*;
import cn.glut.service.CommodityService;
import cn.glut.service.UserMsgService;
import cn.glut.service.UserService;
import cn.glut.util.JwtRedisUtil;
import cn.glut.util.MailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.HashMap;

@RestController
@RequestMapping("/api/usermsg")
public class UserMsgController {
    @Autowired
    UserService userService;
    @Autowired
    RedisTemplate redisTemplate;
    @Autowired
    MailUtil mailUtil;
    @Autowired
    CommodityService commodityService;
    @Autowired
    JwtRedisUtil jwtRedisUtil;
    @Autowired
    UserMsgService userMsgService;
    @GetMapping("/getusermsg")
    public ResultMsg getUserMsg(@RequestHeader String token){
        User user = jwtRedisUtil.getUserByToken(token);
        HashMap<String,Object> hashMap = new HashMap();
        UserMsg userMsg = userMsgService.getUserMsg(user);
        if(userMsg==null) {
            userMsg=new UserMsg();
        }
        hashMap.put("userMsg",userMsg);
        String userPassword = user.getUserPassword();
        StringBuffer password=new StringBuffer("");
        for (int i = 0; i <userPassword.length() ; i++) {
            password.append("*");
        }
        user.setUserPassword(new String(password));
        hashMap.put("user",user);
        return new ResultMsg(200,"获取成功",true,hashMap);
    }
    @GetMapping("/getusermsgverfiycode/{email}")
    public ResultMsg getUserMsgVerifyCode(@RequestHeader String token,@PathVariable String email){
        User user = jwtRedisUtil.getUserByToken(token);
        String userMsgCode = mailUtil.verificationCode(user.getUserName(), "UserMsg");
        if(!mailUtil.sendMail(email, "你的验证码为：" + userMsgCode + "。\n验证码邮箱期为5分钟")){
            return new ResultMsg(0,"无效邮箱",false,null);
        }else {
            return new ResultMsg(200,"验证码已发送至你注册的邮箱，注意查收",true,null);
        }
    }
    @PostMapping("/addusermsg")
    public ResultMsg addUserMsg(@RequestBody UserMsg userMsg,@RequestHeader String token){
        User userByToken = jwtRedisUtil.getUserByToken(token);
        if(userMsg.getNickname()==null||userMsg.getPhoto()==null||userMsg.getAddress()==null)return new ResultMsg(0,"添加用户信息失败",false,null);
        BigInteger userId = userByToken.getUserId();
        String email = userByToken.getEmail();
        userMsg.setUserid(userId);
        userMsg.setEmail(email);
        if(userService.addUserMsg(userMsg)){
            return new ResultMsg(200,"添加用户信息成功",true,null);

        }
        return new ResultMsg(0,"添加用户信息失败",false,null);
    }
    @PostMapping("/editUserMsg")
    public ResultMsg updateUserMsg(@RequestBody UserMsg userMsg,@RequestHeader String token){
        //一号组团，9B303
        //16177280171
        User userByToken = jwtRedisUtil.getUserByToken(token);
        userMsg.setEmail(userByToken.getEmail());
        boolean b = userMsgService.updateUserMsg(userMsg);
        if (b){
            return new ResultMsg(200,"修改成功",true,null);
        }
        return new ResultMsg(0,"修改失败",false,null);
    }
    @PostMapping("/updatePassword")
    public ResultMsg updatePassword(@RequestBody UserUpdatePassword userUpdatePassword){
        if(userMsgService.updateUserPassword(userUpdatePassword)){
            return new ResultMsg(200,"修改成功",true,null);
        };
        return new ResultMsg(0,"旧密码输入错误",false,null);
    }
    @PostMapping("/getVerify")
    public ResultMsg getVerify(@RequestBody UserMsg userMsg){
        String verifyCode = mailUtil.verificationCode(userMsg.getEmail(),"updateEmailOld");
        if(!mailUtil.sendMail(userMsg.getEmail(), "修改绑定邮箱，旧邮箱验证码为：" + verifyCode + "。\n验证码邮箱期为5分钟")){
            return new ResultMsg(0,"无效邮箱",false,null);
        }else {
            return new ResultMsg(200,"验证码已发至旧邮箱，注意查收",true,null);
        }
    }
    @PostMapping("/verifyOldEmail")
    public ResultMsg verifyOldEmail(@RequestBody UserUpdateEmail userUpdateEmail){
        String verifyCode = (String)redisTemplate.opsForValue().get("updateEmailOld" + userUpdateEmail.getOlderEmail());
        if(userUpdateEmail.getOlderVerify().equals(verifyCode)){
            redisTemplate.delete("updateEmailOld"+userUpdateEmail.getOlderEmail());
            return new ResultMsg(200,"验证成功",true,null);
        }else{
            return new ResultMsg(0,"验证失败,请保证输入的验证码与邮箱匹配",false,null);
        }
    }
    @PostMapping("/getVerifyNewEmail")
    public ResultMsg verifyNewEmail(@RequestBody UserMsg userMsg){
        String verifyCode = mailUtil.verificationCode(userMsg.getEmail(),"updateEmailNew");
        if(!mailUtil.sendMail(userMsg.getEmail(), "绑定新邮箱，验证码为：" + verifyCode + "。\n验证码邮箱期为5分钟")){
            return new ResultMsg(0,"无效邮箱，请输入正确的邮箱",false,null);
        }else {
            return new ResultMsg(200,"验证码已发至旧邮箱，注意查收",true,null);
        }
    }
    @PostMapping("/verifyNewEmail")
    public ResultMsg verifyNewEmail(@RequestBody UserUpdateEmail userUpdateEmail,@RequestHeader String token){
        User userByToken = jwtRedisUtil.getUserByToken(token);
        String verifyCode = (String)redisTemplate.opsForValue().get("updateEmailNew" + userUpdateEmail.getNewEmail());
        if(userUpdateEmail.getNewVerify().equals(verifyCode)){
            userByToken.setEmail(userUpdateEmail.getNewEmail());
            userMsgService.updateUserEmail(userByToken,userUpdateEmail);
//            redisTemplate.delete("updateEmailNew"+userUpdateEmail.getOlderEmail());
            return new ResultMsg(200,"验证成功",true,null);
        }else{
            return new ResultMsg(0,"验证失败,请保证输入的验证码与邮箱匹配",false,null);
        }
    }
}
