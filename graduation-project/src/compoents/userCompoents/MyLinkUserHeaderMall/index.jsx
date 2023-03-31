import React, { Component } from 'react'
import cookies from "js-cookie"
import { Link, withRouter } from "react-router-dom"
class MyLink extends Component {
    state = {
        falg: false
    }
    render() {
        let falg = this.state.falg;
        let token = cookies.get("token");
        if (token !== undefined && token !== "") {
            falg = true
        }
        const { path, name } = this.props
        return (
            <div>
                {
                    falg ? <Link to={path} >{name}</Link> : <Link to="/userlogin" >{name}</Link>

                }

            </div>
        )
    }
}

export default withRouter(MyLink)
