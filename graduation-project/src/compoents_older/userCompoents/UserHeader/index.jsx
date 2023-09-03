import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import cookies from 'js-cookie';
import { UserOutlined, ShopTwoTone, ContainerTwoTone } from '@ant-design/icons';
import { Image, Col, Row, Breadcrumb, Button, message, Drawer, Avatar } from 'antd';
import "./index.css"
import MyLinkOrder from '../MyLinkUserHeaderMall';
import MyLink1 from '../MyLink1';
import MyLink2 from '../MyLink2';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserMsgDrawer from './UserMsgDrawer/idnex';

/**
 * antd compoents
 */
const items = [
    { label: (<MyLinkOrder name={"我的订单"} path={"/userhome/usermyorder"}>我的订单</MyLinkOrder>), key: 'item-1', icon: <ContainerTwoTone /> },
    { label: (<MyLinkOrder name={"我的商品"} path={"/userhome/usercommodity"}>我的商品</MyLinkOrder>), key: 'item-2', icon: <ShopTwoTone /> }
];
class UserHeader extends Component {
    /**
     * my method
     * @returns 
     */
    state = {
        isLogin: cookies.get("token") === undefined ? false : true,
        userMsgDrawerFalg: false
    }
    exit = async () => {
        await axios.get("/user/exit", { headers: { token: cookies.get("token") } }).then(
            response => {
                message.success({
                    content: response.data.msg,
                    className: 'custom-class', style: {
                        marginTop: '20vh',
                        fontSize: "110%",
                    },
                }, 0.8)
            }
        )
        this.props.history.push("/userhome")
        cookies.remove("token")
        this.setState({ isLogin: false })
    }
    personalCenter = () => {
        this.setState({ userMsgDrawerFalg: true })
    }
    onCloseUserMsgDrawer = () => {
        this.setState({ userMsgDrawerFalg: false })
    }
    render() {
        const { isLogin, userMsgDrawerFalg } = this.state;
        let currentPath = this.props.location.pathname;
        return (
            <div className='headerDiv'>
                <Row >
                    <Col span={6}>
                        <div>
                            <Image preview={false} width={50} src="\images\gultShopLogo.png" />
                            <span className='logSpan'>桂工二手商城</span>
                        </div>
                    </Col>
                    {isLogin ?
                        <div>
                            <Breadcrumb style={{ position: "absolute", top: "35px", right: "200px" }} >
                                <Breadcrumb.Item menu={{ items }}>
                                    <Link to={currentPath} ><span style={{ color: 'aliceblue' }}><UserOutlined />我的商城</span></Link>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <Breadcrumb style={{ position: "absolute", top: "23px", right: "200px" }} >
                                <Breadcrumb.Item >
                                    <Button type='text' size='small' onClick={this.personalCenter}
                                        style={{ color: "aliceblue", position: "absolute", top: "10px" }}
                                    >
                                        <Avatar
                                            icon={<UserOutlined />}
                                        // src={
                                        //     <Image
                                        //         src="https://joeschmoe.io/api/v1/random"
                                        //         style={{
                                        //             width: 32,
                                        //         }}
                                        //     />
                                        // }
                                        />
                                        <span style={{ paddingLeft: "5px" }}>
                                            个人中心
                                        </span>
                                    </Button>
                                    <Button onClick={this.exit} type='text' size='small' style={{ color: "#FFE78F", position: "absolute", top: "13px", left: "100px" }}><span>退出</span></Button>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        : <Col span={4} offset={14}>
                            <div className='headerNavDiv'>
                                <Breadcrumb  >
                                    <Breadcrumb.Item menu={{ items }}>
                                        <Link to="/userhome/usercomtent" ><span style={{ color: 'aliceblue' }}><UserOutlined />我的商城</span></Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item >
                                        <MyLink1 />
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item >
                                        <MyLink2 />
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </Col>
                    }
                </Row>
                <Drawer
                    title={<span style={{ color: "#FFE78F" }}>个人中心</span>}
                    width={720}
                    onClose={this.onCloseUserMsgDrawer}
                    open={userMsgDrawerFalg}
                    headerStyle={{ background: "rgb(10, 63, 137)" }}
                    bodyStyle={{
                        background: "aliceblue",
                        paddingBottom: 80,
                    }}
                    extra={
                        <Button onClick={this.onCloseUserMsgDrawer}>返回</Button>
                    }
                    destroyOnClose
                >
                    <div style={{ height: "50px" }} />
                    <UserMsgDrawer />
                </Drawer>
            </div >

        )
    }
}

export default withRouter(UserHeader)
