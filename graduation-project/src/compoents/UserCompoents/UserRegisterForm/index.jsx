import React ,{useContext} from 'react'
import { useNavigate } from 'react-router-dom';

import { Card, Form} from "antd"

import { UserMyContext } from '../../../PageRoutes';
import {Utils} from "./Utils"

export default function UserLoginForm() {
const { userState } = useContext(UserMyContext);
  const [form] = Form.useForm();
  const navigate = useNavigate()
  let registerParm={navigate,form,userState}
  return (
      <Card
          title="注册"
          bordered={false}
          headStyle={Utils.headStyle}
          bodyStyle={Utils.bodyStyle}
          style={{width: 430}}
      >
          <Form
              form={form}
              onFinish={Utils.onFinish}
              onFinishFailed={Utils.OnFinishFailed}
              labelCol={{span: 5}}
              wrapperCol={{span: 19}}
              initialValues={{remember: true,}}
              name="basic"
              autoComplete="off"
          >  
          {Utils.FormItem(registerParm)}
          </Form>
      </Card>
  )
}
