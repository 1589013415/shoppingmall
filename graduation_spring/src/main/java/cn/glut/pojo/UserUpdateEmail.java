package cn.glut.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateEmail {
    private String olderEmail;
    private String olderVerify;
    private String newEmail;
    private String newVerify;
}
