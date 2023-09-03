import React, { Component } from 'react'
import { Form, Space, Button, Input, message } from "antd"
import axios from 'axios';
import cookie from "js-cookie"
export class UserMsgForm extends Component {
    state = {
    }
    formRef = React.createRef();
    formReset = () => { this.formRef.current.resetFields() }
    onFinish = (event) => {
        console.log(event);
        try {
            axios.post(`/api/usermsg/updatePassword`, event, { headers: { token: cookie.get("token") } }).then(
                respone => {
                    if (respone.data.success) {
                        this.props.onCloseEditUserMsgModal();
                    } else {
                        message.error(respone.data.msg)
                    }
                }
            )
        } catch (error) {
            console.log("修改密码失败", error);
        }
    }
    onFinishFailed = () => { }
    render() {
        const { user } = this.props
        return (
            <div>
                <Form
                    ref={this.formRef}
                    name="basic"

                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        style={{ display: "none" }}
                        initialValue={user.userId}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{ span: 18 }}
                        label="编号："
                        name="userid"
                        hasFeedback
                    >
                        <span>{user.userId}</span>
                    </Form.Item>
                    <Form.Item
                        style={{ display: "none" }}
                        initialValue={user.userName}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{ span: 18 }}
                        label="账号："
                        name="username"
                        hasFeedback
                    >
                        <span>{user.userName}</span>
                    </Form.Item>
                    <Form.Item
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{ span: 18 }}
                        label="旧密码："
                        name="oldPassword"
                        hasFeedback
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
                    >
                        <Input placeholder='请输入旧密码' />
                    </Form.Item>
                    <Form.Item
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{ span: 18 }}
                        label="新密码："
                        name="newPassword"
                        hasFeedback
                    >
                        <Input.Password placeholder='请输入旧密码' />
                    </Form.Item>
                    <Form.Item
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{ span: 18 }}
                        label="确认密码："
                        name="rePassword"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请输入新密码!',
                            },
                            //antd确认密码
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('两次密码不同!');
                                },
                            })
                        ]}
                    >
                        <Input.Password placeholder='在次确认密码' />
                    </Form.Item>
                    <Form.Item

                        wrapperCol={{
                            offset: 15,
                            span: 11,
                        }}
                    >
                        <Space>
                            <Button type="primary" htmlType="submit">确认</Button>
                            <Button htmlType="button" onClick={this.formReset} >取消</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default UserMsgForm
