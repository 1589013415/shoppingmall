import React, { useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { Button, message } from 'antd';
import { UserOutlined, ShopTwoTone, ContainerTwoTone } from '@ant-design/icons';

import axios from 'axios';
import cookie from 'js-cookie';

import { UserMyContext } from "../../../PageRoutes"
import { PAGEROUTES,PAGESTATE,TOKEN } from '../../const';

function LoginItems() {
    const navigate = useNavigate()
    const { userState } = useContext(UserMyContext);
    const { isUserLogin, setIsUserLogin, userPageState, setUserPageState,messageApi } = userState;
    let exit = () => {
        axios.get("/user/exit", { headers: { token: cookie.get(TOKEN.userToken) } }).then(
            response => {
                const {msg}=response.data
                messageApi.open({
                    type: 'warning',
                    content: msg,
                });
                setIsUserLogin(false);
                setUserPageState(PAGESTATE.userHome)
                navigate(PAGEROUTES.userHome);
                cookie.remove(TOKEN.userToken);
            }
        ).catch(error => message.error(error.message));
    }
    let item = [
        {
            title: (<><span style={{ color: 'aliceblue' }}><UserOutlined /> 我的商城</span></>),
            key: "usermymall",
            menu: {
                items: [
                    { key: 'usermyorder', label: (<Link to={PAGEROUTES.userOrder}><span><ContainerTwoTone /> 我的订单</span></Link>), },
                    { key: 'usermycommodities', label: (<Link to={PAGEROUTES.userCommodities}><span><ShopTwoTone /> 我的商品</span></Link>), },
                ],
            },
        }
    ]
    let itemUserhome = {
        title: (
            <Link
                onClick={() => { setUserPageState(PAGESTATE.userHome) }}
                to={PAGEROUTES.userHome}>
                <span style={{ color: "#FFE78F", fontSize: " 5%" }} > 返回首页</span>
            </Link>),
        key: "userhome",
    }
    let itemUserlogin = {
        title: (
            <Link
                onClick={() => { setUserPageState(PAGESTATE.userLogin) }}
                to={PAGEROUTES.userLogin}>
                <span style={{ color: "#FFE78F", fontSize: " 5%" }} > 登录</span>
            </Link>),
        key: "userlogin",
    }
    let itemUserRegister = {
        title: (
            <Link
                onClick={() => { setUserPageState(PAGESTATE.userRegister) }}
                to={PAGEROUTES.userRegister}>
                <span style={{ color: "#FFE78F", fontSize: " 5%" }} > 注册</span>
            </Link>),
        key: "userregister",
    }
    let itemUserLoginPage = {
        title: (
            <Link
                onClick={() => { setUserPageState(PAGESTATE.userLogin) }}
                to={PAGEROUTES.userLogin}>
                <span style={{ color: "#FFE78F", fontSize: " 5%" }} > 重新登录</span>
            </Link>),
        key: "userregister",
    }
    let itemUserExit = {
        title: (
            <Button
                onClick={exit}
                type='text'
                size='small'
                style={{ color: "#FFE78F", fontSize: " 5%" }}>
                <span>退出</span>
            </Button>
        ),
        key: "userExit",
    }
    if (isUserLogin) {
        if(userPageState!==PAGESTATE.userLogin&&userPageState!==PAGESTATE.userRegister){
        item.push(itemUserLoginPage)
        item.push(itemUserExit)
        }else{
            item.push(itemUserhome)
        }
        if(userPageState===PAGESTATE.userLogin){
            item.push(itemUserRegister)
        }
        if(userPageState===PAGESTATE.userRegister){
            item.push(itemUserlogin)
        }
    } else {
        if (userPageState === PAGESTATE.userHome) {
            item.push(itemUserlogin)
            item.push(itemUserRegister)
        } else if (userPageState === PAGESTATE.userLogin) {
            item.push(itemUserhome)
            item.push(itemUserRegister)
        } else if (userPageState === PAGESTATE.userRegister) {
            item.push(itemUserhome)
            item.push(itemUserlogin)
        }
    }
    return item
}

export const Utils = {
    LoginItems
};