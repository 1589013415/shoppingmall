import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Breadcrumb, Row, Col, Card, Table, Tabs, Button, Space, message, Modal } from 'antd';
import { BankTwoTone, ShopTwoTone, ContainerTwoTone, ExclamationCircleFilled, ReloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import cookie from 'js-cookie';
import "./index.css"
const { TabPane } = Tabs;
const { confirm } = Modal;
const routes = [
    {
        path: '/userhome/usercontent',
        breadcrumbName: <span style={{ color: '#002EA6', fontSize: "120%" }} ><BankTwoTone />首页</span>,
    },
    {
        path: '/userhome/usercommodity',
        breadcrumbName: <span style={{ color: '#002EA6', fontSize: "120%" }}><ShopTwoTone />我的商品</span>,
    },
    {
        path: '/userhome/usermyorder',
        breadcrumbName: <span style={{ color: "rgb(105 101 101)", fontSize: "120%" }} ><ContainerTwoTone />我的订单</span>,
    },
]
export class MyOreder extends Component {
    state = {
        pageNumBuy: 1,
        pageSizeBuy: 2,
        orderTotalBuy: 0,
        pageNumSell: 1,
        pageSizeSell: 2,
        orderTotalSell: 0,
        buyOrderDate: [],
        sellOrderDate: [],
    }
    //Breadcrumb函数
    itemRender = (route, params, routes, paths) => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
            <span>{route.breadcrumbName}</span>
        ) : (
            <Link to={route.path}>{route.breadcrumbName}</Link>
        );
    }
    //分页函数
    onShowSizeChangeBuy = async (pageNum, pageSize) => {
        this.setState({ pageSize })
        let token = cookie.get("token")
        await axios.get(`/api/commodity/getCommoditysByUserid/${pageNum}/${pageSize}`, { headers: { token } }).then(
            respones => {
                this.setState({ userCommodityData: respones.data.resultData.userCommodity });
            }
        )
    }
    pageNumChangeBuy = async (pageNum, pageSize) => {
        this.setState({ pageNum })
        let token = cookie.get("token")
        await axios.get(`/api/commodity/getCommoditysByUserid/${pageNum}/${pageSize}`, { headers: { token } }).then(
            respones => {
                this.setState({ userCommodityData: respones.data.resultData.userCommodity });
            }
        )
    }
    onShowSizeChangeOrder = async (pageNum, pageSize) => {
        this.setState({ pageSize })
        let token = cookie.get("token")
        await axios.get(`/api/commodity/getCommoditysByUserid/${pageNum}/${pageSize}`, { headers: { token } }).then(
            respones => {
                this.setState({ userCommodityData: respones.data.resultData.userCommodity });
            }
        )
    }
    pageNumChangeOrder = async (pageNum, pageSize) => {
        this.setState({ pageNum })
        let token = cookie.get("token")
        await axios.get(`/api/commodity/getCommoditysByUserid/${pageNum}/${pageSize}`, { headers: { token } }).then(
            respones => {
                this.setState({ userCommodityData: respones.data.resultData.userCommodity });
            }
        )
    }
    //tabs函数
    callback = (key) => {
        console.log(key);
    }
    //获得订单数据
    getUserOrder = async () => {
        let token = cookie.get("token")
        await axios.get(`/api/order/getOrderData`, { headers: { token } }).then(
            respones => {
                const { success, msg, resultData } = respones.data
                const { orderListBuyer, orderListSeller } = resultData
                if (success) {
                    this.setState({ buyOrderDate: orderListBuyer, sellOrderDate: orderListSeller })
                } else {
                    message.error({
                        content: msg,
                        className: 'custom-class', style: {
                            marginTop: '20vh',
                            fontSize: "110%",
                            color: "red"
                        },
                    }, 0.8)
                }
            }
        )
    }
    //确认收货||已发货
    receipt = async (record, type) => {
        let token = cookie.get("token")
        await axios.post(`/api/order/receipt`, { ...record, type }, { headers: { "Content-Type": "multipart/form-data", "token": token } }).then(
            respones => {
                const { success, msg } = respones.data
                if (success) {
                    this.getUserOrder();
                } else {
                    message.error({
                        content: msg,
                        className: 'custom-class', style: {
                            marginTop: '20vh',
                            fontSize: "110%",
                            color: "red"
                        },
                    }, 0.8)
                }
            }
        )
    }
    //退款
    refund = async (record, type) => {
        let token = cookie.get("token")
        await axios.post(`/api/order/refund`, { ...record, type }, { headers: { "Content-Type": "multipart/form-data", "token": token } }).then(
            respones => {
                const { success, msg } = respones.data
                if (success) {
                    this.getUserOrder();
                } else {
                    message.error({
                        content: msg,
                        className: 'custom-class', style: {
                            marginTop: '20vh',
                            fontSize: "110%",
                            color: "red"
                        },
                    }, 0.8)
                }
            }
        )
    }
    //删除订单
    deleteOrder = async (record, flag) => {
        confirm({
            title: '删除',
            icon: <ExclamationCircleFilled />,
            content: "是否删除订单",
            okText: '确认删除',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                let recordAddFlag = { ...record, flag }
                let token = cookie.get("token")
                await axios.post(`/api/order/delete`, recordAddFlag, { headers: { "Content-Type": "multipart/form-data", "token": token } }).then(
                    respones => {
                        const { success, msg } = respones.data
                        if (success) {
                            message.success("删除成功")
                            this.getUserOrder();
                        } else {
                            message.error({
                                content: msg,
                                className: 'custom-class', style: {
                                    marginTop: '20vh',
                                    fontSize: "110%",
                                    color: "red"
                                },
                            }, 0.8)
                        }
                    }
                )
            },
            onCancel() {
            },
        });

    }
    componentDidMount() {
        this.getUserOrder();
    }
    render() {
        const { buyOrderDate, sellOrderDate } = this.state
        let columnsbuy = [
            {
                title: '订单号',
                dataIndex: 'orderid',
            },
            {
                title: '交易时间',
                dataIndex: 'createtime',
            },
            {
                title: '卖家名',
                dataIndex: 'sellername',
            },
            {
                title: '商品名',
                dataIndex: 'commodityname',
            },
            {
                title: '价格',
                dataIndex: 'price',
            },
            {
                title: '订单状态',
                dataIndex: 'stateMsg',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <div>
                        {
                            record.paystate === 0 ?//送货中
                                record.buyerok ?//用户是否点过确认收货
                                    <div>
                                        {record.canReturn ?
                                            <Space><Button onClick={() => { this.refund(record, "buyer") }} style={{ background: "#FFE78F" }}>退款</Button>
                                                <Button onClick={() => { this.deleteOrder(record, "buyer") }} style={{ background: "#ff02005c" }}>删除订单</Button></Space>
                                            : <Button onClick={() => { this.deleteOrder(record, "buyer") }} style={{ background: "#ff02005c" }}>删除订单</Button>}
                                    </div>
                                    :
                                    <Space>
                                        <Button onClick={() => { this.receipt(record, "buyer") }} style={{ background: "#FFE78F" }}>确认收货</Button>
                                        <Button onClick={() => { this.refund(record, "buyer") }} style={{ background: "#ff02005c" }}>退款</Button>
                                    </Space>
                                :
                                record.paystate === 1 ?//已完成
                                    <div>
                                        {record.canReturn ?
                                            <Space><Button onClick={() => { this.refund(record, "buyer") }} style={{ background: "#FFE78F" }}>退款</Button>
                                                <Button onClick={() => { this.deleteOrder(record, "buyer") }} style={{ background: "#ff02005c" }}>删除订单</Button></Space>
                                            : <Button onClick={() => { this.deleteOrder(record, "buyer") }} style={{ background: "#ff02005c" }}>删除订单</Button>}
                                    </div>
                                    :
                                    record.paystate === 2 ?//退款中
                                        <span>退款中</span>
                                        :
                                        record.paystate === 3 ?//退款已完成
                                            <Space><Button onClick={() => { this.deleteOrder(record, "buyer") }} style={{ background: "#ff02005c" }}>删除订单</Button></Space> : null
                        }
                    </div>
                ),
            },
        ];
        let columnssell = [
            {
                title: '订单号',
                dataIndex: 'orderid',
            },
            {
                title: '交易时间',
                dataIndex: 'createtime',
            },
            {
                title: '买家名',
                dataIndex: 'buyername',
            },
            {
                title: '商品名',
                dataIndex: 'commodityname',
            },
            {
                title: '价格',
                dataIndex: 'price',
            },
            {
                title: '订单状态',
                dataIndex: 'stateMsg',
            },
            {
                title: '完成时间',
                dataIndex: 'finishtime',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <div>
                        {
                            record.paystate === 0 ?//送货中
                                <Space>
                                    {
                                        record.sellerok && !record.buyerok ? <span>等待买家确认收货</span> :
                                            <Button onClick={() => { this.receipt(record, "seller") }} style={{ background: "#FFE78F" }}>已送货</Button>
                                    }
                                </Space>
                                :
                                record.paystate === 1 ?//已完成
                                    <div>
                                        {record.canReturn ?
                                            <Space><span>商品包退中无法删除订单</span><Button disabled style={{ background: "#ff02005c" }}>删除订单</Button></Space>
                                            : <Button onClick={() => { this.deleteOrder(record, "seller") }} style={{ background: "#ff02005c" }}>删除订单</Button>}
                                    </div>
                                    :
                                    record.paystate === 2 ?//退款中
                                        <Button onClick={() => { this.refund(record, "seller") }} style={{ background: "#FFE78F" }} >确认退款</Button>
                                        :
                                        record.paystate === 3 ?//退款已完成
                                            <Space><Button onClick={() => { this.deleteOrder(record, "seller") }} style={{ background: "#ff02005c" }}>删除订单</Button></Space> : null


                        }
                    </div>

                ),
            },
        ];
        return (
            <div className='div'>
                <div style={{ height: "5px" }} />
                <Row>
                    <Col span={6} offset={1}>
                        <Breadcrumb itemRender={this.itemRender} routes={routes} />
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>
                    </Col>
                    <Col span={20}>
                        <div style={{ height: "30px" }}></div>
                        <Card style={{ background: "#FFE78F" }}
                        >
                            <Button style={{ color: "blue" }} onClick={() => { this.getUserOrder() }}><ReloadOutlined /></Button>
                            <Tabs defaultActiveKey="1" onChange={this.callback}>
                                <TabPane tab="购买订单" key="1">
                                    <Table columns={columnsbuy} dataSource={buyOrderDate} />
                                </TabPane>
                                <TabPane tab="卖出订单" key="2">
                                    <Table columns={columnssell} dataSource={sellOrderDate} />
                                </TabPane>
                            </Tabs>
                        </Card>
                    </Col>
                    <Col span={2}>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default MyOreder
