/**
 * @class Header
 * @extends {React.Component}
 */
import React from "react";
import { Router, Route, IndexRoute, Link, IndexLink,hashHistory } from 'react-router';

class Head extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="header">
                <i className={"header-left icon iconfont icon-HSBC"}></i>
               
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
