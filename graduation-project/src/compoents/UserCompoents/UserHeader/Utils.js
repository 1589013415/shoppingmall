import React, { useContext } from 'react'
import { Link, useNavigate,useLocation} from 'react-router-dom';

import { Button, message } from 'antd';
import { UserOutlined, ShopTwoTone, ContainerTwoTone,UsbTwoTone } from '@ant-design/icons';

import axios from 'axios';
import cookie from 'js-cookie';

import { UserMyContext } from "../../../PageRoutes"
import { PAGEROUTES,TOKEN } from '../../const';

function LoginItems() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userState } = useContext(UserMyContext);
    const { isUserLogin, setIsUserLogin, messageApi } = userState;
    let exit = () => {
        axios.get("/user/exit", { headers: { token: cookie.get(TOKEN.userToken) } }).then(
            response => {
                const { msg } = response.data
                messageApi.open({
                    type: 'warning',
                    content: msg,
                });
                setIsUserLogin(false);
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
                    {
                        key: 'usermyorder',
                        label: (<Link to={PAGEROUTES.userOrder}>
                            <ContainerTwoTone /> 我的订单</Link>)
                    },
                    {
                        key: 'usermycommodities',
                        label: (<Link to={PAGEROUTES.userCommodities}>
                            <ShopTwoTone /> 我的商品</Link>)
                    },
                    {
                        key: 'usermycenter',
                        label: (<span
                            onClick={() => {/*TODO 个人中心按钮事件*/ }}
                           >
                            <UsbTwoTone /> 个人中心 </span>)
                    },
                ],
            },
        }
    ]
    let itemUserhome = {
        title: (
            <Link
                to={PAGEROUTES.userHome}>
                <span style={{ color: "#FFE78F", fontSize: " 5%" }} > 返回首页</span>
            </Link>),
        key: "userhome",
    }
    let itemUserlogin = {
        title: (
            <Link
                to={PAGEROUTES.userLogin}>
                <span style={{ color: "#FFE78F", fontSize: " 5%" }} > 登录</span>
            </Link>),
        key: "userlogin",
    }
    let itemUserRegister = {
        title: (
            <Link
                to={PAGEROUTES.userRegister}>
                <span style={{ color: "#FFE78F", fontSize: " 5%" }} > 注册</span>
            </Link>),
        key: "userregister",
    }
    let itemUserLoginPage = {
        title: (
            <Link
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
    let currentRoute=location.pathname;
    if (isUserLogin) {
        if (currentRoute !== PAGEROUTES.userLogin && currentRoute !== PAGEROUTES.userRegister) {
            item.push(itemUserLoginPage)
            item.push(itemUserExit)
        } else {
            item.push(itemUserhome)
        }
        if (currentRoute === PAGEROUTES.userLogin) {
            item.push(itemUserRegister)
        }
        if (currentRoute === PAGEROUTES.userRegister) {
            item.push(itemUserlogin)
        }
    } else {
        if(currentRoute === PAGEROUTES.userLogin){
            item.push(itemUserhome)
            item.push(itemUserRegister)
        }else if(currentRoute === PAGEROUTES.userRegister){
            item.push(itemUserhome)
            item.push(itemUserlogin)
        }else{
            item.push(itemUserlogin)
            item.push(itemUserRegister)
        }
    }
    return item
}

export const Utils = {
    LoginItems,
};