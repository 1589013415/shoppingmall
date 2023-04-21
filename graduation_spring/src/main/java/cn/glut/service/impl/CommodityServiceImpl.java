package cn.glut.service.impl;

import cn.glut.mapper.ClassifyMapper;
import cn.glut.mapper.CommodityMapper;
import cn.glut.pojo.Classify;
import cn.glut.pojo.Commodity;
import cn.glut.pojo.User;
import cn.glut.pojo.UserCommodityFront;
import cn.glut.service.CommodityService;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
@Service
public class CommodityServiceImpl implements CommodityService {
    @Autowired
    private ClassifyMapper classifyMapper;
    @Autowired
    private CommodityMapper commodityMapper;
    @Override
    public List<Classify> getCommodityClassify() {
        List<Classify> classifyAll = classifyMapper.getClassifyAll();
        List<Classify> commodityClassify=new ArrayList();
        Iterator<Classify> iterator = classifyAll.iterator();
        while (iterator.hasNext()){
            Classify classifyBase = iterator.next();
            if(classifyBase.getState()==1){
                commodityClassify.add(classifyBase);
            }
        }
        return commodityClassify;
    }

    @Override
    public List<Classify> getClassify() {
        List<Classify> classifyAll = classifyMapper.getClassifyAll();
        List<Classify> commodityClassify=new ArrayList();
        Iterator<Classify> iterator = classifyAll.iterator();
        while (iterator.hasNext()){
            Classify classifyBase = iterator.next();
                commodityClassify.add(classifyBase);
        }
        return commodityClassify;
    }

    @Override
    public List<Classify> getCommodityClassifyAndAll() {
        List<Classify> classifyAll = classifyMapper.getClassifyAll();
        List<Classify> commodityClassify=new ArrayList();
        commodityClassify.add(new Classify(new BigInteger("999999999"),"全部",1,"all"));
        Iterator<Classify> iterator = classifyAll.iterator();
        while (iterator.hasNext()){
            Classify classifyBase = iterator.next();
            if(classifyBase.getState()==1){
                commodityClassify.add(classifyBase);
            }
        }
        return commodityClassify;
    }

    @Override
    public List<UserCommodityFront> getCommodityByUserid(User user,int pageNume,int pageSize) {
        ArrayList<UserCommodityFront> userCommodityFronts = new ArrayList<>();
        PageHelper.startPage(pageNume,pageSize);
        List<Commodity> commodityList = commodityMapper.getCommodityByuserid(user.getUserId());
        Iterator<Commodity> iterator = commodityList.iterator();
        while (iterator.hasNext()){
            UserCommodityFront userCommodityFront = new UserCommodityFront();
            Commodity commodity = iterator.next();
            String imageDirectoryPath = commodity.getImage();
            String imagePathCatalogue = imageDirectoryPath.replace("http://localhost:8080/glut","D:/ZgraduationImage");
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
            userCommodityFront.setCommodityid(commodity.getCommodityid());
            userCommodityFront.setName(commodity.getCommodityname());
            String classname = classifyMapper.getClassname(commodity.getClassifyid());
            userCommodityFront.setClassifyName(classname);
            userCommodityFront.setImagePath(imagePathList);
            userCommodityFront.setPrice(commodity.getPrice());
            userCommodityFront.setStateMsg(commodity.getState(),commodity.getFailbecause());
            userCommodityFront.setIspay(commodity.getIspay());
            userCommodityFront.setState(commodity.getState());
            userCommodityFront.setDescription(commodity.getDetail());
            userCommodityFronts.add(userCommodityFront);
        }
        return userCommodityFronts;
    }

    @Override
    public UserCommodityFront getCommodityByCommodityid(BigInteger commodiyid) {
        UserCommodityFront userCommodityFront =new UserCommodityFront();
        Commodity commodity = commodityMapper.getCommodityByCommodityId(commodiyid);
        userCommodityFront.setCommodityid(commodity.getCommodityid());
        userCommodityFront.setUserid(commodity.getUserid());
        userCommodityFront.setName(commodity.getCommodityname());
        String imageDirectoryPath = commodity.getImage();
        String imagePathCatalogue = imageDirectoryPath.replace("http://localhost:8080/glut","D:/ZgraduationImage");
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
        userCommodityFront.setImagePath(imagePathList);
        String classname = classifyMapper.getClassname(commodity.getClassifyid());
        userCommodityFront.setClassifyName(classname);
        userCommodityFront.setPrice(commodity.getPrice());
        userCommodityFront.setStateMsg(commodity.getState(),commodity.getFailbecause());
        userCommodityFront.setIspay(commodity.getIspay());
        userCommodityFront.setState(commodity.getState());
        userCommodityFront.setDescription(commodity.getDetail());
        return userCommodityFront;
    }

