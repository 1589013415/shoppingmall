package cn.glut.service.impl;

import cn.glut.mapper.*;
import cn.glut.pojo.Commodity;
import cn.glut.pojo.ManageCommodityFront;
import cn.glut.pojo.Order;
import cn.glut.pojo.UserMsg;
import cn.glut.service.ManageCommodityService;
import cn.glut.util.VerifyUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Service
public class ManageCommodityServiceImpl implements ManageCommodityService {
    @Autowired
    private ClassifyMapper classifyMapper;
    @Autowired
    private CommodityMapper commodityMapper;
    @Autowired
    private UserMsgMapper userMsgMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private OrderMapper orderMapper;

    @Override
    public List<ManageCommodityFront> getCommodities(ManageCommodityFront mangeCommodityFront) {
        List<Commodity> commodityAll = commodityMapper.getCommodityAll();
        String commodityname = mangeCommodityFront.getCommodityname();
        boolean b1 = commodityname == null || commodityname.length() == 0 || commodityname.equals("");
        String classname = mangeCommodityFront.getClassname();
        boolean b2 = classname == null || classname.length() == 0 || classname.equals("");
        int state = mangeCommodityFront.getState();
        List<ManageCommodityFront> list = new ArrayList<ManageCommodityFront>();
        if (b1 && b2) {
            for (Commodity commodity : commodityAll
            ) {
//                if(commodity.getIspay()==1)continue;//筛选出已付款商品
                UserMsg userMsg = userMsgMapper.getUserMsg(commodity.getUserid());
                ManageCommodityFront manageCommodity = new ManageCommodityFront();
                manageCommodity.setCommodityid(commodity.getCommodityid());
                manageCommodity.setUsername(userMapper.getUserByUserId(commodity.getUserid()).getUserName());
                if(userMsg!=null){
                    manageCommodity.setNickname(userMsg.getNickname());
                    manageCommodity.setPhoto(userMsg.getPhoto());
                    manageCommodity.setEmail(userMsg.getEmail());
                    manageCommodity.setAddress(userMsg.getAddress());
                }
                manageCommodity.setClassname(classifyMapper.getClassname(commodity.getClassifyid()));
                manageCommodity.setCommodityname(commodity.getCommodityname());
                manageCommodity.setImagePath(getImpagePaht(commodity.getImage()));
                manageCommodity.setDetail(commodity.getDetail());
                manageCommodity.setPrice(commodity.getPrice());
                manageCommodity.setState(commodity.getState());
                manageCommodity.setStateMsg(commodity.getState());
                manageCommodity.setIspay(commodity.getIspay());
                manageCommodity.setFailbecause(commodity.getFailbecause());
                list.add(manageCommodity);
            }
        } else {

        }
        return list;
    }

    @Override
    public void auditCommodity(String commodityId, String flag, String failBecause) throws Exception {
        Commodity commodity = commodityMapper.getCommodityByCommodityId(new BigInteger(commodityId));
        int stateOlder = commodity.getState();
        if (stateOlder == 3) throw new Exception("正在出售中的商品无法进行该操作");
        if (stateOlder == 4) throw new Exception("已挂售的商品无法进行该操作");
        switch (flag) {
            case "success":
                commodity.setState(1);
                break;
            case "fail":
                commodity.setState(2);
                commodity.setFailbecause(failBecause);
                break;
            case "cancel":
                commodity.setState(0);
                commodity.setFailbecause("无");
                break;
        }
        commodityMapper.updateCommodity(commodity);
    }

    @Override
    public void deleteCommodity(String commodityId,String flag) throws Exception {
        Commodity commodity = commodityMapper.getCommodityByCommodityId(new BigInteger(commodityId));
        Order order = orderMapper.getOrderByCommodityId(commodityId);
        if(commodity==null) throw new Exception("库存中无该商品");
        int stateOlder = commodity.getState();
        if(flag.equals("not")){
            if (stateOlder == 3) throw new Exception("正在出售中的商品无法删除");
            if (stateOlder == 4) throw new Exception("已挂售的商品无法删除");
        }
        if(flag.equals("sold")){
            if (stateOlder == 3) throw new Exception("正在出售中的商品无法删除");
            if (stateOlder == 4) {
                if(VerifyUtil.isReturn(order)){
                    throw new Exception("该订单的商品还可以退款，不允许删除");
                }
            };
        }
        commodityMapper.deleteCommodity(commodity.getCommodityid());
        orderMapper.deleteOrderByOrderId(order.getOrderid());
    }

    private List<String> getImpagePaht(String image) {
        String imagePathCatalogue = image.replace("http://localhost:8080/glut", "D:/ZgraduationImage");
        File[] files = new File(imagePathCatalogue).listFiles();
        ArrayList<String> imagePathList = new ArrayList<>();
        for (File file : files
        ) {
            if (file.isDirectory()) {
                continue;
            }
            String imagePath = file.getPath().replace("D:\\ZgraduationImage", "http://localhost:8080/glut");
            imagePathList.add(imagePath);
        }
        return imagePathList;
    }
}
