package cn.glut.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    private String orderid;
    private int orderstate;
    private String createtime;
    private BigInteger userplayid;
    private BigInteger sellerid;
    private BigInteger commodityid;
    private double price;
    private int payment;
    private int paystate;
    private String paytime;
}