    @Override
    public List<UserCommodityFront> getCommoditiesBySearch(String search,int pageNum,int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<Commodity> commoditySearch = commodityMapper.getCommoditySearch(search);
        List<UserCommodityFront> userCommodityFrontList=new ArrayList<>();
        Iterator<Commodity> iterator = commoditySearch.iterator();
        while (iterator.hasNext()){
            Commodity commodity = iterator.next();
            if(commodity.getState()==1){
                UserCommodityFront userCommodityFront=new UserCommodityFront();
                userCommodityFront.setCommodityid(commodity.getCommodityid());
                userCommodityFront.setUserid(commodity.getUserid());
                userCommodityFront.setClassifyid(commodity.getClassifyid());
                String classname = classifyMapper.getClassname(commodity.getClassifyid());
                if(classname!=null)userCommodityFront.setClassifyName(classname);
                userCommodityFront.setCommodityname(commodity.getCommodityname());
                ArrayList<String> imagePathList = new ArrayList<>();
                File[] files = new File(commodity.getImage()
                        .replace("http://localhost:8080/glut", "D:\\ZgraduationImage")).listFiles();
                for (File file:files
                     ) {
                    if(file.isDirectory())continue;
                    imagePathList.add(
                            file.getPath().replace("D:\\ZgraduationImage", "http://localhost:8080/glut")
                    );
                }
                userCommodityFront.setImagePath(imagePathList);
                userCommodityFront.setDetail(commodity.getDetail());
                userCommodityFront.setPrice(commodity.getPrice());
                userCommodityFront.setIspay(commodity.getIspay());
                userCommodityFront.setFailbecause(commodity.getFailbecause());
                userCommodityFrontList.add(userCommodityFront);
            }
        }
        return userCommodityFrontList;
    }

    @Override
    public int getCommoditiesSearchTotal(String search) {
        List<Commodity> commoditySearch = commodityMapper.getCommoditySearch(search);
        ArrayList<Commodity> commodities = new ArrayList<>();
        Iterator<Commodity> iterator = commoditySearch.iterator();
        while (iterator.hasNext()){
            Commodity next = iterator.next();
            if(next.getState()==1){
                commodities.add(next);
            }
        }
        return commodities.size();
    }

    @Override
    public Integer getCommodityTatol(User user) {
        List<Commodity> commodityByuserid = commodityMapper.getCommodityByuserid(user.getUserId());
        return commodityByuserid.size();
    }

