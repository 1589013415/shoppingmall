import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Breadcrumb, Row, Col, Card, Table, Tabs, Button, Space, Empty, Pagination, Modal, Drawer } from 'antd';
import { BankTwoTone, ShopTwoTone, ContainerTwoTone } from '@ant-design/icons';
import axios from 'axios';
import cookie from 'js-cookie';
import "./index.css"
const { TabPane } = Tabs;
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
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
    getUserOrder = () => {

    }
    componentDidMount() {
        this.getUserOrder();
    }
    render() {
        const { pageNumSell, pageSizeSell, orderTotalSell, pageNumBuy, pageSizeBuy, orderTotalBuy, buyOrderDate, sellOrderDate } = this.state
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
                dataIndex: 'orderstate',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space>
                        <Button style={{ background: "#FFE78F" }}>确认收货</Button>
                        <Button style={{ background: "#ff02005c" }}>删除订单</Button>
                    </Space>
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
                dataIndex: 'orderstate',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space>
                        <Button style={{ background: "#FFE78F" }}>已送出</Button>
                        <Button style={{ background: "#ff02005c" }}>删除订单</Button>
                    </Space>
                ),
            },
        ];
        return (
            <div className='div' style={{ height: "600px" }}>
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
                        <Card style={{ background: "#FFE78F" }}>
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
