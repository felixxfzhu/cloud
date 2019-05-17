/**
 * Created by dell on 2019/4/21.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Modal, message as Message} from "antd";
import { Comment, Tooltip, Avatar} from 'antd';
import moment from 'moment';
import "antd/dist/antd.css";
import {Head, List, Loading} from "./../components/commom";
import Paths from "../config/path";
import {API} from "../config";
import {post} from '../config/http';

function success(successMessage) {
    Modal.success({
        title: 'success',
        content: successMessage,
    });
}
class Detial extends React.Component {
    constructor (props) {
        super(props);
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const productId = window.location.hash.split("=")[1];
        this.deleteItem = this.deleteItem.bind(this);
        this.buyProduct = this.buyProduct.bind(this);
        this.state = {
            isShowAndHide:"hide",
            info:{
                language: "Language",
                menulist: ["Chinese", "English"],
                profile:userInfo?userInfo.loginName:"Login",
                toLink:userInfo?"/presonalInfo/":"/login/",
                icon:"icon-denglu"
            },
            detial:{
                like:"",
                disLike:""
            },
            productDetial:{
                createTime: "",
                description: "",
                imagePath1: "",
                imagePath2: "",
                prodAmount: {amount: "", currencyCode: null},
                prodCategory: {categoryId: "", categoryName: ""},
                productId: productId,
                title: ""
            },
            userInfo: userInfo?userInfo:{customerId:null,loginName:null,loginPassword:null},
            likes: 0,
            dislikes: 0,            
            action: null,
            ifLikeList:[null,null,null,null,null,null,null,null,null,null],
            recommendList: [],
            date: new Date()
        },
        this.like = () => {
          this.setState({
            likes: 1,
            dislikes: 0,
            action: 'liked',
          });
        },
        this.dislike = () => {
          this.setState({
            likes: 0,
            dislikes: 1,
            action: 'disliked',
          });
        }
       
    }
    componentDidMount(){
        let timeSec = 0;
        this.timeID = setInterval(() => {
            this.setState({
                date : timeSec++
            })
        }, 1000);
    }
    componentWillMount() {
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let cussessNum = 0;
        this.setState({
            isShowAndHide: "show"
        })
        const parameter = {
            customerId: this.state.productDetial.productId,
            productId: userInfo?this.state.userInfo.customerId:1
        }
        const res  = post(Paths.detail, parameter);
        res.then((response) =>{
            cussessNum++;
            if(cussessNum=="2"){
                this.setState({
                    isShowAndHide: "hide"
                })
            }
            const {status, message, result} = response;
            if(status == "1"){
                this.setState({
                    productDetial:result
                });
            }else{
                Message.error(message)
            }
        })
        API.recommendation({customerId:userInfo?userInfo.customerId:3,page:{pageNum:1,pageLimit:5}}).then((response) => {
            cussessNum++;
            if(cussessNum=="2"){
                this.setState({
                    isShowAndHide: "hide"
                })
            }
            if(response){
                const {status, message, result} = response;
                if(status == "1"){
                    console.log(result.userBase)
                    this.setState({
                        recommendList: result.userBase
                    })
                }else{
                    Message.error(message)
                }
            }
        })
    }
    componentWillUnmount(){
         var userInfo = JSON.parse(localStorage.getItem("userInfo"));
         if(userInfo){
            const params = {
                "favouriteId":this.state.likes,
                "customerId":this.state.userInfo.customerId,
                "createTime":this.state.date,
                "Product":{
                    "productId":this.state.productDetial.productId,
                    "title":this.state.productDetial.title,
                    "description":this.state.productDetial.description,
                    "imagePath1":this.state.productDetial.imagePath1,
                    "prodCategory":{
                        "categoryId":"",
                        "categoryName":this.state.productDetial.prodCategory.categoryName
                    },
                    "prodAmount":{
                        "amount":this.state.productDetial.prodAmount.amount,
                        "currencyCode":"USD"
                    }
                }
            }
            console.log(params);
            const res2  = post(Paths.storeBehavior, params);
            console.log(res2);
            clearInterval(this.timeID);
        }
    }
    deleteItem(i){
        this.state.recommendList.splice(i,1)
        this.setState({
            recommendList: this.state.recommendList
        })
    }
    buyProduct(){
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if(userInfo){
            const params = {
                "favouriteId":this.state.likes,
                "customerId":this.state.userInfo.customerId,
                "createTime":this.state.date,
                "Product":{
                    "productId":this.state.productDetial.productId,
                    "title":this.state.productDetial.title,
                    "description":this.state.productDetial.description,
                    "imagePath1":this.state.productDetial.imagePath1,
                    "prodCategory":{
                        "categoryId":"",
                        "categoryName":this.state.productDetial.prodCategory.categoryName
                    },
                    "prodAmount":{
                        "amount":this.state.productDetial.prodAmount.amount,
                        "currencyCode":"USD"
                    }
                }
            }
            console.log(params);
            const BuyP  = post(Paths.storeBehavior, params);
            BuyP.then(value =>{
                const res = value.status;
                if(value.status == '1'){
                    success('buy success');
                    console.log('buy success');
                }
            })
        }else{
             this.props.history.push( '/login');
        }
    }
    componentWillReceiveProps(){
        const {history} = this.props;
        console.log(history.location.search.split("=")[1]);
        this.setState({
            isShowAndHide: "show"
        })
        const parameter = {
            customerId: history.location.search.split("=")[1],
            productId: this.state.userInfo.customerId
        }
        console.log(parameter);
        API.detail(parameter).then((response) => {
            this.setState({
                isShowAndHide: "hide"
            })
            if(response){
                console.log(response);
                const {status, message, result} = response;
                if(status == "1"){
                    this.setState({
                        productDetial:result
                    });
                }else{
                    Message.error(message)
                }
            }
        })
    }
    render() {
        const { likes, dislikes, action } = this.state;
        const actions = [
            <span>
                <Tooltip title="Like">
                    <Icon type="like" theme={action === 'liked' ? 'filled' : 'outlined'} onClick={this.like}/>
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
            </span>,
            <span>
                <Tooltip title="Dislike">
                <Icon type="dislike" theme={action === 'disliked' ? 'filled' : 'outlined'} onClick={this.dislike}/>
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                {dislikes}
            </span>
        </span>,
        ];
        return (
            <div className="page detial">
                <Head info={this.state.info} ></Head>
                <div className="content">
                    <h1 className="contentTop">Product Details and Preferences</h1>
                    <div className = 'product_insure'>
                        <div className="product_insure_img fl">
                            <img alt="example" src={this.state.productDetial.imagePath1} />
                         </div>
                        <div className="product_insure_main fl">
                            <h3 className="insure_main_productName">{this.state.productDetial.title}</h3>          
                            <p className='product_insure_main_category'>ProductCategory: {this.state.productDetial.prodCategory.categoryName}</p>
                            <p className='product_insure_main_category'>ProductId: {this.state.productDetial.productId}</p>
                            <p className="insure_main_productIntroduction">Product Description: {this.state.productDetial.description}</p>
                            
                            <label  className="insure_main_price">
                                <span className="product_insure_main_category">Price   </span>
                                <span className="insure_from_price">$ </span>
                                <span className="insure_from_price">{this.state.productDetial.prodAmount.amount}</span>
                            </label>   
                            <label  className="mg_t8">
                                <span className="product_insure_main_category">Effective Date:   </span>
                                <span className="product_insure_main_category">At 0:00 the day after the date of insurance</span>
                            </label>
                            <label>
                                {/*<a href={this.state.detial.productUrl}>*/}
                                   <p className = 'product_insure_main_buy' onClick={this.buyProduct}>BUY NOW</p>
                                {/*</a>*/}
                                <Comment actions={actions} />
                            </label>
                        </div> 
                    </div>
                    <h1 className="recommendation icon iconfont icon-hengxian">&nbsp;&nbsp;&nbsp;&nbsp;Quality recommendation&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                    <div>
                        <List list={this.state.recommendList} attention={true} progress={true} delete={true} deleteItem={this.deleteItem} ifLikeList={this.state.ifLikeList}></List>
                    </div>
                </div>
                <Loading isShowAndHide={this.state.isShowAndHide}/>
            </div>
        );
    }
}

export default Detial;

