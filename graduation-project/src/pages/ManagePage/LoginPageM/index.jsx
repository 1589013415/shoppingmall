import React, { Component } from 'react'
import { Route, Switch, withRouter } from "react-router-dom"
import PubSub from 'pubsub-js'
import cookies from "js-cookie"
import axios from "axios";
import { Card, Form, Input, Button, Space, message, Modal } from "antd"
import "./index.css"
const { confirm } = Modal;
export class LoginPageM extends Component {
    formRef = React.createRef();
    onFinish = async (event) => {
        try {
            await axios.post(`/manage/login`, event).then(
                response => {
                    const { state, success, resultData } = response.data
                    if (success) {
                        PubSub.publish("isLoginManage", { isLogin: true });
                        cookies.set('tokenmanage', resultData.token, { expires: 1 });
                        this.FormRest();
                    } else {
                        if (3 === state) {//1:用户激活; //2用户账号被禁用；//3：用户已登录
                            this.showConfirm(event)
                        } else {
                            message.error({
                                content: response.data.msg,
                                className: 'custom-class', style: {
                                    marginTop: '20vh',
                                    fontSize: "110%",
                                    color: "red"
                                },
                            }, 0.8)
                        }

                    }
                }
            )
        } catch {
            console.log("提交数据失败，未获得后端返回的数据");
        }
    }
    onFinishFailed = (event) => {
        // console.log("用户登录提交数据失败", event);
    }
    FormRest = () => {
        this.formRef.current.resetFields();;
    }
    onPressEnterAccount = () => {
        this.passwordInput.focus();
    }
    //重复登录showConfirm
    showConfirm = (event) => {
        confirm({
            title: '用户已登录，是否重复登录',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                try {
                    await axios.post(`/manage/relogin`, event).then(
                        response => {
                            const { state, success, resultData } = response.data
                            if (success) {
                                cookies.set('tokenmanage', resultData.token, { expires: 1 });
                                PubSub.publish("isLoginManage", { isLogin: true });
                                this.FormRest();
                            } else {
                                if (3 === state) {//1:用户激活; //2用户账号被禁用；//3：用户已登录
                                    this.showConfirm(event)
                                } else {
                                    message.error({
                                        content: response.data.msg,
                                        className: 'custom-class', style: {
                                            marginTop: '20vh',
                                            fontSize: "110%",
                                            color: "red"
                                        },
                                    }, 0.8)
                                }

                            }
                        }
                    )
                } catch {
                    console.log("提交数据失败，未获得后端返回的数据");
                }
            },
            onCancel() {

            },
        });
    }
    render() {
        return (
            <div className='userLoginBackground'>
                <div className='userLoginDIV'>
                    <Card
                        title="登录"
                        bordered={false}
                        headStyle={{
                            background: '#1677ff',
                            textAlign: 'center',
                            fontSize: '180%',
                            fontFamily: '宋体',
                            color: "white"
                        }}
                        bodyStyle={{
                            background: 'rgba(20, 108, 232, 0.5)'
                        }}
                        style={{
                            width: 360,
                        }}
                    >
                        <Form
                            ref={this.formRef}
                            name="basic"
                            labelCol={{
                                span: 5,
                            }}
                            wrapperCol={{
                                span: 19,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="账号："
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入账号!',
                                    },
                                    {
                                        pattern: /^\d{6}$/,
                                        message: "账号只能为6位的数字!"
                                    }
                                ]}
                                hasFeedback
                            >
                                <Input placeholder='请输入你的账号' onPressEnter={this.onPressEnterAccount} />
                            </Form.Item>

                            <Form.Item
                                label="密码："
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码!',
                                    },
                                    {
                                        pattern: /^[0-9a-zA-Z]+$/,
                                        message: '密码只能为数字和字母!',
                                    },
                                    {
                                        min: 3,
                                        message: '密码最起码为6位!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder='请输入你的密码' ref={c => this.passwordInput = c} />
                            </Form.Item>
                            <Form.Item

                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Space>
                                    <Button type="primary" htmlType="submit"> 登录</Button>
                                    <Button htmlType="button" onClick={this.FormRest} >取消</Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </div>
        )
    }
}
export default withRouter(LoginPageM)
