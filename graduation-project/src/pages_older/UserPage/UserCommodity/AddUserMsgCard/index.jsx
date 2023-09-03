import React, { Component } from 'react'
import { Row, Form, Input, Button, message } from "antd"
import axios from 'axios'
import cookie from "js-cookie"
export class AddUserMsgCard extends Component {
    onFinish = async (event) => {
        await axios.post("/api/usermsg/addusermsg", event, { headers: { token: cookie.get("token") } }).then(
            response => {
                if (response.data.success) {
                    message.success(response.data.msg)
                    this.props.onCloseResgiterUserMsgModal();
                } else {
                    message.error(response.data.msg)
                }
            }
        )
    }
    onFinishFailed = () => {
        console.log("添加用户信息失败");
    }
    inputNickName = (event) => {
        if (event.code === "Enter") {
            this.inputPhoto.focus()
        }
    }
    render() {
        return (
            <div >
                <Form encType="multipart/form-data" layout="vertical" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                    <Form.Item
                        name="nickname"
                        label="昵称："
                        rules={[
                            {
                                required: true,
                                message: '请输入你的用户名',
                            },
                            {
                                max: 6, min: 2,
                                message: "用户名最小为4个字符，最大为6个字符"
                            }
                        ]}
                    >
                        <Input onKeyDown={this.inputNickName} placeholder="请输入你的用户名" />
                    </Form.Item>
                    <Form.Item
                        name="photo"
                        label="手机号码："
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
                    >
                        <Input ref={(e) => { this.inputPhoto = e }} placeholder="请输入你的手机号码" />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="宿舍地址："
                        rules={[
                            {
                                required: true,
                                message: '请输入专业班级',
                            },
                            {
                                min: 2, max: 15,
                                message: "地址字数超出范围"
                            }
                        ]}
                    >
                        <Input ref={(e) => { this.inputaddress = e }} placeholder="如：一号组团，9B303" />
                    </Form.Item>

                    <div style={{ height: "20px" }} />
                    <Row justify="end">
                        <Form.Item>
                            <Button htmlType='submit'>
                                确认添加
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default AddUserMsgCard
