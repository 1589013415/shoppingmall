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
 * 后端请求
 */
export const AXIOSPATH={
    userExistByGet:"/user/exit",
}

/**
 * token
 */
export const TOKEN={
    manager:"managerToken",
    user:"userToken",
}