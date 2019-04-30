/**
 * Created by dell on 2019/4/21.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.css";

import {Head} from "./../components/commom"

class Detial extends React.Component {
    constructor (props) {
        super(props);
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.state = {
            info:{
                language: "Language",
                menulist: ["Chinese", "English"],
                profile:userInfo?userInfo.userName:"Login",
                toLink:userInfo?"/presonalInfo/":"/login/",
                icon:"icon-denglu"
            }
        };

    }
    render() {
        return (
            <div className="page detial">
                <Head info={this.state.info} ></Head>
                <div className="content">this is detial page</div>
            </div>
        );
    }
}

export default Detial;

