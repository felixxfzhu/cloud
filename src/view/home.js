/**
 * Created by dell on 2019/4/21.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import {Tabs, Input, Pagination } from "antd";
import Paths from "../config/path";
import Ajax from "../config/call";

import { Head, List, } from "./../components/commom";


class Home extends React.Component {
    constructor (props) {
        super(props);
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.changePagination = this.changePagination.bind(this);
        this.state = {
            info:{
                language: "Language",
                menulist: ["Chinese", "English"],
                profile:userInfo?userInfo.userName:"Login",
                toLink:userInfo?"/presonalInfo/":"/login",
                icon:"icon-denglu"
            },
            productList: {},
            recommendList: []
        };

    }
    search(value){
        console.log(value)
    }
    objectArraySort(keyName) {
        return function (objectN, objectM) {
            var valueN = objectN[keyName]
            var valueM = objectM[keyName]
            if (valueN < valueM) return 1
            else if (valueN > valueM) return -1
            else return 0
        }
    }
    renderItem(data, key){
        const renderList={};
        Object.keys(data).map(key => {
            data[key].list.sort(this.objectArraySort('Recommendation'));
            renderList[key]={};
            renderList[key]["name"]= data[key].name;
            renderList[key]["list"]=[];
            for (var i=0; i < Math.ceil(data[key].list.length/5); i++){
                renderList[key].list.push(data[key].list.slice(i*5,(i+1)*5));
            }
            renderList[key]["length"] = data[key].list.length;
            renderList[key]["pageIndex"] = 0;
        })
        this.setState({
            productList: renderList,
            recommendList: data["property"].list
        })
    }
    changePagination(e, key, page,){
        console.log("key"+key)
        console.log("page"+page)
        this.state.productList[key].pageIndex = page-1;
        this.setState({
            productList: this.state.productList
        })
    }
    componentWillMount() {
		const path = Paths.host + Paths.products;
		Ajax("post",path,{}).then((response) => {
			console.log(JSON.stringify(response));
			return response;
		})
		console.log(path);
        fetch("./json/list.json")
            .then(res => res.json())
            .then(json => {
                this.renderItem(json)
            })

    }
    componentDidMount() {
        //console.log(this.state)
    }

    render(){
        return (
            <div id="home" className="page home">
                <Head info={this.state.info} ></Head>
                <div className="content">
                    <div className="search">
                        <Input.Search placeholder="Please input" enterButton="Search" size="large" onSearch={(value)=>this.search}/>
                    </div>
                    <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 240 }} >
                        {
                            Object.keys(this.state.productList).map((key)=>
                                <Tabs.TabPane tab={this.state.productList[key].name} key={key}>
                                    <List list={this.state.productList[key].list[this.state.productList[key].pageIndex]} attention={true} progress={true}></List>
                                    <div className="pagination">
                                        <Pagination simple defaultCurrent={1} onChange={this.changePagination.bind(null,null,key)} total={this.state.productList[key].length} hideOnSinglePage={false} pageSize={5}/>
                                    </div>
                                </Tabs.TabPane>
                            )
                        }
                    </Tabs>
                    <h1 className="recommendation icon iconfont icon-hengxian">&nbsp;&nbsp;&nbsp;&nbsp;Quality recommendation&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                    <div>
                        <List list={this.state.recommendList} attention={true} progress={true} delete={true}></List>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;
