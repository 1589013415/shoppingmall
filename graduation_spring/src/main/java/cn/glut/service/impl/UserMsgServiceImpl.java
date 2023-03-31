package cn.glut.service.impl;

import cn.glut.mapper.UserMapper;
import cn.glut.mapper.UserMsgMapper;
import cn.glut.pojo.User;
import cn.glut.pojo.UserMsg;
import cn.glut.pojo.UserUpdateEmail;
import cn.glut.pojo.UserUpdatePassword;
import cn.glut.service.UserMsgService;
import cn.glut.util.JwtRedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserMsgServiceImpl implements UserMsgService {
    @Autowired
    JwtRedisUtil jwtRedisUtil;
    @Autowired
    UserMsgMapper userMsgMapper;
    @Autowired
    UserMapper userMapper;
    @Override
    public boolean addUserMsg(User user) {
        User userByUsername = userMapper.getUserByUsername(user.getUserName());
        if(userByUsername!=null){
            UserMsg userMsg = new UserMsg();
            userMsg.setUserid(userByUsername.getUserId());
            userMsg.setEmail(user.getEmail());
            try {
                userMsgMapper.addUserMsg(userMsg);
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
            return true;
        }
        return false;
    }

    @Override
    public boolean updateUserMsg(UserMsg userMsg) {
        try {
            userMsgMapper.updateUserMsg(userMsg);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public UserMsg getUserMsg(User user) {
        return userMsgMapper.getUserMsg(user.getUserId());
    }

    @Override
    public boolean updateUserPassword(UserUpdatePassword userUpdatePassword) {
        User userBases = userMapper.getUserByUserId(userUpdatePassword.getUserid());
        if(!userBases.getUserPassword().equals(userUpdatePassword.getOldPassword()))return false;
        userBases.setUserPassword(userUpdatePassword.getNewPassword());
        userMapper.updateUser(userBases);
        return true;
    }

    @Override
    public boolean updateUserEmail(User user, UserUpdateEmail userUpdateEmail) {

        try {
            userMapper.updateUser(user);
            UserMsg userMsg = userMsgMapper.getUserMsg(user.getUserId());
            userMsg.setEmail(userUpdateEmail.getNewEmail());
            userMsgMapper.updateUserMsg(userMsg);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

}
