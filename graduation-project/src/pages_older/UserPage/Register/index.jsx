import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Col, Row, Layout, Image, Breadcrumb } from "antd"
import "./index.css"
import RegisterCard from '../../../compoents/userCompoents/RegisterCard';
const { Header, Content } = Layout;

export class Register extends Component {
    state = this.props.location.state || { falg: "login" }//如果前者有值就用前者，如果是前者undefind就用后面的值
    onFinish = () => { }
    onFinishFailed = () => { }
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
                                            <Link to="/userhome" ><span className='goBackHomeInRegister'>返回首页</span></Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item >
                                            <Link to={{ pathname: "/userlogin", state: { falg: "login" } }} ><span className='userRegisterSpan'>登录</span></Link>
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
                                <RegisterCard />
                            </Col>
                            <Col span={3}></Col>
                        </Row>
                    </div>
                </Content>
            </Layout >
        )
    }
}

export default Register
