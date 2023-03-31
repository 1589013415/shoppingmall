package cn.glut.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResultMsg {
    private int state;
    private String msg;
    private boolean success;
    private Map resultData;
}
