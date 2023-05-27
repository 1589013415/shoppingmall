import React, { Component } from 'react'
import { Route, Switch, Redirect } from "react-router-dom"
import { ShopOutlined, ContainerOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, message } from 'antd';
import cookies from 'js-cookie';
import axios from "axios";
import PubSub from 'pubsub-js'
import CommodityManage from '../CommodityManage';
import OrderManage from '../OrderManage/index';

const { Content, Sider, Header } = Layout;
const itemsMenu = [
    { key: "/manage/page/commodity", icon: React.createElement(ShopOutlined), label: "商品管理" },
    { key: "/manage/page/order", icon: React.createElement(ContainerOutlined), label: "订单管理" },
]
export class ManageHome extends Component {
    state = {
        siderMemu: ""
    };
    selectMenu = (event) => {
        const { key } = event
        this.setState({ siderMemu: key })
        this.props.historyPush(key)
    }
    exit = async () => {
        await axios.get("/user/exit", { headers: { token: cookies.get("tokenmanage") } }).then(
            response => {
                cookies.remove("tokenmanage")
                PubSub.publish("isLoginManage", { isLogin: false });
                message.success({
                    content: response.data.msg,
                    className: 'custom-class', style: {
                        marginTop: '20vh',
                        fontSize: "110%",
                    },
                }, 0.8)
            }
        )
    }
    componentDidMount() {
        this.setState({ siderMemu: window.location.pathname })
    }
    render() {
        const { collapsed, siderMemu } = this.state
        debugger
        return (
            <Layout hasSider>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    <div
                        style={{
                            height: 32,
                            margin: 16,
                            background: 'rgba(255, 255, 255, 0.2)',
                            textAlign: "center",
                        }}
                    ><div style={{ color: "aliceblue", paddingTop: "5px" }}>桂林理工二手商城</div></div>

                    <Menu theme="dark" mode="inline" onSelect={this.selectMenu} selectedKeys={siderMemu} defaultSelectedKeys={`${siderMemu}`} items={itemsMenu} />
                </Sider>
                <Layout
                    className="site-layout"
                    style={{
                        marginLeft: 200,
                    }}
                >
                    <Header
                        style={{
                            padding: 0,
                            background: "#f5f5f5",
                            textAlign: "right",
                            height: "40px"
                        }}
                    >
                        <Button
                            type="text"
                            onClick={this.exit}
                        ><span style={{ color: "red" }}>安全退出</span></Button>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px 0',
                            overflow: 'initial',
                        }}
                    >
                        <Switch>
                            <Route path="/manage/page/commodity" component={CommodityManage} />
                            <Route path="/manage/page/order" component={OrderManage} />
                            <Redirect to="/manage/page/commodity" />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default ManageHome
