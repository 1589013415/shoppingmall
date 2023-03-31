import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Card, Form, Input, Button, Space, message } from "antd"
import axios from 'axios';

class RegisterCard extends Component {
    //antd推荐使用 Form.useForm 创建表单数据域进行控制。如果是在 class component 下，你也可以通过 ref 获取数据域。

    formRef = React.createRef();
    onFinish = async (event) => {
        try {
            await axios.post("/user/register", event).then(
                response => {
                    if (response.data.success) {
                        this.formReset();
                        message.success({
                            content: "注册成功",
                            className: 'custom-class', style: {
                                marginTop: '20vh',
                                fontSize: "110%",
                            },
                        }, 0.8)
                        this.props.history.push("/userlogin")
                    } else {
                        message.error({
                            content: response.data.msg,
                            className: 'custom-class', style: {
                                marginTop: '20vh',
                                fontSize: "110%",
                            },
                        }, 0.8)
                    }
                }
            )
        } catch (error) {
            console.log("请求失败")
        }
    }
    onFinishFailed = (event) => {
        console.log("用户登录提交数据失败", event);
    }

    formReset = () => {
        this.formRef.current.resetFields();
    }
    getVerify = async () => {
        let email = this.formRef.current.getFieldValue("email");
        let emailError = this.formRef.current.getFieldError("email")
        if (email === undefined || emailError[0] === '请输入正确邮箱格式!') {
            message.error({
                content: "请保证邮箱的邮箱性",
                className: 'custom-class', style: {
                    marginTop: '20vh',
                    fontSize: "110%",
                    color: "red"
                },
            }, 0.8)
            return
        }
        await axios.get("/user/getverifyRegister/" + email).then(
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
        return (
            <Card
                title="注册账号"
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
                        <Input placeholder='请输入你的账号' />
                    </Form.Item>

                    <Form.Item
                        label="密码："
                        name="userPassword"
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
                                message: '密码最小为三位!',
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder='请输入你的密码' />
                    </Form.Item>
                    <Form.Item
                        label="确认密码："
                        name="repassword"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                            //antd确认密码
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (getFieldValue('userPassword') === value) {
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
                        label="邮箱："
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: '请输入邮箱!',
                            },
                            {
                                pattern: /^([0-9a-zA-Z_-])+@([0-9a-zA-Z_-])+(.[0-9a-zA-Z_-]+)$/,
                                message: "请输入正确邮箱格式!"
                            }
                        ]}
                        hasFeedback
                    >
                        <Input placeholder='请保证邮箱的有效性' />
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
                        hasFeedback>
                        <Space>
                            <Input placeholder='输入你的验证码' onPressEnter={this.onPressEnterAccount} />
                            <Button onClick={this.getVerify}>获得验证码</Button>
                        </Space>
                    </Form.Item>
                    <Form.Item

                        wrapperCol={{
                            offset: 14,
                            span: 10,
                        }}
                    >
                        <Space>
                            <Button type="primary" htmlType="submit">注册账号</Button>
                            <Button htmlType="button" onClick={this.formReset} >取消</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default withRouter(RegisterCard)
