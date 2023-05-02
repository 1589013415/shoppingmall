import React, { Component } from 'react'
import { Route, Switch, Redirect } from "react-router-dom"
import { ShopOutlined, ContainerOutlined } from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import CommodityManage from '../CommodityManage';
import OrderManage from '../OrderManage/idnex';
const { Content, Sider, Header } = Layout;
const itemsMenu = [
    { key: "/manage/page/commodity", icon: React.createElement(ShopOutlined), label: "商品管理" },
    { key: "/manage/page/order", icon: React.createElement(ContainerOutlined), label: "订单管理" },
]
export class ManageHome extends Component {
    state = {
    };
    selectMenu = (event) => {
        const { key } = event
        this.props.historyPush(key)
    }
    render() {
        const { collapsed } = this.state
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

                    <Menu theme="dark" mode="inline" onSelect={this.selectMenu} items={itemsMenu} />
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
                            textAlign: "right"
                        }}
                    >
                        <Button
                            type="text"
                            onClick={() => { }}
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
