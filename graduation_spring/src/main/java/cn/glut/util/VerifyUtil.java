package cn.glut.util;

import cn.glut.pojo.Order;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class VerifyUtil {
    private static final int RETURNABLETIME=3;//可退货时间
    /**
     * 验证是否可以退款
     * @param order
     * @return
     */
    public static boolean isReturn(Order order) {
        String finishtime = order.getFinishtime();
        if (finishtime.equals("0000-00-00 00:00:00") || finishtime == null) {
            return true;
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date parse = simpleDateFormat.parse(finishtime);
            long time = parse.getTime();
            long l = System.currentTimeMillis();
            long result = l-time;
            long day = TimeUnit.MILLISECONDS.toDays(result);
            if (day < RETURNABLETIME) {//退货时间为三天
                return true;
            } else {
                return false;
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
