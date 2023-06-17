package cn.glut.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class UserColumns {
    private String pk_usercomlumns;//主键
    private String title;//字段中文名
    private String dataIndex;//字段名
    private String key;//字段名
    private String align;//字段位置
    private int state;//0：禁用，1：启用
    public UserColumns(){
        this.align="center";
    }
}
