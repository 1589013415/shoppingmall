package cn.glut.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserMsg {
    private BigInteger userid;
    private String nickname;
    private String photo;
    private String email;
    private Double money;
    private String address;
}
