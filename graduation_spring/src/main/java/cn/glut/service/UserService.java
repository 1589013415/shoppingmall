package cn.glut.service;

import cn.glut.pojo.User;
import cn.glut.pojo.UserMsg;

import java.math.BigInteger;
import java.util.Map;

public interface UserService {
    /**
     * 服务层-->用户登录
     * @userLogin
     * @return
     */
    public User userLogin(String userName,String userPassword);
    /**
     * 服务层-->用户注册
     * @userRegister
     * @return
     */
    public Map<String,Boolean> userRegister(User user);

    /**
     * 服务层-->判断用户是否存在
     * @param userName
     * @return
     */
    public User isExist(String userName);

    /**
     * 服务层-->重置密码
     * @param newPassword
     * @return
     */
    public User resetPassword(String userName,String newPassword);

    /**
     * 服务层-->更改用户信息
     * @param user
     * @return
     */
    public boolean updateUser(User user);

    public UserMsg getUserMsg(BigInteger userid);
    public boolean addUserMsg(UserMsg userMsg);

}
