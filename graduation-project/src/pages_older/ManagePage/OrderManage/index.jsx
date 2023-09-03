import React, { Component } from 'react'
import { Layout, message, Button, Modal, Input, Form, Col, Row, Select, Table } from 'antd';
import { SearchOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import cookies from "js-cookie"
import axios from "axios";
const { Header, Content } = Layout;
const { confirm } = Modal;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
};
export class OrderManage extends Component {
  searchform = React.createRef();
  onFinish = (event) => {
    this.listOrder(event)
  }
  state = {
    data: []
  }
  listOrder = (evnet) => {
    try {
      axios.post(`/api/manage/order/search`, evnet, { headers: { token: cookies.get("tokenmanage") } }).then(
        response => {
          const { success, msg, resultData } = response.data
          if (success) {
            debugger
            let data = resultData.orderMangeData
            this.setState({ data })
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
    } catch (error) {
      console.log("提交数据失败：OrderManage/index.jsx:", error);
    }
  }
  deleteOrder = (record) => {
    confirm({
      title: '是否要删除订单？',
      icon: <ExclamationCircleFilled />,
      content: "删除订单,订单会彻底删除,并且如果订单是已完成状态会删除用户的商品,请慎重选择",
      onOk: () => {
        try {
          axios.post(`/api/manage/order/delete`, record, { headers: { token: cookies.get("tokenmanage") } }).then(
            response => {
              const { success, msg } = response.data
              if (success) {
                message.success(msg)
                this.listOrder(this.searchform)
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
        } catch (error) {
          console.log("提交数据失败：OrderManage/index.jsx:", error);
        }
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  }
  componentDidMount() {
    this.listOrder({ stateMsg: "初始化" });
  }
  render() {
    let columns = [
      { title: '状态', dataIndex: 'orderstate', key: 'orderstate', align: 'center' },
      { title: '创建时间', dataIndex: 'createtime', key: 'createtime', align: 'center' },
      { title: '完成时间', dataIndex: 'finishtime', key: 'finishtime', align: 'center' },
      { title: '买家账号', dataIndex: 'username', key: 'username', align: 'center' },
      { title: '卖家账户', dataIndex: 'sellerUsername', key: 'sellerUsername', align: 'center' },
      { title: '价格', dataIndex: 'price', key: 'price', align: 'center' },
      {
        title: '操作', dataIndex: 'button', key: 'button', align: 'center',
        render: (text, record) => <Button danger onClick={() => { this.deleteOrder(record) }} size='small' type="primary">删除</Button>
      },
    ]
    const { data } = this.state
    return (
      <Layout>
        <Header style={headerStyle}>
          <Row>
            <Col span={2} style={{ color: "black", fontSize: "120%" }}>筛选：</Col>
            <Col span={22} >
              <div style={{ height: "22px" }} />
              <Form
                ref={this.searchform}
                name="searchForm"
                onFinish={this.onFinish}
                layout='inline'
                size="small"
              >
                <Form.Item
                  label="订单状态"
                  name="orderstate"
                >
                  <Select
                    style={{ width: "100px" }}
                    defaultValue="all"
                    options={[
                      {
                        value: 'all',
                        label: '全部',
                      },
                      {
                        value: '0',
                        label: '送货中',
                      },
                      {
                        value: '1',
                        label: '已完成',
                      },
                      {
                        value: '2',
                        label: '退款中',
                      },
                      {
                        value: '3',
                        label: '退款完成',
                      },
                    ]}
                  ></Select>
                </Form.Item>
                <Form.Item
                  label="订单号"
                  name="orderid"
                >
                  <Input style={{ width: "200px" }} placeholder='请输入订单号' />
                </Form.Item>
                <Form.Item
                  label="买家账户"
                  name="username"
                >
                  <Input style={{ width: "140px" }} placeholder='请输入买家账户' />
                </Form.Item>
                <Form.Item
                  label="卖家账户"
                  name="sellerUsername"
                >
                  <Input style={{ width: "140px" }} placeholder='请输入卖家账户' />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" icon={<SearchOutlined />} />
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row>

          </Row>
        </Header>
        <Content style={contentStyle}>
          <Table columns={columns} dataSource={data} />
        </Content>
      </Layout>
    )
  }
}

export default OrderManage
