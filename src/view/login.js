/**
 * Created by dell on 2019/4/21.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { version, Button } from "antd";
import "antd/dist/antd.css";

import {Head} from "./../components/commom"

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state={
           
        }

    }
    changeUsername(e) {
        this.setState({
            username:e.target.value,
            tip:""
        })

    }
    changePassword (e) {
        this.setState({
            password:e.target.value,
            tip:""
        })
    }
    render(){
        return (
            <div id="login-page" className="page">
                this is login page
            </div>
        )
    }
}
export default Login;

