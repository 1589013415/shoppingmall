import React from 'react'
import { Image, Col, Row, Breadcrumb, Space } from 'antd';

import "./index.css"
import { Utils } from "./Utils"

function LeftHeader() {
    return (
        <Col span={16}>
            <div>
                <Image preview={false} width={50} src="\images\ReactShopLogo.png" />
                <span className='logSpan'>React二手商城</span>
            </div>
        </Col>
    )
}

function RightHeader() {
    return (
        <Col span={4} offset={4}>
            <Space><Breadcrumb items={Utils.LoginItems()} /></Space>
        </Col>
    )
}


export default function UserHeader() {


    return (
        <div className='userHeaderDiv'>
            <Row >
                {LeftHeader()}
                {RightHeader()}
            </Row>
        </div >
    )
}
