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
    private int price;
    private int state;
    private int ispay;
    private String failbecause;

}
