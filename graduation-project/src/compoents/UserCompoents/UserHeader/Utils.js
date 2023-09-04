import { Link, useNavigate } from 'react-router-dom';

import { Button, message } from 'antd';
import { UserOutlined, ShopTwoTone, ContainerTwoTone } from '@ant-design/icons';

import axios from 'axios';
import cookie from 'js-cookie';


function LoginItems(stateMethods) {
    const navigate = useNavigate()
    const { isLogin, setIsLogin, pageState, setPageState } = stateMethods
    let exit = () => {
        axios.get("/user/exit", { headers: { token: cookie.get("usertoken") } }).then(
            response => {
                message.success({
                    content: response.data.msg,
                    className: 'custom-class', style: {
                        marginTop: '20vh',
                        fontSize: "110%",
                    },
                }, 0.8)
                setIsLogin(false);
                setPageState("userhome")
                navigate("userhome");
                cookie.remove("usertoken");
            }
        ).catch(error => message.error(error.message));
    }
    let item = [
        {
            title: (<><span style={{ color: 'aliceblue' }}><UserOutlined /> 我的商城</span></>),
            key: "usermymall",
            menu: {
                items: [
                    { key: 'usermyorder', label: (<Link to="userorder"><span><ContainerTwoTone /> 我的订单</span></Link>), },
                    { key: 'usermycommodities', label: (<Link to="usercommodities"><span><ShopTwoTone /> 我的商品</span></Link>), },
                ],
            },
        }
    ]
    let itemUserhome = {
        title: (
            <Link
                onClick={() => { setPageState("userhome") }}
                to="userhome">
                <span style={{ color: "#FFE78F", fontSize: " 5%" }} > 返回首页</span>
            </Link>),
        key: "userhome",
    }
    let itemUserlogin = {
        title: (
            <Link
                onClick={() => { setPageState("userlogin") }}
                to="userlogin">
                <span style={{ color: "#FFE78F", fontSize: " 5%" }} > 登录</span>
            </Link>),
        key: "userlogin",
    }
    let itemUserRegister = {
        title: (
            <Link
                onClick={() => { setPageState("userregister") }}
                to="userregister">
                <span style={{ color: "#FFE78F", fontSize: " 5%" }} > 注册</span>
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
    if (isLogin) {
        item.push(itemUserExit)
    } else {
        if (pageState === "userhome") {
            item.push(itemUserlogin)
            item.push(itemUserRegister)
        } else if (pageState === "userlogin") {
            item.push(itemUserhome)
            item.push(itemUserRegister)
        } else if (pageState === "userregister") {
            item.push(itemUserhome)
            item.push(itemUserlogin)
        }
    }
    return item
}

export const Utils = {
    LoginItems
};