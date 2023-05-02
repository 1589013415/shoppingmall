package cn.glut.service.impl;

import cn.glut.mapper.ClassifyMapper;
import cn.glut.mapper.CommodityMapper;
import cn.glut.mapper.UserMapper;
import cn.glut.mapper.UserMsgMapper;
import cn.glut.pojo.Commodity;
import cn.glut.pojo.ManageCommodityFront;
import cn.glut.pojo.UserMsg;
import cn.glut.service.ManageCommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
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
    @Override
    public List<ManageCommodityFront> getCommodities(ManageCommodityFront mangeCommodityFront) {
        List<Commodity> commodityAll = commodityMapper.getCommodityAll();
        String commodityname = mangeCommodityFront.getCommodityname();
        boolean b1=commodityname==null||commodityname.length()==0||commodityname.equals("");
        String classname = mangeCommodityFront.getClassname();
        boolean b2=classname==null||classname.length()==0||classname.equals("");
        int state = mangeCommodityFront.getState();
        List<ManageCommodityFront> list = new ArrayList<ManageCommodityFront>();
        if(b1&&b2){
            for (Commodity commodity:commodityAll
                 ) {
                ManageCommodityFront manageCommodity = new ManageCommodityFront();
                manageCommodity.setCommodityid(commodity.getCommodityid());
                manageCommodity.setUsername(userMapper.getUserByUserId(commodity.getUserid()).getUserName());
                manageCommodity.setNickname(userMsgMapper.getUserMsg(commodity.getUserid()).getNickname());
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
        }else{

        }
        return list;
    }
   private List<String>  getImpagePaht(String image){
       String imagePathCatalogue = image.replace("http://localhost:8080/glut","D:/ZgraduationImage");
       File[] files = new File(imagePathCatalogue).listFiles();
       ArrayList<String> imagePathList = new ArrayList<>();
       for (File file:files
       ) {
           if(file.isDirectory()){
               continue;
           }
           String imagePath = file.getPath().replace("D:\\ZgraduationImage", "http://localhost:8080/glut");
           imagePathList.add(imagePath);
       }
       return imagePathList;
   }
}
