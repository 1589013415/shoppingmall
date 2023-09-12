/**
 * 路由常量
 */
export const PAGEROUTES={
    //用户商城路由
    userPage:"/userpage",
    userHome:"/userpage/userhome",
    userLogin:"/userpage/userlogin",
    userRegister:"/userpage/useregister",
    userOrder:"/userpage/userorder",
    userCommodities:"/userpage/usercommodities",
    //管理系统路由
    managerPage:"/managerpage",
}

/**
 * token
 */
export const TOKEN={
    managerToken:"managerToken",
    userToken:"userToken",
}

/**
 * 用户账号的状态
 */
export const USERACCOUNTSTATE={
    Forbidden:0,//禁用
    notLogin:1,//激活
    Alreadylogin:2,//已登录
}