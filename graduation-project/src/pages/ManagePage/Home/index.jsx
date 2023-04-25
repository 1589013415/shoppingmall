import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import cookies from 'js-cookie';
import axios from "axios";
import LoginPageM from "../LoginPageM/index"
import ManageHome from '../ManageHome/idnex';
export class ManagePage extends Component {
    state = {
        isLogin: false
    }
    componentDidMount() {
        //用token接住，挂载在当前实例上，token用于后面的取消订阅
        this.token = PubSub.subscribe("isLoginManage", (_, data) => {
            this.setState(data)
        })
        // this.isTokenExist();
    }
    //在组件销毁前，取消订阅
    componentWillUnmount() {
        PubSub.unsubscribe(this.token)
    }
    isTokenExist = () => {
        let token = cookies.get("tokenmanage")
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
    render() {
        const { isLogin } = this.state
        return (
            <div>
                {isLogin ? <ManageHome /> : <LoginPageM />}
            </div>
        )
    }
}

export default ManagePage
