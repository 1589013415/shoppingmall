import React, { Component } from 'react'
import { Link } from "react-router-dom"
export class index extends Component {
    render() {
        return (
            <Link to={{ pathname: "/register", state: { falg: "register" } }}  ><span className='headerLoginSpan'>注册</span></Link>
        )
    }
}
export default index
