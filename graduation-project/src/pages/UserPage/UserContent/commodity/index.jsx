import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Button, Card, Row } from 'antd'
import axios from 'axios';
import cookies from "js-cookie"
const { Meta } = Card;
class commodity extends Component {
  buyCommodity = async (commodityid) => {
    let token = cookies.get("token")
    try {
      axios.get("/api/commodity/isTokenExist", { headers: { token } }).then(
        resopnes => {
          if (resopnes.data.success) {
            console.log("用户已经登录");
            window.open('_black').location.href = `/userhome/buycommodity/${commodityid}`;
          } else {
            console.log("用户未登录，跳转至登录界面")
            this.props.history.push("/userlogin")
          }
        }
      )
    } catch (error) {
      console.log("首页购买请求失败", error);
    }
  }
  render() {
    const { imagePath, detail, commodityname, commodityid } = this.props
    return (
      <div style={{ paddingLeft: "67px", marginTop: "35px" }}>
        <Card
          style={{
            width: 260
          }}
          cover={
            <img
              width="260px"
              height="300px"
              alt="example"
              src={imagePath[0]}
            />
          }
        >
          <Meta style={{ height: "100px" }}
            title={`商品名：${commodityname}`}
            description={<span>介绍：<span style={{ color: "black" }}>{detail}</span></span>}
          />
          <Row justify="end">
            <Button style={{ fontSize: "20px", height: "50px" }} onClick={() => { this.buyCommodity(commodityid) }}>
              <span
                style={{
                  fontFamily: "华文琥珀",
                  color: "red",
                }}
              >
                购买
              </span>
            </Button>
          </Row>
        </Card>
      </div >
    )
  }
}

export default withRouter(commodity)
