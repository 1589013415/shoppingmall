import { useRef, Fragment } from 'react'

import { Form, Input, Button, Space, message, Modal } from "antd"

import { PAGEROUTES, TOKEN, USERACCOUNTSTATE } from "../../const"
import axios from "axios";
import cookies from "js-cookie"

/**
 * 登录form样式
 */
const headStyle = {
    background: '#1677ff',
    textAlign: 'center',
    fontSize: '180%',
    fontFamily: '宋体',
    color: "white"
}

const bodyStyle = {
    background: 'rgba(20, 108, 232, 0.5)'
}

const FormItem = (isLoginFalg, setIsLoginFalg, form) => {
    let passwordInputRef = useRef();
    let verifyCOdeInput = useRef();
    return (
        <Fragment>
            <Form.Item
                label="账号："
                name="username"
                rules={[
                    {
                        required: true,
                        message: '请输入账号!',
                    },
                    {
                        pattern: /^\d{6}$/,
                        message: "账号只能为6位的数字!"
                    }
                ]}
                hasFeedback
            >
                {isLoginFalg ? <Input placeholder='请输入你的账号' onPressEnter={() => OnPressEnterAccount(passwordInputRef)} />
                    : <Space>
                        <Input placeholder='请输入你的账号' onPressEnter={() => OnPressEnterAccount(verifyCOdeInput)} />
                        {!isLoginFalg ? <Button onClick={() => GetVerify(form)}>获得验证码</Button> : null}
                    </Space>}
            </Form.Item>
            {!isLoginFalg ? <Form.Item
                label="验证码："
                name="verifyCode"
                rules={[
                    {
                        required: true,
                        message: '请输入正确的验证码',
                    },
                    {
                        pattern: /^[0-9a-zA-Z]+$/,
                        message: '请输入正确的验证码!',
                    },
                    {
                        min: 4,
                        max: 4,
                        message: '验证码为4位!',
                    }
                ]}
                hasFeedback
            >
                <Input placeholder='区分大小写' ref={c => verifyCOdeInput = c} onPressEnter={() => OnPressEnterAccount(passwordInputRef)} />
            </Form.Item> : null}
            <Form.Item
                label="密码："
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入密码!',
                    },
                    {
                        pattern: /^[0-9a-zA-Z]+$/,
                        message: '密码只能为数字和字母!',
                    },
                    {
                        min: 6,
                        message: '密码最起码为6位!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password placeholder='请输入你的密码' ref={e => passwordInputRef = e} />
            </Form.Item>
            <Form.Item
                wrapperCol={isLoginFalg ? { offset: 8, span: 16 } : { offset: 12, span: 12 }}
            >
                <Space>
                    {isLoginFalg ?
                        <Fragment>
                            <Button type='link' size="small" >
                                <span className='forgetPassword' onClick={() => setIsLoginFalg(false)}>忘记密码</span>
                            </Button>
                            <Button type="primary" htmlType="submit"> 登录</Button>
                            <Button htmlType="button" onClick={() => FormRest(form)} >取消</Button>
                        </Fragment>
                        : <Fragment>
                            <Button type="primary" htmlType="submit">重置</Button>
                            <Button htmlType="button" onClick={() => {setIsLoginFalg(true) }} >取消重置</Button>
                        </Fragment>}

                </Space>
            </Form.Item>
        </Fragment>
    )
}

//登录表单提交
const OnFinishLogin = async (param) => {
    const { navigate, form, formData, userState } = param
    const { messageApi, setIsUserLogin} = userState
    await axios.post(`/user/login`, formData).then(
        response => {
            const { state, success, msg } = response.data
            if (success) {
                messageApi.open({
                    type: 'success',
                    content: msg,
                });
                cookies.set(TOKEN.userToken, response.data.resultData.token, { expires: 1 });
                navigate(PAGEROUTES.userHome)
                FormRest(form)
                setIsUserLogin(true);
            } else {
                if (USERACCOUNTSTATE.Alreadylogin === state) {
                    ShowConfirm(param)
                } else {
                    messageApi.open({
                        type: 'warning',
                        content: msg,
                    });
                }
            }
        }
    ).catch(error => messageApi.open({
        type: 'warning',
        content: error.message,
    }))
}

//重复登录
const ShowConfirm = (param) => {
    const { navigate, formData, userState, form } = param
    const { setIsUserLogin, messageApi } = userState;
    Modal.confirm({
        title: '用户已登录，是否重复登录',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: async () => {
            await axios.post(`/user/relogin`, formData).then(
                response => {
                    const { state, success, resultData, msg } = response.data
                    if (success) {
                        messageApi.open({
                            type: 'success',
                            content: msg,
                        });
                        cookies.set(TOKEN.userToken, resultData.token, { expires: 1 });
                        navigate(PAGEROUTES.userHome)
                        FormRest(form);
                        setIsUserLogin(true)
                    } else {
                        if (USERACCOUNTSTATE.Alreadylogin === state) {
                            ShowConfirm(param)
                        } else {
                            messageApi.open({
                                type: 'warning',
                                content: msg,
                            });
                        }

                    }
                }
            ).catch(error => messageApi.open({ type: 'warning', content: error.message }))
        },
        onCancel() {
        },
    });
}

//忘记密码表单提交
const OnFinishReset = async (param) => {
    const {  formData, userState } = param
    const { messageApi } = userState
    await axios.post("/user/resetpassword", formData).then(
        respoense => {
            const {success,msg}= respoense.data
            if (success) {
                this.FormRest();
                messageApi.open({
                    type: 'success',
                    content: msg,
                });
                cookies.remove(TOKEN.userToken)
            } else {
                messageApi.open({
                    type: 'warning',
                    content: msg,
                });
            }
        }
    ).catch(error =>messageApi.open({ type: 'warning', content: error.message }))
}

//表单提交失败
const OnFinishFailed = (event) => {
    message.error(event)
}

const FormRest = (form) => {
    form.resetFields()
}

const OnPressEnterAccount = (inputRef) => {
    inputRef.focus();
}


const GetVerify = async (form) => {
    let userName = form.getFieldValue("username");
    if (userName === undefined) {
        message.error({
            content: "请输入你的账号",
            className: 'custom-class', style: {
                marginTop: '20vh',
                fontSize: "110%",
                color: "red"
            },
        }, 0.8)
        return
    }
    await axios.get("/user/getverify/" + userName).then(
        response => {
            if (response.data.success) {
                message.warning({
                    content: response.data.msg,
                    className: 'custom-class', style: {
                        marginTop: '20vh',
                        fontSize: "110%"
                    },
                }, 2)
            } else {
                message.error({
                    content: response.data.msg,
                    className: 'custom-class', style: {
                        marginTop: '20vh',
                        fontSize: "110%",
                        color: "red"
                    },
                }, 0.8)
            }
        },
    ).catch(error => message.error(error.message))
}

export const Utils = {
    headStyle,
    bodyStyle,
    OnFinishLogin,
    OnFinishReset,
    OnFinishFailed,
    FormItem
}