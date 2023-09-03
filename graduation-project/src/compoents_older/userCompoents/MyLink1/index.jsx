import React, { Component } from 'react'
import { Link } from "react-router-dom"
export class MyLink1 extends Component {
    render() {
        return (
            <Link to={{ pathname: "/userlogin", state: { falg: "login" } }}  ><span className='headerLoginSpan'>登录</span></Link>
        )
    }
}

export default MyLink1
