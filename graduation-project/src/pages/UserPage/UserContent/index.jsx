import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Col, Row, Menu, ConfigProvider, Input, message, } from 'antd'
import "./index.css"
import Item from "./Item"
import UserComtentHome from './UserComtentHome'
import SearchComtent from "./SearchComtent"
import axios from 'axios'
const { Search } = Input;
class UserContent extends Component {
    state = {
        isSelectMenu: "all",
        commoditiesList: [],
        selectOptions: [],
        isSearch: false,
        isSearchValue: "",
        commoditiesBySearchTatol: 0
    }
    onSearch = (e) => {
        if (e === "" || e === undefined) {
            message.warning("请输入你要搜索的内容")
            return
        }
        this.getCommoditiesBySearch(1, 4);
    }
    getCommoditiesBySearch = async (pageNum, pageSize) => {
        try {
            axios.get(`/user/search/${this.state.isSearchValue}/${pageNum}/${pageSize}`).then(
                response => {
                    this.setState({
                        isSelectMenu: "all", isSearch: true, commoditiesList: response.data.resultData.commoditiesList,
                        commoditiesBySearchTatol: response.data.resultData.total
                    })
                }
            )
        } catch (error) {
            console.log("搜索失败", error);
        }
    }
    menuClick = (e) => {
        this.setState({ isSelectMenu: e.key, isSearch: false, isSearchValue: "" })
        this.getCommoditiesList(e.key)
    }
    getCommoditiesList = async (key) => {
        try {
            await axios.get(`/user/getAllCommodities/${key}`).then(
                response => {
                    this.setState({ commoditiesList: response.data.resultData.allCommoditys })
                }
            )
        } catch (error) {
            console.log("获得全部出售商品失败", error);
        }
    }
    getSelectOpotins = async () => {
        try {
            await axios.get("/user/getcommodityclassify").then(
                response => {
                    let selectOptions = response.data.resultData.commdoityClassify.map(e => {
                        return { "label": <Item label={e.classname} ></Item>, "key": e.key }
                    });
                    this.setState({ selectOptions })
                }
            )
        } catch (error) {
            console.log(error);
        }
    }
    componentDidMount() {
        this.getCommoditiesList("all");
        this.getSelectOpotins();
    }
    render() {
        const { isSelectMenu, commoditiesList, selectOptions, isSearch, isSearchValue, commoditiesBySearchTatol } = this.state
        return (
            <div className='div' style={{ height: commoditiesList.length === 0 ? "600px" : "auto", borderRadius: "300px" }}>
                <div style={{ height: "5px" }} />
                <Row>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: "#002EA6",
                            },
                        }}
                    >
                        <Col span={1} style={{ backgroundColor: "#FFE78F" }} >
                        </Col>
                        <Col span={11} >
                            <Menu selectedKeys={isSelectMenu} onClick={this.menuClick} className="title" mode="horizontal" items={selectOptions} />
                        </Col>
                    </ConfigProvider>
                    <Col span={2} >
                    </Col>
                    <Col span={10} >
                        <Search className="titleLeft"
                            ref={c => this.searchInput = c}
                            style={{ backgroundColor: "aliceblue" }}
                            placeholder="请输入你想要找的商品"
                            allowClear
                            enterButton="搜索"
                            size="large"
                            value={isSearchValue}
                            onChange={(e) => { this.setState({ isSearchValue: e.target.value }) }}
                            onSearch={this.onSearch}
                        />
                    </Col>
                </Row>
                {isSearch && commoditiesBySearchTatol !== 0 ?
                    <SearchComtent
                        commoditiesBySearchTatol={commoditiesBySearchTatol}
                        getCommoditiesBySearch={this.getCommoditiesBySearch}
                        commoditiesList={commoditiesList} /> :
                    <UserComtentHome commoditiesList={commoditiesList} />}
            </div >
        )
    }
}

export default withRouter(UserContent)
