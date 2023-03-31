package cn.glut.service;

import cn.glut.pojo.User;
import cn.glut.pojo.UserMsg;
import cn.glut.pojo.UserUpdateEmail;
import cn.glut.pojo.UserUpdatePassword;
import org.springframework.transaction.annotation.Transactional;

public interface UserMsgService {
    public boolean addUserMsg(User user);
    public boolean updateUserMsg(UserMsg userMsg);
    public UserMsg getUserMsg(User user);
    public boolean updateUserPassword(UserUpdatePassword userUpdatePassword);
    @Transactional
    public boolean updateUserEmail(User user, UserUpdateEmail userUpdateEmail);
}
