import React, { Component } from 'react'
import { Form, Space, Button, Input, message } from "antd"
import axios from 'axios';
import cookie from "js-cookie"
export class NewEmailForm extends Component {
  formRef = React.createRef();
  getVerify = () => {
    if (this.formRef.current.getFieldValue("newEmail") === "" || this.formRef.current.getFieldValue("newEmail") === undefined) {
      message.warning("请输入邮箱")
      return
    }
    let user = this.props.user
    user.email = this.formRef.current.getFieldValue("newEmail")
    try {
      axios.post(`/api/usermsg/getVerifyNewEmail`, user, { headers: { token: cookie.get("token") } }).then(
        response => {
          if (response.data.success) {
            message.success(response.data.msg)
          } else {
            message.error(response.data.msg)
          }
        }
      )
    } catch (error) {
      console.log("获得绑定新邮箱的验证码失败", error);
    }
  }
  onFinish = (event) => {
    try {
      axios.post(`/api/usermsg/verifyNewEmail`, event, { headers: { token: cookie.get("token") } }).then(
        respones => {
          if (respones.data.success) {
            message.success(respones.data.msg)
            this.props.onCloseEditUserMsgModal();
          } else {
            message.error(respones.data.msg)
          }
        }
      )
    } catch (error) {
      console.log("绑定新邮箱失败", error);
    }
  }
  render() {
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
            labelCol={{
              span: 4,
            }}
            wrapperCol={{ span: 18 }}
            label="新邮箱："
            name="newEmail"
            hasFeedback
          >
            <Input placeholder="请输入新邮箱" />
          </Form.Item>
          <Form.Item
            label="验证码："
            name="newVerify"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{ span: 18 }}
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
              offset: 15,
              span: 11,
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit">确认</Button>
              <Button htmlType="button" onClick={() => {
                this.formRef.current.resetFields()
              }} >取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default NewEmailForm
