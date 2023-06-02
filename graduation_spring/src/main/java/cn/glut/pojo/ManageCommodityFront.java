package cn.glut.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ManageCommodityFront {
    private BigInteger commodityid;
    private String username;
    private String nickname;
    private String photo;
    private String email;
    private String address;
    private String classname;
    private String commodityname;
    private List<String> imagePath;
    private String detail;
    private Double price;
    private int state;
    private String stateMsg;
    private int ispay;
    private String failbecause;

    public void setStateMsg(int state) {
        switch (state) {
            case 0:
                this.stateMsg = "正在审核中";
                break;
            case 1:
                this.stateMsg = "挂售中";
                break;
            case 2:
                this.stateMsg = "审核失败";
                break;
            case 3:
                this.stateMsg = "商品正在出售中";
                break;
            case 4:
                this.stateMsg = "已出售";
                break;
        }
    }
}
