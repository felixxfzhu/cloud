/**
 * Created by dell on 2019/4/21.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import {Tabs, Input, Pagination, Modal, message as Message } from "antd";
import {Paths, API} from "../config";

import { Head, List, Loading} from "./../components/commom";

class Home extends React.Component {
    constructor (props) {
        super(props);
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.deleteItem=this.deleteItem.bind(this);
        this.changePagination = this.changePagination.bind(this);
        this.state = {
            info:{
                language: "Language",
                menulist: ["Chinese", "English"],
                profile:userInfo?userInfo.loginName:"Login",
                toLink:userInfo?"/presonalInfo/":"/login",
                icon:"icon-denglu"
            },
            productList: {},
            isShowAndHide:"hide",
            ifLikeList:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
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
            data[key].list.sort(this.objectArraySort('rating'));
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
            productList: renderList
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
        let cussessNum = 0;
        fetch("./json/list.json")
            .then(res => res.json())
            .then(json => {
                this.renderItem(json)
            })
        this.setState({
            isShowAndHide: "show"
        })
        API.products({pageNum:1,pageLimit:5}).then((response) => {
            cussessNum++;
            if(cussessNum=="2"){
                this.setState({
                    isShowAndHide: "hide"
                })
            }
            if(response){
                const {status, message, result} = response;
                if(status == "1"){
                    console.log(response)
                }else{
                    Message.error(message)
                }
            }
        })
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        API.recommendation({customerId:userInfo?userInfo.customerId:2,page:{pageNum:1,pageLimit:10}}).then((response) => {
            cussessNum++;
            if(cussessNum=="2"){
                this.setState({
                    isShowAndHide: "hide"
                })
            }
            if(response){
                const {status, message, result} = response;
                if(status == "1"){
                    this.setState({
                        recommendList: result.userBase
                    })
                }else{
                    Message.error(message)
                }
            }
        })
    }
    componentDidMount() {
        //console.log(this.state)
    }
    deleteItem(i){
        this.state.recommendList.splice(i,1);
        this.setState({
            recommendList: this.state.recommendList
        })
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
                                    <List list={this.state.productList[key].list[this.state.productList[key].pageIndex]} ifLikeList={this.state.ifLikeList} progress={true}></List>
                                    <div className="pagination">
                                        <Pagination simple defaultCurrent={1} onChange={this.changePagination.bind(null,null,key)} total={this.state.productList[key].length} hideOnSinglePage={false} pageSize={5}/>
                                    </div>
                                </Tabs.TabPane>
                            )
                        }
                    </Tabs>
                    <h1 className="recommendation icon iconfont icon-hengxian">&nbsp;&nbsp;&nbsp;&nbsp;Quality recommendation&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                    <div className="recommendationList">
                        <List list={this.state.recommendList} progress={true} delete={true} deleteItem={this.deleteItem} ifLikeList={this.state.ifLikeList}></List>
                    </div>
                </div>
                 <Loading isShowAndHide={this.state.isShowAndHide}/>
            </div>
        )
    }
}
export default Home;
