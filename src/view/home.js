/**
 * Created by dell on 2019/4/21.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { version, Button } from "antd";
import "antd/dist/antd.css";

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state={
           
        }

    }
    render(){
        return (
            <div id="home" className="home">
                <div className="content">this is home page</div>
                <Link to="/login/">
                    <Button type="primary">go to login</Button>
                </Link>
            </div>
        )
    }
}
export default Home;
