import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Breadcrumb, Row, Col, Card, Button, Empty, Pagination, Modal, Drawer } from 'antd';
import { BankTwoTone, ShopTwoTone, ContainerTwoTone, PlusCircleTwoTone, ExclamationCircleFilled } from '@ant-design/icons';
import AddCommodity from './UseraddCommidity';
import UserCommodityCard from './UserCommodityCard';
import UpdateCommodity from "./UpdateCommodity"
import AddUserMsgCard from './AddUserMsgCard';
import axios from 'axios';
import cookie from 'js-cookie';
const { confirm } = Modal;
const routes = [
    {
        path: '/userhome/usercontent',
        breadcrumbName: <span style={{ color: '#002EA6', fontSize: "120%" }} ><BankTwoTone />首页</span>,
    },
    {
        path: '/userhome/usermyorder',
        breadcrumbName: <span style={{ color: '#002EA6', fontSize: "120%" }}><ContainerTwoTone />我的订单</span>,
    },
    {
        path: '/userhome/usercommodity',
        breadcrumbName: <span style={{ color: "rgb(105 101 101)", fontSize: "120%" }} ><ShopTwoTone />我的商品</span>,
    },
]

export class UserCommodity extends Component {
    state = {
        isOpenAddDrawerFalg: false,
        userCommodityData: [],
        userCommodityTotal: 0,
        pageNum: 1,
        pageSize: 2,
        isOk: true,
        updateCommodityFalg: false,
        updateCommodityid: 0,
        registerUserMsgModalFalg: false
    }
    //面包屑函数
    itemRender = (route, params, routes, paths) => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
            <span>{route.breadcrumbName}</span>
        ) : (
            <Link to={route.path}>{route.breadcrumbName}</Link>
        );
    }
    //UseraddCommodity调用的方法--start
    isOpenAddDrawer = () => {
        this.setState({ isOpenAddDrawerFalg: !this.state.isOpenAddDrawerFalg })
        this.getUserCommoditys();
        this.getUserCommodityTatol();
    }
    //获得用户个人物品数据的方法
    async getUserCommoditys() {
        const { pageNum, pageSize } = this.state
        let token = cookie.get("token")
        await axios.get(`/api/commodity/getCommoditysByUserid/${pageNum}/${pageSize}`, { headers: { token } }).then(
            respones => {
                const { userCommodity } = respones.data.resultData
                if (userCommodity.length === 0 || userCommodity === undefined) {
                    this.resetPageNum();
                } else {
                    this.setState({ userCommodityData: userCommodity });
                }
            }
        )
    }
    async getUserCommodityTatol() {
        let token = cookie.get("token")
        await axios.get(`/api/commodity/size`, { headers: { token } }).then(
            respones => {
                this.setState({ userCommodityTotal: respones.data.resultData.total });
            }
        )
    }
    //当删除的商品是当前界面最后一个商品，重置页数
    resetPageNum = () => {
        this.setState({ pageNum: 1 })
        this.getUserCommoditys();
    }
    onShowSizeChange = async (pageNum, pageSize) => {
        this.setState({ pageSize })
        let token = cookie.get("token")
        await axios.get(`/api/commodity/getCommoditysByUserid/${pageNum}/${pageSize}`, { headers: { token } }).then(
            respones => {
                this.setState({ userCommodityData: respones.data.resultData.userCommodity });
            }
        )
    }
    pageNumChange = async (pageNum, pageSize) => {
        this.setState({ pageNum })
        let token = cookie.get("token")
        await axios.get(`/api/commodity/getCommoditysByUserid/${pageNum}/${pageSize}`, { headers: { token } }).then(
            respones => {
                this.setState({ userCommodityData: respones.data.resultData.userCommodity });
            }
        )
    }
    updateCommodity = (commodityid) => {
        confirm({
            title: '修改商品信息',
            icon: <ExclamationCircleFilled />,
            content: '修改商品信息，要重新上传商品图片，并且商品需要重新进行审核',
            okText: '确认修改',
            cancelText: '取消',
            onOk: () => {
                this.setState({ updateCommodityFalg: true, updateCommodityid: commodityid })
                this.getUserCommoditys();
                this.getUserCommodityTatol();
            },
            onCancel() {
            },
        });
    }
    onCloseUpdateDraw = () => {
        this.setState({ updateCommodityFalg: false })
        this.getUserCommoditys();
    }
    onCloseResgiterUserMsgModal = () => {
        this.setState({ registerUserMsgModalFalg: false })
    }
    refreshData = () => {
        this.getUserCommoditys();
        this.getUserCommodityTatol();
    }
    componentDidMount() {
        this.getUserCommoditys();
        this.getUserCommodityTatol();
    }
    render() {
        const { isOpenAddDrawerFalg, userCommodityData, userCommodityTotal,
            pageNum, pageSize, updateCommodityFalg, updateCommodityid, registerUserMsgModalFalg } = this.state
        return (
            <div className='div'>
                <div style={{ height: "5px" }} />
                <Row>
                    <Col span={6} offset={1}>
                        <Breadcrumb itemRender={this.itemRender} routes={routes} />
                    </Col>
                </Row>
                <div style={{ height: "20px" }} />
                <Row>
                    <Col span={2}>
                    </Col>
                    <Col span={20}>
                        <Card
                            style={{ background: "rgb(10 63 137 / 83%)" }}
                            extra={<Button onClick={this.isOpenAddDrawer} type='text'><span style={{ color: "#FFE78F" }}><PlusCircleTwoTone />我要挂售</span></Button>}
                            title={<span style={{ color: "aliceblue" }}>我的商品</span>}
                        >
                            {
                                userCommodityData.length === 0 ? <Empty description={<span style={{ color: "aliceblue" }}>暂无商品</span>} /> :
                                    <div>
                                        {
                                            userCommodityData.map((e) => {
                                                return <UserCommodityCard {...e} key={e.commodityid} updateCommodity={this.updateCommodity} refreshData={this.refreshData} />
                                            })
                                        }
                                        <div style={{ height: "10px" }} />
                                        <Row justify="center" >
                                            <Col >
                                                <Pagination
                                                    onShowSizeChange={this.onShowSizeChange}
                                                    defaultCurrent={1}
                                                    current={pageNum}
                                                    showSizeChanger
                                                    defaultPageSize={pageSize}
                                                    total={userCommodityTotal}
                                                    pageSizeOptions={[2, 4, 6]}
                                                    onChange={this.pageNumChange}
                                                    showTotal={() => <span style={{ color: "white" }}>总计：{userCommodityTotal}件</span>}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                            }
                        </Card>
                    </Col>
                    <Col span={2}>
                    </Col>
                </Row>
                <AddCommodity isOpenAddDrawerFalg={isOpenAddDrawerFalg} isOpenAddDrawer={this.isOpenAddDrawer} />
                <Drawer
                    title={<span style={{ color: "#FFE78F" }}>修改商品信息</span>}
                    width={720}
                    onClose={this.onCloseUpdateDraw}
                    open={updateCommodityFalg}
                    headerStyle={{ background: "rgb(10, 63, 137)" }}
                    bodyStyle={{
                        background: "aliceblue",
                        paddingBottom: 80,
                    }}
                    extra={
                        <Button onClick={this.onCloseUpdateDraw}>返回</Button>
                    }>
                    {
                        updateCommodityFalg ? <UpdateCommodity onCloseUpdateDraw={this.onCloseUpdateDraw} commodityid={updateCommodityid} /> : null
                    }
                </Drawer>
                <Modal
                    title="添加用户信息"
                    open={registerUserMsgModalFalg}
                    footer={null}
                    destroyOnClose
                    onCancel={this.onCloseResgiterUserMsgModal}
                >
                    <AddUserMsgCard onCloseResgiterUserMsgModal={this.onCloseResgiterUserMsgModal} />
                </Modal>
            </div>
        )
    }
}

export default UserCommodity