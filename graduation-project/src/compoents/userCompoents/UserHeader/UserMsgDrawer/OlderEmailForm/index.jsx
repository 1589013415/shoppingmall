import React, { Component } from 'react'
import { Form, Space, Button, Input, message } from "antd"
import axios from 'axios';
import cookie from "js-cookie"
export class OlderFormEmailForm extends Component {
  formRef = React.createRef();
  onFinish = (event) => {
    event = { olderEmail: this.props.user.email, olderVerify: event.olderVerify }
    try {
      axios.post(`/api/usermsg/verifyOldEmail`, event, { headers: { token: cookie.get("token") } }).then(
        respones => {
          if (respones.data.success) {
            this.props.setStateOldEmailAndNewEmail();
          } else {
            message.error(respones.data.msg)
          }
        }
      )
    } catch (error) {
      console.log("修改用户信息失败", error);
    }
  }
  onFinishFailed = () => { }
  getVerify = () => {
    try {
      axios.post(`/api/usermsg/getVerify`, this.props.user, { headers: { token: cookie.get("token") } }).then(
        response => {
          if (response.data.success) {
            message.success(response.data.msg)
          } else {
            message.error(response.data.msg)
          }
        }
      )
    } catch (error) {

    }
  }
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
            initialValue={user.userEmail}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{ span: 18 }}
            label="旧邮箱："
            name="olderEmail"
            hasFeedback
          >
            <Input defaultValue={user.email} disabled />
          </Form.Item>
          <Form.Item
            label="验证码："
            name="olderVerify"
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

export default OlderFormEmailForm
