package cn.glut.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private BigInteger userId;
    private String userName;
    private String userPassword;
    private int roleId;
    private String email;
    private int state;
    private int isLogin;
}
