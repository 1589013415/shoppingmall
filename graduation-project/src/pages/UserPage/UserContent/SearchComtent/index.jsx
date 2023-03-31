import React, { Component } from 'react'
import Commodity from '../commodity'
import { Row, Col, Pagination } from "antd"
export class SearchComtent extends Component {
  state = {
    pageNum: 1,
    pageSize: 4,
  }
  pageNumChange = async (pageNum, pageSize) => {
    this.setState({ pageNum })
    this.props.getCommoditiesBySearch(pageNum, pageSize)
  }

  render() {
    const { commoditiesList, commoditiesBySearchTatol } = this.props || []
    const { pageNum, pageSize } = this.state
    return (
      <div>
        <div style={{ height: "20px" }} />
        <Row justify="center">
          <Col span={22} style={{ backgroundColor: "#e6edf280" }}>
            <Row>
              {
                // commoditiesList === undefined || commoditiesList.length === 0 ? <div style={{ paddingLeft: "42%", paddingTop: "10%" }}><div style={{ height: 100 }}></div><Empty /></div> :
                commoditiesList.map((e) => {
                  return <Commodity {...e} key={e.commodityid} />
                })
              }
            </Row>
            <div style={{ height: "20px" }} />
            {
              commoditiesList === undefined || commoditiesList.length === 0 ? null :
                <Row justify="center" >
                  <Col >
                    <Pagination
                      defaultCurrent={1}
                      current={pageNum}
                      showSizeChanger={false}
                      defaultPageSize={pageSize}
                      total={commoditiesBySearchTatol}
                      onChange={this.pageNumChange}
                      showTotal={() => <span style={{ color: "back" }}>总计：{commoditiesBySearchTatol}件</span>}
                    />
                  </Col>
                </Row>
            }

            <div style={{ height: "10px" }} />
          </Col>
        </Row>
        <div style={{ height: "20px" }} />
      </div>
    )
  }
}

export default SearchComtent
