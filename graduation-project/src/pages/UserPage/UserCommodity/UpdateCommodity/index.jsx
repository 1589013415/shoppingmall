import React, { Component } from 'react'
import { Button, Col, Form, Input, Row, Upload, Select, InputNumber, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import cookie from "js-cookie";
var images = null;
export class UpdateCommodity extends Component {
  state = {
    imageUrl: "",
    imagesListLength: "0",
    selectOptions: [],
  }
  formRef = React.createRef()
  getInitData = async () => {
    try {
      await axios.get("/api/commodity/getcommodityclassify", { headers: { "token": cookie.get("token") } }).then(
        response => {
          let selectOptions = response.data.resultData.commdoityClassify.map(e => {
            return { "value": e.classname, "label": e.classname }
          });
          this.setState({ selectOptions })
        }
      )
    } catch (error) {
      console.log(error);
    }
    let commodityid = this.props.commodityid
    if (commodityid === 0) return;
    try {
      await axios.get(`/api/commodity/getCommoditysByCommodityid/${commodityid}`, { headers: { "token": cookie.get("token") } }).then(
        response => {
          let commodityMsg = response.data.resultData.userCommodity
          this.setState({ commodityMsg })
        }
      )
    } catch (error) {
      console.log(error);
    }
  }
  onNumberChange = (e) => {
    this.formRef.current.setFieldValue("price", e);
  }
  updataChange = ({ fileList: newFileList }) => {
    this.setState({ "imagesListLength": newFileList.length })
    if (newFileList.length === 4) {
      message.success("最大上传四个图片")
    }

  }
  beforeUpload = (file) => {
    const isJPG = file.type === "image/jpeg";
    const isPNG = file.type === "image/png";
    if (!isJPG && !isPNG) {
      message.error(`${file.name} 格式不是png或jpg(jpeg)格式`);
      return Upload.LIST_IGNORE;
    }
    return false;
  }
  normFile = (event) => {
    images = event.fileList;
    if (Array.isArray(event)) {
      return event
    }
    return event && event.filesList
  }

  onFinish = (event) => {
    let formData = new FormData();
    images.forEach(e => {
      formData.append("images", e.originFileObj)
    });
    formData.append("commodityid", this.props.commodityid)
    formData.append("classifyName", event.key);
    formData.append("description", event.description);
    formData.append("name", event.name);
    formData.append("price", event.price);
    let token = cookie.get("token")
    axios.post("/api/commodity/updatecommodity", formData, { headers: { "Content-Type": "multipart/form-data", "token": token } }).then(
      response => {
        if (response.data.success) {
          message.success(response.data.msg)
          this.setState({
            imageUrl: "",
            imagesListLength: "0"
          })
          this.formRef.current.resetFields();
          this.props.onCloseUpdateDraw();
        } else {
          message.warning(response.data.msg)
        }
      }
    )
  }
  onFinishFailed = (event) => {
    console.log(event);
  }

  componentDidMount() {
    this.getInitData();
  }
  render() {
    const { imageUrl, imagesListLength, selectOptions, commodityMsg } = this.state
    if (commodityMsg === undefined) {
      return
    }
    return (
      <Form
        ref={this.formRef}
        layout="vertical"
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              initialValue={commodityMsg.name}
              name="name"
              label="商品名："
              rules={[
                {
                  required: true,
                  message: '请输入商品名',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              initialValue={commodityMsg.classifyName}
              name="key"
              label="分类"
              rules={[
                {
                  required: true,
                  message: '请选择你的商品类型',
                },
              ]}
            >
              <Select
                style={{
                  width: 120,
                }}
                options={selectOptions}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              initialValue={commodityMsg.price}
              name="price"
              label="价格"
              rules={[
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (getFieldValue('price') >= 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject('请输入正确的价格!');
                  },
                })
              ]}

            >
              <Form.Item >
                <InputNumber
                  defaultValue={commodityMsg.price}
                  onChange={this.onNumberChange}
                  style={{
                    width: 100,
                  }}

                />
              </Form.Item>

            </Form.Item>
          </Col>

        </Row>
        <Row gutter={16}>
          <Form.Item
            name="image"
            label="商品图片:"
            valuePropName="fileList"
            // 获得当前表单事件（value）
            getValueFromEvent={this.normFile}
            rules={[
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (images === null || images.length === 0) {
                    return Promise.reject('请上传商品图片!');
                  }
                  return Promise.resolve();
                },
              })
            ]}
          >
            <Upload name="logo"
              fileList={this.imagesList}
              listType="picture-card"
              beforeUpload={this.beforeUpload}
              onChange={this.updataChange}
              maxCount="4"
            >{imageUrl === "" || imageUrl === undefined ?
              (
                imagesListLength === 4 ? null :
                  (<div ><PlusOutlined /><div style={{ marginTop: 8 }}>上传</div></div>)
              ) :
              (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: '100%',
                  }}
                />
              )}
            </Upload>
          </Form.Item>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              initialValue={commodityMsg.description}
              name="description"
              label="商品介绍"
              rules={[
                {
                  required: true,
                  message: '请输入你的商品介绍',
                },
                {
                  min: 4,
                  message: "商品介绍最少4个字符"
                }
              ]}
            >
              <Input.TextArea showCount rows={2} maxLength={32} placeholder="商品介绍" />
            </Form.Item>
          </Col>
        </Row>
        <div style={{ height: "20px" }} />
        <Form.Item>
          <Row gutter={16} >

            <Col span={3} offset={21}>
              <Button htmlType='submit'>
                确认添加
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    )
  }
}

export default UpdateCommodity
