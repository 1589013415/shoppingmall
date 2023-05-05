package cn.glut.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderFornt {
    private String orderid;
    private String orderstate;
    private String createtime;
    private String finishtime;
    private String userplayid;
    private String username;
    private String sellerUsername;
    private String sellerid;
    private String commodityid;
    private String price;
    private String deletemark;
    private String paystate;
    private String sellername;
    private String buyername;
    private String commodityname;
    private String canReturn;
    private String buyerok;
    private String sellerok;
    private String stateMsg;
    private String type;
}
