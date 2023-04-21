package cn.glut.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.math.BigInteger;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCommodityFront extends Commodity {
    private List<MultipartFile> images;
    private String name;
    private String description;
    private String key;
    private String classifyName;
    private double price;
    private int state;
    private String stateMsg;
    private List<String> imagePath;

    public void setStateMsg(int state, String failBecause) {
        switch (state) {
            case 0:
                this.stateMsg = "正在审核中";
                break;
            case 1:
                this.stateMsg = "挂售中";
                break;
            case 2:
                this.stateMsg = "审核失败";
                this.setFailbecause(failBecause);
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
