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
 * 页面状态常量
 */
export const PAGESTATE={
    userHome:"userHome",
    userLogin:"userLogin",
    userRegister:"userRegister"
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
    Active:0,//激活
    Forbidden:1,//禁用
    Alreadylogin:2,//已登录
}