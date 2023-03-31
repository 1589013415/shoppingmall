package cn.glut.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResetForm {
    private String userName;
    private String verifyCode;
    private String password;
}