    @Override
    public boolean addImages(List<MultipartFile> images, BigInteger userId,BigInteger commodityid) {
        Iterator<MultipartFile> iterator = images.iterator();
        while (iterator.hasNext()){
            MultipartFile multipartFile = iterator.next();
//            System.out.println(multipartFile);
            try {
                String path ="D:\\ZgraduationImage\\image"+"\\userId_"+userId+"\\commodityid_"+commodityid;
                File file = new File(path);
                file.mkdir();
                multipartFile.transferTo(new File("D:\\ZgraduationImage\\image"+"\\userId_"+userId+"\\commodityid_"+commodityid+"\\commodityid_"+commodityid+multipartFile.getOriginalFilename()));
            } catch (IOException e) {
                e.printStackTrace();
                return false;
            }
        }
        return true;
    }
    public boolean deleteImages(BigInteger userId,BigInteger commodityid){
        String path ="D:\\ZgraduationImage\\image"+"\\userId_"+userId+"\\commodityid_"+commodityid;
        File fileImages = new File(path);
        if(!fileImages.exists()){
            return false;
        }
        File[] files = fileImages.listFiles();
        for (File file:files
             ) {
            if(file.isDirectory()){
                continue;
            }
            file.delete();
        }
        return true;
    }
    @Override
    public BigInteger addCommodity(User user, UserCommodityFront userCommodityFront) {
        BigInteger commodityId=null;
        try {
            BigInteger classifyId = classifyMapper.getClassifyId(userCommodityFront.getKey());
            Commodity commodity = new Commodity();
            commodity.setUserid(user.getUserId());
            commodity.setClassifyid(classifyId);
            commodity.setCommodityname(userCommodityFront.getName());
            commodity.setPrice(userCommodityFront.getPrice());
            commodity.setImage("空");
            commodity.setDetail(userCommodityFront.getDescription());
            commodity.setState(0);
            commodity.setIspay(0);
            commodity.setIspay(0);
            commodity.setFailbecause("无");
            commodityMapper.addCommodity(commodity);
            commodityId=commodity.getCommodityid();

            commodity.setImage("http://localhost:8080/glut/image"+"/userId_"+user.getUserId()+"/commodityid_"+commodityId);
            commodityMapper.updateCommodity(commodity);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return commodityId;
    }

    @Override
    public boolean apiUpdateCommodity(UserCommodityFront userCommodityFront) {
        BigInteger commodityid = userCommodityFront.getCommodityid();
        Commodity commodity = commodityMapper.getCommodityByCommodityId(commodityid);
        BigInteger classifyId = classifyMapper.getClassifyIdByClassName(userCommodityFront.getClassifyName());
        commodity.setState(0);
        commodity.setFailbecause("无");
        commodity.setCommodityname(userCommodityFront.getName());
        commodity.setDetail(userCommodityFront.getDescription());
        commodity.setClassifyid(classifyId);
        commodity.setPrice(userCommodityFront.getPrice());
        if(commodity.getIspay()==1){
            System.out.println("修改失败");
            return false;
        }
        try {
            commodityMapper.updateCommodity(commodity);
            if(deleteImages(commodity.getUserid(), commodity.getCommodityid())){
                addImages(userCommodityFront.getImages(),commodity.getUserid(),commodity.getCommodityid());
                return true;
            }
            return false;
        } catch (Exception e) {
            System.out.println("修改商品失败");
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean apiDeleteCommodity(BigInteger commodityId) {
        Commodity commodityByCommodityId = commodityMapper.getCommodityByCommodityId(commodityId);
        if(commodityByCommodityId==null){
            System.out.println("要删除的商品不存在");
            return false;
        }
        if(commodityByCommodityId.getIspay()==1){
            System.out.println("该商品已被付款");
            return false;
        }
        String imagePath = commodityByCommodityId.getImage().replace("http://localhost:8080/glut","D:/ZgraduationImage");
        File fileDirectory = new File(imagePath);
        File[] files =fileDirectory.listFiles();
        for (File file:files
             ) {
            file.delete();
        }
        fileDirectory.delete();
        try {
            if(new File(imagePath).exists())return false;
            commodityMapper.deleteCommodity(commodityId);
        } catch (Exception e) {
            System.out.println("删除商品失败");
            return false;
        }
        return true;
    }

    @Override
    public boolean deleteBecauseAddImages(BigInteger commodityId) {
        commodityMapper.deleteCommodity(commodityId);
        return true;
    }

    @Override
    public List<UserCommodityFront> getCommoditiesBykey(String key) {
        BigInteger classifyId=null;
        List<Commodity> commodityAll=null;
        if(key.equals("all")){
            commodityAll=commodityMapper.getCommodityAll();
        }else {
            classifyId = classifyMapper.getClassifyId(key);
            commodityAll = commodityMapper.getCommoditiesByClassifyId(classifyId);

        }
        Iterator<Commodity> iterator = commodityAll.iterator();
        ArrayList<UserCommodityFront> commodities = new ArrayList<>();
        while (iterator.hasNext()){
            Commodity commodity = iterator.next();
            if(commodity.getState()!=1) continue;//不是挂售中的跳过
            if(commodity.getIspay()==1) continue;//已付款跳过
            UserCommodityFront userCommodityFront = new UserCommodityFront();
            userCommodityFront.setCommodityid(commodity.getCommodityid());
            userCommodityFront.setUserid(commodity.getUserid());
            String classname = classifyMapper.getClassname(commodity.getClassifyid());
            if(classname==null) continue;
            userCommodityFront.setClassifyName(classname);
            userCommodityFront.setCommodityname(commodity.getCommodityname());
            String imagePathCatalogue = commodity.getImage().replace("http://localhost:8080/glut","D:/ZgraduationImage");
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
            userCommodityFront.setImagePath(imagePathList);
            userCommodityFront.setDetail(commodity.getDetail());
            userCommodityFront.setPrice(commodity.getPrice());
            userCommodityFront.setState(commodity.getState());
            userCommodityFront.setStateMsg(commodity.getState(),commodity.getFailbecause());
            userCommodityFront.setIspay(commodity.getIspay());
            commodities.add(userCommodityFront);
        }
        return commodities;
    }

    @Override
    public Commodity getCommodityById(BigInteger id) {
        return commodityMapper.getCommodityByCommodityId(id);
    }


}
