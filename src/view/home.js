/**
 * Created by dell on 2019/4/21.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { version, Button } from "antd";
import "antd/dist/antd.css";

import { Head, Footer } from "./../components/commom";
class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state={
           
        }

    }
    render(){
        return (
            <div id="home" className="home">
                <Head></Head>
                <div className="content">this is home page</div>
                <Footer>
                    <Link to="/login/">
                    </Link>
                </Footer>
                
            </div>
        )
    }
}
export default Home;
