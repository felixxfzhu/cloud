/**
 * @class Header
 * @extends {React.Component}
 */
import React from "react";
import { Link } from 'react-router-dom';
import { Progress, Card, Icon} from "antd";
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
                    <i className={"header-left icon iconfont icon-HSBC"}></i>
                    <span className="logoName">HSBC</span>
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
        this.attention=this.attention.bind(this);
    }
    attention(e){
        e.preventDefault();
        console.log("wwwww");

    }
    render() {
        return (
            <div className="list-swiper">
                {
                    this.props.list.map((item,i)=>
                        <Link className="list-item" key={i} to={"/detial?key="+item.id}>
                            <Card hoverable cover={
                                <div>
                                    <img src={item.img}/>
                                    <div className="productDetial">
                                        <div className="productName">{item.name}</div>
                                        {this.props.progress?(<Progress percent={item.Recommendation*100} size="small" />):""}
                                        <span className="price">{item.price}</span>
                                        <div className="funcBlock">
                                            <i onClick={(e)=>this.attention(e)} className={"like icon iconfont "+(this.props.attention?"icon-follow":"")}></i>
                                            <i className={"delete icon iconfont "+(this.props.delete?"icon-delete":"")}></i>
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
        this.state = {
			display:"display:none;"
		};
    }
	show(){
		this.setState({
			display: "display:block"
		})
	}
	hide(){
		this.setState({
			display: "display:none"
		})
	}
    render() {
        return (
            <div style={this.state.display} className="loading">
                <Spin size="large" />
            </div>
        )
    }
}

export {Head, Content, List, Loading}
