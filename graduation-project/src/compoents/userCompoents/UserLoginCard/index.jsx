import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import cookies from "js-cookie"
import { Card, Form, Input, Button, Space, message } from "antd"
import axios from "axios";
import "./index.css"
class UserLoginCard extends Component {
    formRef = React.createRef();
    onFinish = async (event) => {
        try {
            await axios.post(`/user/login`, event).then(
                response => {
                    if (response.data.success) {
                        // let cookieSurvivalTime = new Date(new Date().getTime() + 24 * 3600 * 1000);
                        cookies.set('token', response.data.resultData.token, { expires: 1 });
                        this.props.history.push("/userhome")
                        this.FormRest();
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
    render() {
        const { isResetPassword } = this.props;
        return (
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
                            <Button type='link' size="small" >
                                <span className='forgetPassword' onClick={() => { isResetPassword(true) }}>忘记密码</span>
                            </Button>
                            <Button type="primary" htmlType="submit"> 登录</Button>
                            <Button htmlType="button" onClick={this.FormRest} >取消</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default withRouter(UserLoginCard)
