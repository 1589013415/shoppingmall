import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import PubSub from 'pubsub-js'
import { Row, Col, Card, Image, Descriptions, Button, Empty, message, Modal } from "antd"
import { ExclamationCircleFilled } from '@ant-design/icons';
import "./index.css"
import axios from 'axios';
import cookies from "js-cookie";
const { confirm } = Modal
class CommodityBugPage extends Component {
    state = {
        userMsg: {},
        commodityMsg: {},
        isBuyCommidiy: false,
        isLoading: false,
        loadingTop: "",
    }
    getCommodityMsg = () => {
        const { commodityid } = this.props.match.params;
        try {
            axios.get(`/api/commodity/getCommodityMsgAndUserMsg/${commodityid}`,
                { headers: { token: cookies.get("token") } }).then(
                    response => {
                        this.setState({
                            commodityMsg: response.data.resultData.commodityMsg,
                            userMsg: response.data.resultData.userMsg
                        })
                    }
                )
        } catch (error) {
            console.log("获得商品信息失败");
        }
    }
    buyCommodity = () => {
        this.setState({ isBuyCommidiy: true })

    }
    handleBuyOk = () => {//商品弹窗购买按钮
        const { commodityMsg, userMsg, isBuyCommidiy } = this.state;
        this.setState({ isBuyCommidiy: false })
        PubSub.publish("isloading", { isLoading: true, loadingTop: "12%" });
        axios.post(`/api/commodity/buyCommodity`, { commodityId: commodityMsg.commodityid, sellerId: userMsg.userid }, { headers: { token: cookies.get("token") } }).then(
            respoense => {
                const { success, msg } = respoense.data
                if (respoense.data.success) {
                    message.success(msg)
                } else {
                    message.warning(msg)
                }
                PubSub.publish("isloading", { isLoading: false, loadingTop: "" });
            }
        )
    }
    handleBuyCancel = () => {//商品取消按钮
        this.setState({ isBuyCommidiy: false })
    }
    componentDidMount() {
        this.getCommodityMsg();
    }
    render() {
        // const { commodityid } = this.props.match.params;
        const { commodityMsg, userMsg, isBuyCommidiy } = this.state;
        return (
            <div className='div' >
                <div style={{ height: "20px" }}></div>
                <Row justify="center" gutter={[16, 0]}>
                    {
                        commodityMsg.commodityid === undefined && userMsg.userid === undefined ? <Empty /> :
                            <Card
                                style={{
                                    width: "75%",
                                    background: "rgba(230, 237, 242, 0.5)"
                                }}
                            >
                                <div style={{ height: "20px" }}></div>
                                <Row>
                                    <Col span={9} offset={1}>
                                        {
                                            commodityMsg.imagePath.length === 2 ?
                                                <div style={{ height: "100px" }}></div> :
                                                null
                                        }
                                        <Image.PreviewGroup>
                                            {
                                                commodityMsg.imagePath.map((e, index) => {
                                                    if (commodityMsg.imagePath.length === 1) {
                                                        return (
                                                            <Image key={index}
                                                                width={400}
                                                                height={500}
                                                                src={e}
                                                            />
                                                        )
                                                    }
                                                    if (commodityMsg.imagePath.length === 2) {
                                                        return (
                                                            <Image key={index}
                                                                width={200}
                                                                height={300}
                                                                src={e}
                                                            />
                                                        )
                                                    }
                                                    return (
                                                        <Image key={index}
                                                            width={200}
                                                            src={e}
                                                        />
                                                    )
                                                })
                                            }
                                        </Image.PreviewGroup>
                                    </Col>
                                    <Col span={12} offset={2}>
                                        <div style={{ height: "30px" }}></div>
                                        <Row>
                                            <Descriptions
                                                title={<span style={{ fontSize: "30px" }}>商品信息介绍</span>}
                                                column={{
                                                    xxl: 3,
                                                    xl: 3,
                                                    lg: 3,
                                                    md: 3,
                                                    sm: 3,
                                                    xs: 3,
                                                }}>
                                                <Descriptions.Item
                                                    labelStyle={{
                                                        fontSize: "20px"
                                                    }}
                                                    contentStyle={{
                                                        fontSize: "20px"
                                                    }}
                                                    label="商品名"
                                                    span={3}
                                                >
                                                    {commodityMsg.name}
                                                </Descriptions.Item>
                                                <Descriptions.Item
                                                    labelStyle={{
                                                        fontSize: "20px"
                                                    }}
                                                    contentStyle={{
                                                        fontSize: "20px"
                                                    }}
                                                    label="商品描述"
                                                    span={3}
                                                >
                                                    {commodityMsg.description}
                                                </Descriptions.Item>
                                                <Descriptions.Item
                                                    labelStyle={{
                                                        fontSize: "30px",
                                                    }}
                                                    contentStyle={{
                                                        color: "red",
                                                        fontSize: "30px",
                                                        fontFamily: "幼体"
                                                    }}
                                                    label="价格"
                                                    span={3}
                                                >
                                                    {commodityMsg.price}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Row>
                                        <div style={{ height: "20px" }} />
                                        <Row>
                                            <Descriptions
                                                title={<span style={{ fontSize: "30px" }}>卖家信息</span>}
                                                column={{
                                                    xxl: 6,
                                                    xl: 6,
                                                    lg: 6,
                                                    md: 6,
                                                    sm: 6,
                                                    xs: 6,
                                                }}
                                            >
                                                <Descriptions.Item
                                                    labelStyle={{
                                                        fontSize: "20px"
                                                    }}
                                                    contentStyle={{
                                                        fontSize: "20px"
                                                    }}
                                                    label="卖家名"
                                                    span={6}
                                                >
                                                    {userMsg.nickname}
                                                </Descriptions.Item>
                                                <Descriptions.Item
                                                    labelStyle={{
                                                        fontSize: "20px"
                                                    }}
                                                    contentStyle={{
                                                        fontSize: "20px"
                                                    }}
                                                    label="电话"
                                                    span={3}
                                                >
                                                    {userMsg.photo}
                                                </Descriptions.Item>
                                                <Descriptions.Item
                                                    labelStyle={{
                                                        fontSize: "20px"
                                                    }}
                                                    contentStyle={{
                                                        fontSize: "20px"
                                                    }}
                                                    label="邮箱"
                                                    span={3}
                                                >
                                                    {userMsg.email}
                                                </Descriptions.Item>

                                            </Descriptions>
                                        </Row>
                                        <div style={{ height: "20px" }}></div>
                                        <Row justify="end">
                                            <Button onClick={this.buyCommodity} ghost style={{ fontSize: "30px", height: "70px" }} size='Large'>
                                                <span style={{ color: "red", fontFamily: "华文琥珀" }}>购买</span>
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                    }
                </Row >
                <div style={{ height: "20px" }}></div>
                <Modal title="购买商品信息" open={isBuyCommidiy} onOk={this.handleBuyOk} onCancel={this.handleBuyCancel}
                    footer={[
                        <Button key="back" onClick={this.handleBuyCancel}>
                            取消支付
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleBuyOk}>
                            确认支付
                        </Button>,
                    ]}>
                    <p><span style={{ fontSize: "20px" }}>商品名：{commodityMsg.name}</span></p>
                    <p><span style={{ fontSize: "20px", color: "red" }}>价格：{commodityMsg.price}</span></p>
                    <p><span style={{ fontSize: "20px" }}>卖家电话：{userMsg.photo}</span></p>
                </Modal>
            </div >
        )
    }
}

export default withRouter(CommodityBugPage)
