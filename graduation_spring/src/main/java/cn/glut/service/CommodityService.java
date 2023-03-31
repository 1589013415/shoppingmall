package cn.glut.service;

import cn.glut.pojo.Classify;
import cn.glut.pojo.Commodity;
import cn.glut.pojo.User;
import cn.glut.pojo.UserCommodityFront;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigInteger;
import java.util.List;

public interface CommodityService {
    public List<Classify> getCommodityClassify();

    public List<Classify> getClassify();

    public List<Classify> getCommodityClassifyAndAll();

    public List<UserCommodityFront> getCommodityByUserid(User user,int pageNume,int pageSizea);

    public UserCommodityFront getCommodityByCommodityid(BigInteger commodiyid);

    public List<UserCommodityFront> getCommoditiesBySearch(String search,int pageNum,int pageSize);
    public int getCommoditiesSearchTotal(String search);

    public Integer getCommodityTatol(User user);

    public boolean addImages(List<MultipartFile> images, BigInteger userId,BigInteger commodityId);

    public boolean deleteImages(BigInteger userId,BigInteger commodityid);

    public BigInteger addCommodity(User user, UserCommodityFront userCommodityFront);

    public boolean apiUpdateCommodity(UserCommodityFront userCommodityFront);

    public boolean apiDeleteCommodity(BigInteger commodityId);

    public boolean deleteBecauseAddImages(BigInteger commodityId);

    public List<UserCommodityFront> getCommoditiesBykey(String key);

    public Commodity getCommodityById(BigInteger id);

}
