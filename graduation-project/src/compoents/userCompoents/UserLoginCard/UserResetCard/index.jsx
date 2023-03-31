import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Card, Form, Input, Button, Space, message } from "antd"
import "./index.css"
import axios from 'axios';
import Cookies from 'js-cookie';
class UserLoginCard extends Component {
    formRef = React.createRef();
    onFinish = async (event) => {
        try {
            await axios.post("/user/resetpassword", event).then(
                respoense => {
                    if (respoense.data.success) {
                        this.FormRest();
                        message.success({
                            content: respoense.data.msg,
                            className: 'custom-class', style: {
                                marginTop: '20vh',
                                fontSize: "110%",
                            },
                        }, 0.8)
                        Cookies.remove("token")
                    } else {
                        message.error({
                            content: respoense.data.msg,
                            className: 'custom-class', style: {
                                marginTop: '20vh',
                                fontSize: "110%",
                                color: "red"
                            },
                        }, 0.8)
                    }
                }
            );
        } catch (error) {
            console.log("重置密码请求失败", error);
        }
    }
    onFinishFailed = (event) => {
        // console.log("用户登录提交数据失败", event);
    }
    FormRest = () => {
        this.formRef.current.resetFields();
    }
    onPressEnterAccount = () => {
        this.verifyCOdeInput.focus();
    }
    getVerify = async () => {
        let userName = this.formRef.current.getFieldValue("userName");
        if (userName === undefined) {
            message.error({
                content: "请输入你的账号",
                className: 'custom-class', style: {
                    marginTop: '20vh',
                    fontSize: "110%",
                    color: "red"
                },
            }, 0.8)
            return
        }
        await axios.get("/user/getverify/" + userName).then(
            response => {
                if (response.data.success) {
                    message.warning({
                        content: response.data.msg,
                        className: 'custom-class', style: {
                            marginTop: '20vh',
                            fontSize: "110%"
                        },
                    }, 2)
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
            }, error => { console.log("用户获取验证码失败"); }
        )

    }
    render() {
        const { isResetPassword } = this.props
        return (
            <Card
                title="重置密码"
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
                    width: 430,
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
                        name="userName"
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
                        <Space>
                            <Input placeholder='请输入你的账号' onPressEnter={this.onPressEnterAccount} />
                            <Button onClick={this.getVerify}>获得验证码</Button>
                        </Space>
                    </Form.Item>

                    <Form.Item
                        label="验证码："
                        name="verifyCode"
                        rules={[
                            {
                                required: true,
                                message: '请输入正确的验证码',
                            },
                            {
                                pattern: /^[0-9a-zA-Z]+$/,
                                message: '请输入正确的验证码!',
                            },
                            {
                                min: 4,
                                max: 4,
                                message: '验证码为4位!',
                            }
                        ]}
                        hasFeedback
                    >
                        <Input placeholder='区分大小写' ref={c => this.verifyCOdeInput = c} />
                    </Form.Item>
                    <Form.Item
                        label="密码："
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入新密码!',
                            },
                            {
                                pattern: /^[0-9a-zA-Z]+$/,
                                message: '密码只能为数字和字母!',
                            },
                            {
                                min: 3,
                                message: '密码最小为三位!',
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder='请输入你的新密码' />
                    </Form.Item>
                    <Form.Item
                        label="确认密码："
                        name="repassword"
                        rules={[
                            {
                                required: true,
                                message: '请输入新密码!',
                            },
                            //antd确认密码
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('两次密码不同!');
                                },
                            })
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder='请再一次确认密码' />
                    </Form.Item>
                    <Form.Item

                        wrapperCol={{
                            offset: 14,
                            span: 10,
                        }}
                    >
                        <Space>
                            <Button type="primary" htmlType="submit">重置</Button>
                            <Button htmlType="button" onClick={() => { isResetPassword(false) }} >取消</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default withRouter(UserLoginCard)
