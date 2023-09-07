import React, { useContext } from 'react'
import { Image, Col, Row, Breadcrumb } from 'antd';

import { UserMyContext } from "../../MyContext/index"
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
    const { userState } = useContext(UserMyContext)
    let { isUserLogin } = userState
    if (isUserLogin) {
        return (
            <Col span={3} offset={5}>
                <div className='headerNavDiv'>
                    <Breadcrumb items={Utils.LoginItems()} />
                </div>
            </Col>
        )
    } else {
        return (
            <Col span={4} offset={4}>
                <div className='headerNavDiv'>
                    <Breadcrumb items={Utils.LoginItems()} />
                </div>
            </Col>
        )
    }
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
