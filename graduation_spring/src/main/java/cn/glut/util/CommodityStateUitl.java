package cn.glut.util;

public class CommodityStateUitl {
    public static String getStateMsg(int state){
        String stateMsg="无";
        switch (state) {
            case 0:
                stateMsg="正在审核中";
                break;
            case 1:
                stateMsg="审核失败";
                break;
            case 2:
                stateMsg="出售中";
                break;
            case 3:
                stateMsg="已出售";
                break;
            default: stateMsg="出现异常";
                break;
        }
        return stateMsg;
    }
}
