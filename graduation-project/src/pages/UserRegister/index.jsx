import React from 'react'

import { Col, Row } from "antd"

import UserRegisyter from "../../compoents/UserCompoents/UserRegisterForm"
import "./index.css"

export default function Userregister() {
  return (
    <div className='userRegisterBackground'>
    <Row>
      <Col span={6}></Col>
      <Col span={6}>
        <div className='useRegisterDivLeft'>
          <span className='userRegisterSpanText'>欢迎使用!!!<br />React二手商城</span>
        </div>
      </Col>
      <Col span={9} offset={2}>
        <div className='userRegisterDivRight'></div>
        <UserRegisyter />
      </Col>
    </Row>
  </div>
  )
}

