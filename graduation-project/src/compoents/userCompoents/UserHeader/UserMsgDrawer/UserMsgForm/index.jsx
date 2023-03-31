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
        try {
            axios.post(`/api/usermsg/editUserMsg`, event, { headers: { token: cookie.get("token") } }).then(
                respone => {
                    if (respone.data.success) {
                        this.props.onCloseEditUserMsgModal();
                    } else {
                        message.error(respone.data.msg)
                    }
                }
            )
        } catch (error) {
            console.log("修改用户信息失败", error);
        }
    }
    onFinishFailed = () => { }
    render() {
        const { userMsg, user } = this.props
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
                        initialValue={userMsg.nickname || null}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{ span: 18 }}
                        label="昵称："
                        name="nickname"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的昵称!',
                            },
                            {
                                min: 2, max: 6,
                                message: "昵称最短为2个字符，最长为6个字符!"
                            }
                        ]}
                        hasFeedback
                    >
                        <Input onPressEnter={() => { this.inputPhoto.focus() }} placeholder='请输入你的昵称' />
                    </Form.Item>
                    <Form.Item
                        initialValue={userMsg.photo || null}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{ span: 18 }}
                        label="电话："
                        name="photo"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的手机号码',
                            },
                            {
                                pattern: /^1[3-9][0-9]{9}$/,
                                message: "请输入正确的手机格式"
                            }

                        ]}
                        hasFeedback
                    >
                        <Input ref={e => this.inputPhoto = e} onPressEnter={() => { this.inputaddress.focus() }} placeholder='请输入你的手机号码' />
                    </Form.Item>
                    <Form.Item
                        initialValue={userMsg.address || null}
                        name="address"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{ span: 18 }}
                        label="宿舍地址："
                        rules={[
                            {
                                required: true,
                                message: '请输入宿舍地址',
                            },
                            {
                                min: 10, max: 15,
                                message: "请输入正确地址"
                            }
                        ]}
                    >
                        <Input ref={(e) => { this.inputaddress = e }} placeholder="格式：一号组团，9B303" />
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
