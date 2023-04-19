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
    private String sellername;
    private String buyername;
    private String commodityname;
    private String stateMsg;

    public void setStateMsg(int paystate) {
        String msg="";
        switch (paystate){
            case 0:
                msg="送货中";
                break;
            case 1:
                msg="已完成";
                break;
            case 2:
                msg="退款中";
                break;
            case 3:
                msg="完成";
                break;
        }
        this.stateMsg = msg;
    }
}
