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

export class UserManage extends Component {
    render() {
        return (
            <Layout>
                <Header style={headerStyle}>

                </Header>
                <Content style={contentStyle}>

                </Content>
            </Layout>
        )
    }
}

export default UserManage
