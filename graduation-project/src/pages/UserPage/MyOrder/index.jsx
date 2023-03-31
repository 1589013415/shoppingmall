import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Breadcrumb, Row, Col } from 'antd';
import { BankTwoTone, ShopTwoTone, ContainerTwoTone } from '@ant-design/icons';
import "./index.css"
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
    //Breadcrumb函数
    itemRender = (route, params, routes, paths) => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
            <span>{route.breadcrumbName}</span>
        ) : (
            <Link to={route.path}>{route.breadcrumbName}</Link>
        );
    }
    render() {
        return (
            <div className='div' style={{ height: "600px" }}>
                <div style={{ height: "5px" }} />
                <Row>
                    <Col span={6} offset={1}>
                        <Breadcrumb itemRender={this.itemRender} routes={routes} />
                    </Col>
                </Row>
                我的订单界面
            </div>
        )
    }
}

export default MyOreder
