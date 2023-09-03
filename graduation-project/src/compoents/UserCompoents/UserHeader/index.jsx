import React from 'react'

import { Image, Col, Row, Breadcrumb, Button, Drawer, Avatar } from 'antd';

import "./index.css"
import {Utils} from "./Utils"

export default function UserHeader() {
    const [isLogin, setIsLogin] = React.useState(false)
    return (
        <div className='userHeaderDiv'>
            <Row >
                <Col span={6}>
                    <div>
                        <Image preview={false} width={50} src="\images\gultShopLogo.png" />
                        <span className='logSpan'>桂工二手商城</span>
                    </div>
                </Col>
                {isLogin ?
                    <div>
                    </div>
                    : <Col span={5} offset={13}>
                        <div className='headerNavDiv'>
                            <Breadcrumb items={Utils.notLoginItems()} />
                        </div>
                    </Col>
                }
            </Row>
            <Drawer
                title={<span style={{ color: "#FFE78F" }}>个人中心</span>}
                width={720}
                onClose={() => { }}
                open={false}
                headerStyle={{ background: "rgb(10, 63, 137)" }}
                bodyStyle={{
                    background: "aliceblue",
                    paddingBottom: 80,
                }}
                extra={
                    <Button onClick={() => { }}>返回</Button>
                }
                destroyOnClose
            >
                <div style={{ height: "50px" }} />
                {/* <UserMsgDrawer /> */}
            </Drawer>
        </div >
    )
}
