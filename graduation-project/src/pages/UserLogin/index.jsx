import React from 'react'

import { Col, Row } from "antd"
import UserLoginForm from "../../compoents/UserCompoents/UserLoginForm"
import "./index.css"

export const LoginConext = React.createContext();

export default function UserLogin() {
  return (
    <div className='userLoginBackground'>
      <Row>
        <Col span={6}></Col>
        <Col span={6}>
          <div className='userLoginDivLeft'>
            <span className='userLoginSpanText'>React二手商城<br />玖成心,废变新</span>
          </div>
        </Col>
        <Col span={9} offset={2}>
          <div className='userLoginDivRight'></div>
            <UserLoginForm />
        </Col>
      </Row>
    </div>
  )
}
