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
        this.state={
            info:{
                language: "Language",
                menulist: ["Chinese", "English"],
                profile:"lily",
                toLink:"/login/"
            }
        }

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="page detial">
                <Head info={this.state.info} ></Head>
                <div className="content">this is detial page</div>
            </div>
        );
    }
}

export default Detial;

