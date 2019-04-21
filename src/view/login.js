/**
 * Created by dell on 2019/4/21.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { version, Button } from "antd";
import "antd/dist/antd.css";

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state={
           
        }

    }
    render(){
        return (
            <div id="login" className="login">
                <div className="content">this is login page</div>
            </div>
        )
    }
}
export default Login;
