import React, { Component } from 'react'
import { Descriptions, Button, Modal, Row, Col } from 'antd'
import axios from 'axios'
import cookie from "js-cookie"
import UserMsgForm from './UserMsgForm'
import UserUpdatePasswordForm from "./UserUpdatePasswordForm"
import OlderFormEmailForm from './OlderEmailForm'
import NewEmailForm from "./NewEmailForm"
export class UserMsgDrawer extends Component {
    state = {
        user: {},
        userMsg: {},
        editUserMsgFalg: false,
        updateUserPasswordFalg: false,
        updateEmailFalg1: false,
        updateEmailFalg2: false
    }
    editMsg = () => {
        this.setState({ editUserMsgFalg: true })
    }
    onCloseEditUserMsgModal = () => {
        this.setState({ editUserMsgFalg: false, updateUserPasswordFalg: false, updateEmailFalg1: false, updateEmailFalg2: false })
        this.getUserData();
    }
    getUserData = async () => {
        try {
            await axios.get("/api/usermsg/getusermsg", { headers: { token: cookie.get("token") } }).then(
                respones => {
                    if (respones.data.success) {

                        this.setState({ user: respones.data.resultData.user, userMsg: respones.data.resultData.userMsg, })
                    }
                }
            )
        } catch (error) {
            console.log("获得UserMsg失败", error);
        }
    }
    setStateOldEmailAndNewEmail = () => {
        this.setState({
            updateEmailFalg1: false,
            updateEmailFalg2: true
        })
    }
    componentDidMount() {
        this.getUserData();
    }
    render() {
        const { user, userMsg, editUserMsgFalg, updateUserPasswordFalg, updateEmailFalg1,
            updateEmailFalg2 } = this.state;
        return (
            <div>
                <Descriptions
                    title="个人信息："
                    bordered
                    extra={<Button type="primary" onClick={this.editMsg}>编辑</Button>}
                    column={{ xs: 4, sm: 4, md: 4 }}
                >
                    <Descriptions.Item label="昵称" span={4}>{userMsg.nickname || "无"}</Descriptions.Item>
                    <Descriptions.Item label="电话" span={4}>{userMsg.photo || "无"}</Descriptions.Item>
                    <Descriptions.Item label="宿舍地址" span={4}>{userMsg.address || "无"}</Descriptions.Item>

                </Descriptions>
                <div style={{ height: "20px" }} />
                <Descriptions
                    title="账号信息："
                    bordered
                    column={{ xs: 2, sm: 2, md: 2 }}
                >
                    <Descriptions.Item label="账号" span={2}>{user.userName || "无"}</Descriptions.Item>
                    <Descriptions.Item label="密码" span={2}>
                        {<Row>
                            <Col span={12}>{user.userPassword || "无"}</Col>
                            <Col offset={8} span={2}><Button type='primary' onClick={() => { this.setState({ updateUserPasswordFalg: true }) }}>修改密码</Button></Col>
                        </Row>}
                    </Descriptions.Item>
                    <Descriptions.Item label="邮箱" span={2}>
                        {<Row>
                            <Col span={12}>{user.email || "无"}</Col>
                            <Col offset={8} span={2}><Button type='primary' onClick={() => { this.setState({ updateEmailFalg1: true }) }}>修改邮箱</Button></Col>
                        </Row>}
                    </Descriptions.Item>
                    <Descriptions.Item label="金额" span={2}>
                        {<Row>
                            <Col span={12}><span style={{ fontSize: '120%' }}>{userMsg.money || "0"}</span></Col>
                        </Row>}
                    </Descriptions.Item>
                </Descriptions>
                <Modal
                    width={530}
                    title="编辑用户信息"
                    open={editUserMsgFalg}
                    footer={null}
                    destroyOnClose
                    onCancel={this.onCloseEditUserMsgModal}
                >
                    <UserMsgForm user={user} userMsg={userMsg} onCloseEditUserMsgModal={this.onCloseEditUserMsgModal} />
                </Modal>
                <Modal
                    width={530}
                    title="修改密码"
                    open={updateUserPasswordFalg}
                    footer={null}
                    destroyOnClose
                    onCancel={this.onCloseEditUserMsgModal}
                >
                    <UserUpdatePasswordForm user={user} onCloseEditUserMsgModal={this.onCloseEditUserMsgModal} />
                </Modal>
                <Modal
                    width={530}
                    title="修改邮箱"
                    open={updateEmailFalg1}
                    footer={null}
                    destroyOnClose
                    onCancel={this.onCloseEditUserMsgModal}
                >
                    <OlderFormEmailForm user={user} setStateOldEmailAndNewEmail={this.setStateOldEmailAndNewEmail} onCloseEditUserMsgModal={this.onCloseEditUserMsgModal} />
                </Modal>
                <Modal
                    width={530}
                    title="绑定新邮箱"
                    open={updateEmailFalg2}
                    footer={null}
                    destroyOnClose
                    onCancel={this.onCloseEditUserMsgModal}
                >
                    <NewEmailForm user={user} onCloseEditUserMsgModal={this.onCloseEditUserMsgModal} />
                </Modal>
            </div>
        )
    }
}

export default UserMsgDrawer
