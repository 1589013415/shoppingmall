import React, { Component } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Upload, message, Select, InputNumber, Alert } from 'antd';
import axios from 'axios';
import cookie from "js-cookie";
var images = null;

export class AddCommodity extends Component {
    state = {
        imageUrl: "",
        imagesListLength: "0",
        selectOptions: []
    }
    formRef = React.createRef()
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    handleChange = (info) => {
        this.getBase64(info.file.originFileObj);
    };

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
    getSelectOpotins = async () => {
        try {
            await axios.get("/api/commodity/getcommodityclassify", { headers: { "token": cookie.get("token") } }).then(
                response => {
                    let selectOptions = response.data.resultData.commdoityClassify.map(e => {
                        return { "value": e.key, "label": e.classname }
                    });
                    this.setState({ selectOptions })
                }
            )
        } catch (error) {
            console.log(error);
        }
    }
    onNumberChange = (e) => {
        this.formRef.current.setFieldValue("price", e);
    }
    onFinish = (event) => {
        let formData = new FormData();
        images.forEach(e => {
            formData.append("images", e.originFileObj)
        });
        formData.append("key", event.key);
        formData.append("description", event.description);
        formData.append("name", event.name);
        formData.append("price", event.price);
        let token = cookie.get("token")
        axios.post("/api/commodity/addcommodity", formData, { headers: { "Content-Type": "multipart/form-data", "token": token } }).then(
            response => {
                if (response.data.success) {
                    message.success(response.data.msg)
                    this.setState({
                        imageUrl: "",
                        imagesListLength: "0"
                    })
                    this.formRef.current.resetFields();
                    this.onClose();
                } else {
                    message.warning(response.data.msg)
                }
            }
        )
    }
    onFinishFailed = (event) => {
        console.log("提交失败");

    }
    onClose = () => {
        this.props.isOpenAddDrawer()
    }
    //初始化数据
    componentDidMount() {
        this.getSelectOpotins();
    }

    render() {
        const { isOpenAddDrawerFalg } = this.props
        const { imageUrl, imagesListLength, selectOptions } = this.state
        return (
            <Drawer
                title={<span style={{ color: "#FFE78F" }}>请填写要挂售商品的信息</span>}
                width={720}
                onClose={this.onClose}
                open={isOpenAddDrawerFalg}
                headerStyle={{ background: "rgb(10, 63, 137)" }}
                bodyStyle={{
                    background: "aliceblue",
                    paddingBottom: 80,
                }}
                extra={
                    <Button onClick={this.onClose}>返回</Button>
                }
            >
                <div style={{ height: "50px" }} />
                <Form ref={this.formRef} encType="multipart/form-data" layout="vertical" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="商品名："
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入商品名',
                                    },
                                ]}
                            >
                                <Input placeholder="请输入你的商品名" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
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
                                <Form.Item>
                                    <InputNumber
                                        defaultValue={0}
                                        onChange={this.onNumberChange}
                                        style={{
                                            width: 100,
                                        }}

                                    />
                                </Form.Item>

                            </Form.Item>
                        </Col>

                    </Row>
                    <Alert
                        message="上传的第一张图片为商品首页展示的图片"
                        type="warning"
                        closable
                    />
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
                                <Input.TextArea showCount rows={2} minLength={4} maxLength={32} placeholder="商品介绍" />
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
            </Drawer>
        )
    }
}

export default AddCommodity

