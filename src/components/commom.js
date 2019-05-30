/**
 * @class Header
 * @extends {React.Component}
 */
import React from "react";
import { Link } from 'react-router-dom';
import { Progress, Card, Icon, Spin, Comment,Tooltip,} from "antd";
import { Dropdownlist } from './dropdownlist';
class Head extends React.Component{
    constructor(props){
        super(props);
        this.getDropdownlistdata = this.getDropdownlistdata.bind(this);
        this.state = {
            language: this.props.info.language
        };
        Object.assign(this.state,this.props);
    }
    getDropdownlistdata(data){
        this.setState({
            language: data
        })
        console.log(data)
    }
    render(){
        return(
            <div className="header">
                <Link to="/">
                    <i className={"header-left icon iconfont icon-home"}></i>
                    <span className="logoName">Home</span>
                </Link>
                <Link to={this.props.info.toLink}>
                    <div className="login">{this.props.info.profile}&nbsp;&nbsp;
                        <i className={"header-left icon iconfont "+this.props.info.icon}></i>
                    </div>
                </Link>
                <div className="language">
                    <Dropdownlist language={this.state.language} menulist={this.props.info.menulist} getDropdownlistdata={this.getDropdownlistdata}/>
                </div>
            </div>
        )
    }
}

class Content extends React.Component {
    constructor(props){
        super(props);

    }
    render() {
        return (
            <div className="content">
                {this.props.child}
            </div>
        )
    }
}
class List extends React.Component {
    constructor(props){
        super(props);
        this.delete=this.delete.bind(this);
        this.like=this.like.bind(this);
        this.dislike=this.dislike.bind(this);
        this.state = {
            action:this.props.ifLikeList,
        }
    }
    like(self,i,e){
        e.preventDefault();
        this.state.action[i] = "liked"
        this.setState({
            action: this.state.action
        });
    }
    dislike(self,i,e){
        e.preventDefault();
        this.state.action[i] = "disliked"
        this.setState({
            action: this.state.action
        });
    }
    delete(self,i,e){
        e.preventDefault();
        this.props.deleteItem(i);
        this.state.action.splice(i,1)
        this.setState({
            action: this.state.action
        });
    }
    render() {
        const { action } = this.state;
        return (
            <div className="list-swiper">
                {
                    this.props.list.map((item,i)=>
                        <Link className="list-item" key={i} to={"/detial?key="+item.product.productId}>
                            <Card hoverable cover={
                                <div>
                                    <img src={item.product.imagePath1}/>
                                    <div className="productDetial">
                                        <div className="productName">{item.product.title}</div>
                                        {this.props.progress?(<Progress percent={item.rating*10} size="small" />):""}
                                        <div className="price-swiper">
                                            <span className="insure_from_price">$ </span>
                                            <span className="price">{item.product.prodAmount.amount}</span>
                                         </div>
                                        <div className="funcBlock">
                                            <span onClick={this.like.bind(null,null,i)}>
                                                <Tooltip title="Like">
                                                    <Icon  type="like" theme={action[i] === 'liked' ? 'filled' : 'outlined'}/>
                                                </Tooltip>
                                            </span>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <span onClick={this.dislike.bind(null,null,i)}>
                                                <Tooltip title="Dislike">
                                                    <Icon type="dislike" theme={action[i] === 'disliked' ? 'filled' : 'outlined'}/>
                                                </Tooltip>
                                            </span>
                                            <i onClick={this.delete.bind(null,null,i)} className={"delete icon iconfont "+(this.props.delete?"icon-delete":"")}></i>
                                        </div>
                                    </div>
                                </div>
                            }/>
                        </Link>
                    )
                }
            </div>
        )
    }
}
class ProdList extends React.Component {
    constructor(props){
        super(props);
        this.delete=this.delete.bind(this);
        this.like=this.like.bind(this);
        this.dislike=this.dislike.bind(this);
        this.state = {
            action:this.props.ifLike,
        }
        console.log(this.props.list)
    }
    like(self,i,e){
        e.preventDefault();
        this.state.action[i] = "liked"
        this.setState({
            action: this.state.action
        });
    }
    dislike(self,i,e){
        e.preventDefault();
        this.state.action[i] = "disliked"
        this.setState({
            action: this.state.action
        });
    }
    delete(self,i,e){
        e.preventDefault();
        this.props.deleteItem(i);
        this.state.action.splice(i,1)
        this.setState({
            action: this.state.action
        });
    }
    render() {
        const { action } = this.state;
        return (
            <div className="list-swiper">
                {
                    this.props.list.map((item,i)=>
                        <Link className="list-item" key={i} to={"/detial?key="+item.productId}>
                            <Card hoverable cover={
                                <div>
                                    <img src={item.imagePath1}/>
                                    <div className="productDetial">
                                        <div className="productName">{item.title}</div>
                                       <div className="price-swiper">
                                            <span className="insure_from_price">$ </span>
                                            <span className="price">{item.prodAmount.amount}</span>
                                         </div>
                                        <div className="funcBlock">
                                            <span onClick={this.like.bind(null,null,i)}>
                                                <Tooltip title="Like">
                                                    <Icon  type="like" theme={action[i] === 'liked' ? 'filled' : 'outlined'}/>
                                                </Tooltip>
                                            </span>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <span onClick={this.dislike.bind(null,null,i)}>
                                                <Tooltip title="Dislike">
                                                    <Icon type="dislike" theme={action[i] === 'disliked' ? 'filled' : 'outlined'}/>
                                                </Tooltip>
                                            </span>
                                            <i onClick={this.delete.bind(null,null,i)} className={"delete icon iconfont "+(this.props.delete?"icon-delete":"")}></i>
                                        </div>
                                    </div>
                                </div>
                            }/>
                        </Link>
                    )
                }
            </div>
        )
    }
}
class Loading extends React.Component {
    constructor(...args) {
        super(...args);
    }
    render() {
        return (
            <div className={"loading "+this.props.isShowAndHide}>
                <Spin size="large" />
            </div>
        )
    }
}

export {Head, Content, List, ProdList, Loading}
