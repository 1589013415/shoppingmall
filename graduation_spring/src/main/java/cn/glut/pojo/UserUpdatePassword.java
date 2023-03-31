package cn.glut.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdatePassword {
    private BigInteger userid;
    private String username;
    private String oldPassword;
    private String newPassword;
    private String rePassword;
}
