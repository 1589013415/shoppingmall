import React from 'react'
import { Image, Col, Row, Breadcrumb} from 'antd';

import "./index.css"
import { Utils } from "./Utils"

export default function UserHeader() {
    const [isLogin, setIsLogin] = React.useState(false)
    const [pageState,setPageState]=React.useState("userhome")
    let stateMethods={isLogin,setIsLogin,pageState,setPageState}
    return (
        <div className='userHeaderDiv'>
            <Row >
                <Col span={16}>
                    <div>
                        <Image preview={false} width={50} src="\images\ReactShopLogo.png" />
                        <span className='logSpan'>React二手商城</span>
                    </div>
                </Col>
                {isLogin ?
                    <Col span={3} offset={5}>
                        <div className='headerNavDiv'>
                            <Breadcrumb items={Utils.LoginItems(stateMethods)} />
                        </div>
                    </Col>
                    : <Col span={4} offset={4}>
                        <div className='headerNavDiv'>
                            <Breadcrumb items={Utils.LoginItems(stateMethods)} />
                        </div>
                    </Col>
                }
            </Row>
        </div >
    )
}
