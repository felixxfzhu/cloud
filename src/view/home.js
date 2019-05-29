/**
 * Created by dell on 2019/4/21.
 */
import React from 'react';
import _ from "lodash";
import { Link } from 'react-router-dom';
import {Tabs, Input, Pagination, Modal, message as Message } from "antd";
import {Paths, API} from "../config";

import { Head, List, ProdList, Loading} from "./../components/commom";

class Home extends React.Component {
    constructor (props) {
        super(props);
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.deleteItem=this.deleteItem.bind(this);
        this.changePagination = this.changePagination.bind(this);
        this.getProdCategorysList = this.getProdCategorysList.bind(this);
        this.prodCategorys = this.prodCategorys.bind(this);
        this.state = {
            info:{
                language: "Language",
                menulist: ["Chinese", "English"],
                profile:userInfo?userInfo.loginName:"Login",
                toLink:userInfo?"/presonalInfo/":"/login",
                icon:"icon-denglu"
            },
            productList: [],
            isShowAndHide:"hide",
            ifLikeList:[null,null,null,null,null,null,null,null,null,null],
            recommendList: []
        };

    }
    search(value){
        console.log(value)
    }
    changePagination(e, key,prodId, page,){
        prodId++;
        this.getProdCategorysList(prodId, page);
    }
    prodCategorys(category){
        console.log("category"+category);
        category++;
        this.getProdCategorysList(category, 1);
    }
    getProdCategorysList(prodId, pageNum){
        this.setState({
            isShowAndHide: "show"
        })
        API.loadProductsByProdCategory({"prodCategoryId":prodId, "page":{"pageNum":pageNum, "pageLimit":10}}).then((response) => {
            this.setState({
                    isShowAndHide: "hide"
                })
            if(response){
                const {status, message, result} = response;
                if(status == "1"){
                    console.log("prodCategoryId")
                    console.log(result)
                    let prodList = this.state.productList;
                    prodList[prodId-1].prodList = result.data;
                    prodList[prodId-1].total = result.totalElements;
                    this.setState({
                        productList: prodList
                    })
                    console.log(this.state.productList);
                }else{
                    Message.error(message)
                }
            }
        })
    }
    componentWillMount() {
        let cussessNum = 0;
        this.setState({
            isShowAndHide: "show"
        })
        API.loadProdCategorys().then((response) => {
            cussessNum++;
            if(cussessNum=="2"){
                this.setState({
                    isShowAndHide: "hide"
                })
            }
            if(response){
                const {status, message, result} = response;
                if(status == "1"){
                    _.keys(result).forEach((key)=>{
                        result[key]["prodList"] = [];
                        result[key]["total"] = 0;
                        result[key]["ifLike"] = [null,null,null,null,null,null,null,null,null,null];
                    })
                    this.setState({
                        productList: result
                    })
                    console.log(this.state.productList);
                    this.getProdCategorysList(1,1);
                }else{
                    Message.error(message)
                }
            }
        })
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        API.recommendation({customerId:userInfo?userInfo.customerId:1,page:{pageNum:1,pageLimit:5}}).then((response) => {
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
                    {/*<div className="search">
                        <Input.Search placeholder="Please input" enterButton="Search" size="large" onSearch={(value)=>this.search}/>
                    </div>*/}
                    <Tabs defaultActiveKey="0" tabPosition="left" style={{ height: 430}} onChange={this.prodCategorys}>
                        {
                            this.state.productList.map((item, key)=>
                                <Tabs.TabPane tab={item.categoryName} key={key}>
                                    <ProdList list={item.prodList} ifLike={item.ifLike} progress={true}></ProdList>
                                    <div className="pagination">
                                        <Pagination simple defaultCurrent={1} onChange={this.changePagination.bind(null,null,item.categoryId,key)} total={item.total} hideOnSinglePage={false} pageSize={10}/>
                                    </div>
                                </Tabs.TabPane>
                            )
                        }
                    </Tabs>
                    <h1 className="recommendation icon iconfont icon-hengxian">&nbsp;&nbsp;&nbsp;&nbsp; Guess You Like &nbsp;&nbsp;&nbsp;&nbsp;</h1>
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
