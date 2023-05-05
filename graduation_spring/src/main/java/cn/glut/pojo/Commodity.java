package cn.glut.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Commodity {
    private BigInteger commodityid;
    private BigInteger userid;
    private BigInteger classifyid;
    private String commodityname;
    private String image;
    private String detail;
    private double price;
    private int state;//0：审核中；1：挂售中；2：审核失败 3：商品正在出售中 ，4:已出售
    private int ispay;//0：未支付；1：已支付
    private String failbecause;

}
