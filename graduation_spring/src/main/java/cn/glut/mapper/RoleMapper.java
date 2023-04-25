package cn.glut.mapper;

import cn.glut.pojo.Order;
import cn.glut.pojo.Role;
import org.apache.ibatis.annotations.Select;

public interface RoleMapper {
    @Select("select *from `Role` where roleid=#{roleid}")
    public Role getOrderByOrderId(int roleid);
}
