import React, { Component } from 'react'
import { Layout, Space, Table, Image, message, Button, Modal, Input } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import cookies from "js-cookie"
import axios from "axios";
const { Header, Content } = Layout;
const { confirm } = Modal;
const { TextArea } = Input;
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
export class CommodityManage extends Component {
  state = {
    data: [],
    failbecause: "无",
  }
  //获得商品数据
  listCommodities = () => {
    try {
      axios.get(`/api/manage/listcommodities`, { headers: { token: cookies.get("tokenmanage") } }).then(
        response => {
          const { success, msg, resultData } = response.data
          if (success) {
            let data = resultData.commodities
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
    } catch {
      console.log("提交数据失败，未获得后端返回的数据");
    }
  }

  //审核动作
  // this.audit(record, "fail") 
  audit = (record, flag, failbecause) => {
    let commodityid = record.commodityid;
    try {
      axios.post(`/api/manage/audit/${commodityid}/${flag}/${failbecause}`, {}, { headers: { token: cookies.get("tokenmanage") } }).then(
        response => {
          const { success, msg } = response.data
          if (success) {
            this.listCommodities()
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
    } catch {
      console.log("提交数据失败，未获得后端返回的数据");
    }
  }
  failAudit = (record, flag) => {
    confirm({
      title: '请输入商品审核失败的原因',
      icon: <ExclamationCircleFilled />,
      content: <TextArea ref={(e) => this.textAreaFail = e} rows={4} placeholder="最大字数限制为70" maxLength={70} />,
      onOk: () => {
        let failbecause = this.textAreaFail.resizableTextArea.textArea.value.trim() || "无";
        debugger
        if (failbecause === "" || failbecause === "无") {
          message.error({
            content: "请输入审核原因",
            className: 'custom-class', style: {
              marginTop: '20vh',
              fontSize: "110%",
              color: "red"
            },
          })
          return
        }
        this.audit(record, flag, failbecause)
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  }

  //删除商品动作
  deleteCommodity = (record, flag) => {
    let commodityid = record.commodityid;
    confirm({
      title: '警告',
      icon: <ExclamationCircleFilled />,
      content: "是否删除该商品",
      onOk: () => {
        axios.post(`/api/manage/delete/${commodityid}/${flag}`, {}, { headers: { token: cookies.get("tokenmanage") } }).then(
          response => {
            const { success, msg } = response.data
            if (success) {
              this.listCommodities()
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
      onCancel: () => {
        console.log('Cancel');
      },
    });
  }

  /**
   * 钩子函数
   */
  componentDidMount() {
    this.listCommodities();//加载商品内容
  }
  render() {
    const { data } = this.state
    let columns = [
      { title: '持有者账户', dataIndex: 'username', key: 'username', align: 'center' },
      { title: '持有者昵称', dataIndex: 'nickname', key: 'nickname', align: 'center' },
      { title: '电话', dataIndex: 'photo', key: 'photo', align: 'center' },
      { title: '邮箱', dataIndex: 'email', key: 'email', align: 'center' },
      { title: '地址', dataIndex: 'address', key: 'address', align: 'center' },
      { title: '商品名', dataIndex: 'commodityname', key: 'commodityname', align: 'center' },
      { title: '类别', dataIndex: 'classname', key: 'classname', align: 'center' },
      {
        title: '图片', dataIndex: 'imagePath', key: 'imagePath', width: "260px",
        render: (text) => <Space>
          {
            text.map((e, indexOf) => {
              return <Image
                key={indexOf}
                width={50}
                src={e}
              />
            })
          }
        </Space>
      },
      { title: '价格', dataIndex: 'price', key: 'price', align: 'center', render: (text) => <span style={{ color: "red" }}>{text}</span> },
      { title: '商品描述', dataIndex: 'detail', key: 'detail', align: 'center', },
      {
        title: '状态', dataIndex: 'stateMsg', key: 'stateMsg', align: 'center',
        render: (text, record) =>
          <div>
            {record.state === 2 ?
              <span style={{ color: "red" }}>{text}</span>
              :
              record.state === 0 ? <span style={{ color: "rgb(234 222 74)" }}>{text}</span> : <span >{text}</span>}
          </div>
      },
      {
        title: '审核失败原因', dataIndex: 'failbecause', key: 'failbecause', align: 'center',
        render: (text, record) => <div>{record.state === 2 ? <span style={{ color: "red" }}>{text}</span> : <span>{text}</span>}</div>
      },
      {
        title: '操作', dataIndex: 'commodityButton', key: 'commodityButton', align: 'center', fixed: 'right', width: '220px',
        render: (text, record) =>
          <Space>
            {record.state === 0 ?//是否审核中
              <Space>
                <Button style={{ backgroundColor: "#002EA6" }} onClick={() => { this.audit(record, "success") }} type="primary">
                  审核通过
                </Button>
                <Button onClick={() => { this.failAudit(record, "fail") }} type="primary" danger>
                  审核失败
                </Button>
              </Space> :
              record.state === 1 || record.state === 2 ? <Space>
                <Button onClick={() => { this.audit(record, "cancel") }} type="primary" style={{ backgroundColor: "#FFE78F" }}>
                  <span style={{ color: "#002EA6" }}>取消审核</span></Button>
                <Button onClick={() => { this.deleteCommodity(record, "not") }} danger>删除商品</Button></Space> :
                record.state === 3 ?
                  <Space><Button disabled danger>删除商品</Button></Space> :
                  record.state === 4 ?
                    <Space><Button onClick={() => { this.deleteCommodity(record, "sold") }} danger>删除商品</Button></Space> : null

            }

          </Space>
      }
    ]
    return (
      <Layout>
        <Header style={headerStyle}>
        </Header>
        <Content style={contentStyle}>
          <Table columns={columns} dataSource={data} scroll={{
            y: 600, x: 2300,
          }}
            pagination={false} />
        </Content>
      </Layout>
    )
  }
}

export default CommodityManage
