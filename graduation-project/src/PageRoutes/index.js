import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom"

import {message} from 'antd';

import { PAGEROUTES, PAGESTATE} from '../compoents/const/index'
import UserPage from '../pages/UserPage/index'
import ManagePager from "../pages/ManagerPage/index"
import Loading from '../compoents/Loading/idnex';
const UserHomne = lazy(() => import("../pages/UserHome"))
const UserLogin = lazy(() => import("../pages/UserLogin"))
const Userregister = lazy(() => import("../pages/UserRegister"))
const UserOrder = lazy(() => import("../pages/UserOrder"))
const UserCommodities = lazy(() => import("../pages/UserCommodities"))

export const UserMyContext = React.createContext();
/**
 * 
 * @returns 用户商城路由
 */
function UserRoutes() {
    return (
        <Route path={PAGEROUTES.userPage} element={<UserPage />} >
            <Route path={PAGEROUTES.userHome} element={<Suspense fallback={<Loading />}><UserHomne /></Suspense>} />
            <Route path={PAGEROUTES.userLogin} element={<Suspense fallback={<Loading />}><UserLogin /></Suspense>} />
            <Route path={PAGEROUTES.userRegister} element={<Suspense fallback={<Loading />}><Userregister /></Suspense>} />
            <Route path={PAGEROUTES.userOrder} element={<Suspense fallback={<Loading />}><UserOrder /></Suspense>} />
            <Route path={PAGEROUTES.userCommodities} element={<Suspense fallback={<Loading />}><UserCommodities /></Suspense>} />
            <Route path={PAGEROUTES.userPage} element={<Navigate to={PAGEROUTES.userHome} />} />
        </Route>

    )
}
/**
 * 
 * @returns 管理者系统路由
 */
function ManagerRoutes() {
    return (
        <Route path={PAGEROUTES.managerPage} element={<ManagePager />} />
    )
}

export default function PageRoutes() {
    //用户商城属性
    const [isUserLogin, setIsUserLogin] = React.useState(false)
    const [userPageState, setUserPageState] = React.useState(PAGESTATE.userHome)
    const [messageApi, contextHolder] = message.useMessage();
    let userState = { isUserLogin, setIsUserLogin, userPageState, setUserPageState,messageApi, contextHolder}
    //TODO 管理系统属性
    return (
        <BrowserRouter>
            <UserMyContext.Provider value={{userState}}>
                {contextHolder}
                <Routes>
                    {UserRoutes()}
                    {ManagerRoutes()}
                    <Route path="*" element={<Navigate to={PAGEROUTES.userPage} />} />
                </Routes>
            </UserMyContext.Provider>
        </BrowserRouter>
    )
}