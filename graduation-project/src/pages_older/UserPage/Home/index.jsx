import React, { Component } from 'react'
import { Route, Switch, Redirect } from "react-router-dom"
import PubSub from 'pubsub-js'
import { Layout, Row, Spin } from 'antd';
import UserHeader from "../../../compoents/userCompoents/UserHeader适配修改"
import UserContent from "../UserContent"
import UserMyOreder from "../MyOrder"
import UserCommodity from '../UserCommodity'
import CommodityBugPage from '../CommodityBuyPage';
import axios from 'axios';
import cookies from 'js-cookie';



export class UserPage extends Component {
    state = {
        isLogin: false,
        isLoading: false,
        loadingTop: ""
    }
    isTokenExist = () => {
        let token = cookies.get("token")
        try {
            axios.get("/api/commodity/isTokenExist", { headers: { token } }).then(
                resopnes => {
                    if (resopnes.data.success) {
                        this.setState({ isLogin: resopnes.data.success })
                    }
                }
            )
        } catch (error) {
            console.log("首页购买请求失败", error);
        }
    }
    componentDidMount() {
        this.isTokenExist();
        this.token = PubSub.subscribe("isloading", (_, data) => {
            this.setState(data)
        })
    }
    componentWillUnmount() {
        PubSub.unsubscribe(this.token)
    }
    render() {
        const { Header, Footer, Content } = Layout;
        const { isLogin, isLoading, loadingTop } = this.state
        return (
            <Spin tip="Loading" size="large" spinning={isLoading} style={{ marginTop: loadingTop }}>
                <Layout>
                    <Header style={{ background: '#0a3f89', height: '75px' }} ><UserHeader /></Header>
                    <Content>
                        <Switch>
                            <Route path="/userhome/usercomtent" component={UserContent} />
                            {isLogin ? <Route path="/userhome/usermyorder" component={UserMyOreder} /> : null}
                            {isLogin ? <Route path="/userhome/usercommodity" component={UserCommodity} /> : null}
                            <Route path="/userhome/buycommodity/:commodityid" component={CommodityBugPage} />
                            <Redirect to="/userhome/usercomtent" />
                        </Switch>
                    </Content>
                </Layout>
            </Spin>
        )
    }
}

export default UserPage
