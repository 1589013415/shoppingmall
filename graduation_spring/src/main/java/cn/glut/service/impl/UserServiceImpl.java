package cn.glut.service.impl;

import cn.glut.mapper.RoleMapper;
import cn.glut.mapper.UserMapper;
import cn.glut.pojo.ResultMsg;
import cn.glut.pojo.Role;
import cn.glut.pojo.User;
import cn.glut.pojo.UserMsg;
import cn.glut.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RoleMapper roleMapper;

    public User userLogin(String userName, String userPassword) {
        User userBases = userMapper.getUserByUsername(userName);
        if (userBases != null) {
            if (userBases.getUserPassword().equals(userPassword))
                return userBases;
        }
        return null;
    }

    public Map<String, Boolean> userRegister(User user) {
        user.setRoleId(2);
        user.setState(1);
        user.setIsLogin(0);
        User userBases = userMapper.getUserByUsername(user.getUserName());
        HashMap<String, Boolean> map = new HashMap<>();
        if (userBases != null) {
            map.put("用户名已存在", false);
            return map;
        }
        try {
            userMapper.addUser(user);
            map.put("添加成功", true);
            return map;
        } catch (Exception e) {
            map.put("添加失败", false);
            return map;
        }
    }

    @Override
    public User isExist(String userName) {
        return userMapper.getUserByUsername(userName);
    }

    @Override
    public User resetPassword(String userName, String newPassword) {
        User userByUsername = userMapper.getUserByUsername(userName);
        if (userByUsername != null) {
            userByUsername.setUserPassword(newPassword);
            userMapper.updateUser(userByUsername);
        }
        return userByUsername;
    }

    @Override
    public boolean updateUser(User user) {
        try {
            userMapper.updateUser(user);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public UserMsg getUserMsg(BigInteger userid) {
        return userMapper.getUserMsg(userid);
    }

    @Override
    public boolean addUserMsg(UserMsg userMsg) {
        try {
            userMapper.addUserMsg(userMsg);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public ResultMsg userLoginManage(String userName, String userPassword,boolean isRelogin) {
        User userBases = userMapper.getUserByUsername(userName);
        if (userBases == null)
            return new ResultMsg(0, "该账号不存在", false, null);
        Role role = roleMapper.getOrderByOrderId(userBases.getRoleId());
        if (role == null || role.getRoleid() != 1)
            return new ResultMsg(0, "该账号不是管理员账号", false, null);
        if (userBases.getState() == 0)
            new ResultMsg(0, "你的账号已经被禁用，请联系管理员", false, null);
        if (isRelogin&&userBases.getIsLogin() == 1)
            new ResultMsg(3, "用户已登录，请不要重复登录", false, null);
        if (userBases.getUserPassword().equals(userPassword)) {
            HashMap<String, User> map = new HashMap<>();
            map.put("user", userBases);
            return new ResultMsg(200, "登录成功", true, map);
        }else {
            return new ResultMsg(0, "请检查账号和密码是否正确", false, null);
        }

    }

}
