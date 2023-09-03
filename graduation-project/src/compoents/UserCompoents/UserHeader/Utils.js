import { Link } from 'react-router-dom';
import { UserOutlined, ShopTwoTone, ContainerTwoTone } from '@ant-design/icons';


function notLoginItems() {
    const item = [
        {
            title: (<><span style={{ color: 'aliceblue' }}><UserOutlined /> 我的商城</span></>),
            key: "mymall",
            menu: {
                items: [
                    { key: 'myorder', label: (<Link to="userorder"><span><ContainerTwoTone /> 我的订单</span></Link>), },
                    { key: 'mycommodities', label: (<Link to="usercommodities"><span><ShopTwoTone /> 我的商品</span></Link>), },
                ],
            },
        },
        {
            title: (<Link to="userlogin"><span style={{ color: "#FFE78F", fontSize: " 5%" }} > 登录</span></Link>),
            key: "userlogin",
        },
        {
            title: (<Link to="userregister"><span style={{ color: "#FFE78F", fontSize: " 5%" }} > 注册</span></Link>),
            key: "userlogin",
        },

    ]
    return item
}

export const Utils = {
    notLoginItems
};