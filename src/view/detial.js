/**
 * Created by dell on 2019/4/21.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { Comment, Tooltip, Avatar} from 'antd';
import moment from 'moment';
import "antd/dist/antd.css";
// import img1 from '../img/a.png';
import {Head, List} from "./../components/commom";
import Call from '../config/call';
import Ajax from "../config/call";
import Paths from "../config/path";
import AccountReq from "../config/account"
class Detial extends React.Component {
    constructor (props) {
        super(props);
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const productId = window.location.hash.split("=")[1];
        this.state = {
            info:{
                language: "Language",
                menulist: ["Chinese", "English"],
                profile:userInfo?userInfo.userName:"Login",
                toLink:userInfo?"/presonalInfo/":"/login/",
                icon:"icon-denglu"
            },
            detial:{
                like:"",
                disLike:""
            },
            productName: "Jade",
            productId: productId,
            productImg: "./img/8.jpg",
            productCategory: "Deposit insurance",
            productIntroduction:" Jade (Enjoyment Edition) The Children's Insurance Products Program provides The Children's Insurance Products Program provides The Children's Insurance Products Program provides",
            productPrice: "6666.00",
            likes: 0,
            dislikes: 0,
            action: null,
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
        },
        this.alert = async () => {
          let aa= {
            loginName:"user1",
            loginPassWord:"e10adc3949ba59abbe56e057f20f883e"
          }
         await AccountReq.login()
        }
    }
    componentDidMount(){
      let timeSec = 0;
      this.timeID = setInterval(() => {
        this.setState({
          date : timeSec++
        })
        // console.log(timeSec + "b");
      }, 1000);
    }
    componentWillMount() {
      const parameter = {
       "productId": this.state.productId,
       "customerId": '1'
    }
    console.log(parameter)
    const path = Paths.host + Paths.detail;
    console.log(path);
    // Ajax("post",path, JSON.stringify(parameter)).then((response) => {
    //     const res = JSON.parse(response).result;
    //     console.log(res);
    //     this.setState({
    //       productName: res.title,
    //       productId: res.productId,
    //       productImg: res.imagePath1,
    //       productCategory: res.prodCategory.categoryName,
    //       productIntroduction:res.description,
    //       productPrice: res.prodAmount.amount,
    //     });
    //     return response;
    // })
        fetch("./json/list.json")
            .then(res => res.json())
            .then(json => {
                this.renderItem(json)
            })

    }
    componentWillUnmount(){
      console.log(this.state.date + "c");
      clearInterval(this.timeID);
      
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
            // productList: renderList,
            recommendList: data["property"].list
        })
    }
    render() {
      //  const { getFieldDecorator } = this.props.form;
      const { likes, dislikes, action } = this.state;
      const actions = [
        <span>
          <Tooltip title="Like">
            <Icon
              type="like"
              theme={action === 'liked' ? 'filled' : 'outlined'}
              onClick={this.like}
            />
          </Tooltip>
          <span style={{ paddingLeft: 8, cursor: 'auto' }}>
            {likes}
          </span>
        </span>,
        <span>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={action === 'disliked' ? 'filled' : 'outlined'}
            onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
          {dislikes}
        </span>
      </span>,
      ];
     const img1 = './img/7.jpg';
        return (
            <div className="page detial">
                <Head info={this.state.info} ></Head>
                <div className="content">
                    <h1 className="contentTop">Product Details and Preferences</h1>
                    <div className = 'product_insure'>
                        <div className="product_insure_img fl">
                            <img alt="example" src={this.state.productImg} />
                         </div>
                        <div className="product_insure_main fl">
                            <h3 className="insure_main_productName">{this.state.productName}</h3>          
                            <p className='product_insure_main_category'>ProductCategory:  {this.state.productCategory}</p>
                            <p className='product_insure_main_category'>ProductId:  {this.state.productId}</p>
                            <p className="insure_main_productIntroduction">Product Description:  {this.state.productIntroduction}</p>
                            
                            <label  className="insure_main_price">
                                <span className="product_insure_main_category">Price   </span>
                                <span className="insure_from_price">$ </span>
                                <span className="insure_from_price">{this.state.productPrice}</span>
                            </label>   
                            <label  className="mg_t8">
                                <span className="product_insure_main_category">Effective Date:   </span>
                                <span className="product_insure_main_category">At 0:00 the day after the date of insurance</span>
                            </label>
                            <label>
                                <a href={this.state.detial.productUrl}>
                                   <p className = 'product_insure_main_buy'>BUY NOW</p>
                                   </a>
                                   <Comment
                                    actions={actions}
                                    />
                            </label>
                        </div> 
                    </div>
                    <h1 className="recommendation icon iconfont icon-hengxian">&nbsp;&nbsp;&nbsp;&nbsp;Quality recommendation&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                    <div>
                        <List list={this.state.recommendList} attention={true} progress={true} delete={true}></List>
                    </div>
                </div>
            </div>
        );
    }
}

export default Detial;

