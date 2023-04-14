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
    /**
     * state状态信息
     *
     */
    private int state;//0：审核；1：挂售中
    private int ispay;//0：未支付；1：已支付
    private String failbecause;

}
