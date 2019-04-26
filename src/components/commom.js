/**
 * @class Header
 * @extends {React.Component}
 */
import React from "react";
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button, Icon, message} from "antd";
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
    constructor(...args) {
        super(...args);
        this.state = {};
    }
    render() {
        return (
            <div className="content">
                {this.props.child}
            </div>
        )
    }
}

class Footer extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {};
    }
    render() {
        return (
            <div className="Footer">
                this is footer
            </div>
        )
    }
}

export {Head, Content, Footer}
