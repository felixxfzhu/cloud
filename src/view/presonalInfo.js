/**
 * Created by dell on 2019/4/21.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { version, Button } from "antd";
import "antd/dist/antd.css";

import { Head, } from "./../components/commom";
class PresonalInfo extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            info:{
                language: "Language",
                menulist: ["Chinese", "English"],
                profile:"Angela",
                toLink:"/login/",
                icon:"icon-settings"
            }
        };

    }
    render(){
        return (
            <div id="home" className="page presonalInfo">
                <Head info={this.state.info} ></Head>
                <div className="content">this is presonalInfo page</div>                
            </div>
        )
    }
}
export default PresonalInfo;
