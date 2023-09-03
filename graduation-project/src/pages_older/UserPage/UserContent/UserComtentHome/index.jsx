import React, { Component } from 'react'
import { Col, Row, Empty } from 'antd'
import Commodity from '../commodity'

export class UserComtentHome extends Component {
    render() {
        const { commoditiesList } = this.props || []
        return (
            <div>
                <div style={{ height: "20px" }} />
                <Row justify="center" >
                    <Col span={22} style={{ background: "#e6edf280" }}>
                        <Row><div style={{ height: "10px" }} /></Row>
                        <Row>
                            {
                                commoditiesList === undefined || commoditiesList.length === 0 ? <div style={{ paddingLeft: "42%", paddingTop: "8%", paddingBottom: "18%" }}><Empty /></div> :
                                    commoditiesList.map((e) => {
                                        return <Commodity {...e} key={e.commodityid} />
                                    })
                            }
                        </Row>
                        <Row><div style={{ height: "36px" }} /></Row>
                    </Col>
                </Row>
                <div style={{ height: "20px" }} />
            </div>
        )
    }
}

export default UserComtentHome
