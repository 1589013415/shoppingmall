import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Col, Row, Layout, Image, Breadcrumb } from "antd"
import "./index.css"
import UserLoginCard from '../../../compoents/userCompoents/UserLoginCard'
import UserResetCard from '../../../compoents/userCompoents/UserLoginCard/UserResetCard'
const { Header, Content } = Layout;

export class LoginPage extends Component {
    state = {
        isResetPassword: false
    }
    isResetPassword = (isResetPassword) => {
        this.setState({ isResetPassword })
    }
    render() {
        return (
            <Layout>
                <Header style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%', background: '#0a3f89',
                    height: "75px"
                }}>
                    <div style={{ marginTop: "5px" }}>
                        <Row >
                            <Col span={12}>
                                <div>
                                    <Image preview={false} width={50} src="images\gultShopLogo.png" />
                                    <span className='logSpan'>桂工二手商城</span>
                                </div>
                            </Col>
                            <Col span={2} offset={10}>
                                <div className='userLoginHeaderButton'>
                                    <Breadcrumb  >
                                        <Breadcrumb.Item >
                                            <Link to="/userhome/usercomtent" ><span className='goBackHomeInLogin'>返回首页</span></Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item >
                                            <Link to="/register"><span className='userLoginSpan'>注册</span></Link>
                                        </Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Header>
                <Content>
                    <div className='userLoginBackground'>
                        <Row>
                            <Col span={6}></Col>
                            <Col span={6}>
                                <div className='userLoginDiv2'>
                                    <div style={{ height: '25%' }}></div>
                                    <span className='userLoginSpanText'>桂工二手商城<br />玖成心,废变新</span>
                                </div>
                            </Col>
                            <Col span={6} offset={3}>
                                <div style={{ height: "18%" }}></div>
                                {this.state.isResetPassword ? <UserResetCard isResetPassword={this.isResetPassword} /> : <UserLoginCard isResetPassword={this.isResetPassword} />}
                            </Col>
                            <Col span={3}></Col>
                        </Row>
                    </div>
                </Content>
            </Layout >
        )
    }
}

export default LoginPage
