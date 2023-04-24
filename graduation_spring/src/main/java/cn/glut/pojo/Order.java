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
    private String finishtime;
    private BigInteger userplayid;
    private BigInteger sellerid;
    private BigInteger commodityid;
    private double price;
    private boolean deletemarkbuyer;
    private boolean deletemarkseller;
    private int paystate;
    private String sellername;
    private String buyername;
    private String commodityname;
    private boolean canReturn;
    private boolean buyerok;
    private boolean sellerok;
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
                msg="退款已完成";
        }
        this.stateMsg = msg;
    }

    public boolean isCanReturn() {
        return canReturn;
    }

    public void setCanReturn(boolean canReturn) {
        this.canReturn = canReturn;
    }

    public boolean isBuyerok() {
        return buyerok;
    }

    public void setBuyerok(boolean buyerok) {
        this.buyerok = buyerok;
    }

    public boolean isSellerok() {
        return sellerok;
    }

    public void setSellerok(boolean sellerok) {
        this.sellerok = sellerok;
    }
}
