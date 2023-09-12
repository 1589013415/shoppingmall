import React ,{useContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import { Card, Form} from "antd"

import { UserMyContext } from '../../../PageRoutes';
import {Utils} from "./Utils"

export default function UserLoginForm() {
  const [isLoginFalg, setIsLoginFalg] =React.useState(true)
  const [form] = Form.useForm();
  const { userState } = useContext(UserMyContext);
  const {isUserLogin}=userState
  const navigate = useNavigate()
  let loginParm={userState,navigate,form,isLoginFalg, setIsLoginFalg}
  let onFinish=(formData)=>{
    isLoginFalg?Utils.OnFinishLogin({...loginParm,formData}):Utils.OnFinishReset({...loginParm,formData})
  }
  useEffect(()=>{
    form.resetFields()
  },[isLoginFalg,form])
  return (
      <Card
          title={isLoginFalg?(!isUserLogin?"登录":"重新登录"):"重置密码"}
          bordered={false}
          headStyle={Utils.headStyle}
          bodyStyle={Utils.bodyStyle}
          style={{width: 360}}
      >
          <Form
              form={form}
              onFinish={onFinish}
              onFinishFailed={Utils.OnFinishFailed}
              labelCol={{span: 5}}
              wrapperCol={{span: 19}}
              initialValues={{remember: true,}}
              name="basic"
              autoComplete="off"
          >  
          {Utils.FormItem(loginParm)}
          </Form>
      </Card>
  )
}
