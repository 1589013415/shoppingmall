import React, { Component } from 'react'
import { Row, Col, Card, Button, Image, Space, Table, Modal, message } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios';
import cookie from "js-cookie";
const { confirm } = Modal;
const tableColumns = [
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        // align: "center"
    },
    {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
        align: "center"
    },
    {
        title: 'Button',
        dataIndex: 'button',
        key: 'button',
        align: "right"
    }
]
export class UserCommodityCard extends Component {
    updateCommodity = () => {
        this.props.updateCommodity(this.props.commodityid)

    }
    detete = (msg) => {
        confirm({
            title: '删除',
            icon: <ExclamationCircleFilled />,
            content: msg,
            okText: '确认删除',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                axios.delete(`/api/commodity/deletecommodity/${this.props.commodityid}`, { headers: { token: cookie.get("token") } }).then(
                    response => {
                        if (response.data.success) {
                            message.success(response.data.msg)
                            this.props.refreshData();
                        } else {
                            message.error(response.data.msg)
                        }
                    }
                )
            },
            onCancel() {
            },
        });
    }
    render() {
        const { commodityid, state, stateMsg, failbecause, price, imagePath, name, description, classifyName } = this.props;
        let commodityName = "商品名：" + name;
        let auditFailure = state === 2 ? false : true;
        const tableData = [{
            key: "1",
            price: <div>
                {
                    auditFailure ? <span>售价：{price}</span> : < span style={{ color: "red" }}> 审核失败</span >
                }
            </div>,
            state: <div>
                {
                    state === 3 ? <span style={{ color: "rgb(222 55 61)" }}>{stateMsg}</span> :
                        auditFailure ? <span style={state === 0 ? { color: "rgb(242 203 59)" } :
                            state === 1 ? { color: "#FFE78F" } : {}}>{stateMsg}</span> : < span style={{ color: "red" }}>{failbecause}</span >

                }
            </div>,
            button: <Space>
                {
                    state === 3 ? <Space /> :
                        state === 4 ? <Space>
                            <Button size='small' onClick={() => { this.detete("是否删除记录？") }} style={{ background: "#ff02005c" }} >删除记录</Button>
                        </Space> :
                            auditFailure ? <Space>
                                <Button onClick={this.updateCommodity} size='small' style={{ background: "#FFE78F" }} >修改</Button>
                                <Button size='small' onClick={() => { this.detete("是否删除商品？") }} style={{ background: "#ff02005c" }} >删除商品</Button>
                            </Space> :
                                <Space>
                                    <Button onClick={this.updateCommodity} size='small' style={{ background: "#FFE78F" }} >修改</Button>
                                    <Button size='small' onClick={() => { this.detete("是否删除记录？") }} style={{ background: "#ff02005c" }} >删除记录</Button>
                                </Space>
                }

            </Space>
        }]
        return (
            <Card
                id={commodityid}
                style={{
                    marginTop: 16,
                }}
                type="inner"
                title={commodityName}
            >
                <Row>
                    <Col span={18}><span>商品描述：{description}</span></Col>
                    <Col span={6}><span>类型：{classifyName}</span></Col>
                </Row>
                <div style={{ height: "10px" }} />
                <Row>

                    <Col span={11}>
                        商品图片：
                        <Space>
                            {
                                imagePath.map((e, indexOf) => {
                                    return <Image
                                        key={indexOf}
                                        width={100}
                                        src={e}
                                    />
                                })
                            }
                        </Space>
                    </Col>
                    <Col offset={1} span={12}>
                        <div style={{ marginTop: "50px" }}>
                            <Table
                                pagination={{
                                    position: [],
                                }}
                                showHeader={false}
                                columns={tableColumns}
                                dataSource={tableData}
                            />
                        </div>
                    </Col>
                </Row>

            </Card>
        )
    }
}

export default UserCommodityCard

