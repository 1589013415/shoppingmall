package cn.glut.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Data
@AllArgsConstructor
public class UserMsg {
    private BigInteger userid;
    private String nickname;
    private String photo;
    private String email;
    private Double money;
    private String address;
    public UserMsg (){
        this.nickname="用户暂未输入";
        this.photo="用户暂未输入";
        this.address="用户暂未输入";
        this.money=new Double(0);
    }
}
