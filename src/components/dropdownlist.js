/**
 * @class Header
 * @extends {React.Component}
 */
import React from "react";
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button, Icon, message} from "antd";

class Dropdownlist extends React.Component {
    constructor(...args) {
        super(...args);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.state = {
            language:this.props.language,
            menulist:this.props.menulist
        };
        Object.assign(this.state,this.props);
    }
    handleMenuClick(e) {
        message.info(this.props.menulist[e.key]);
        console.log(e);
        this.setState({
            language:this.props.menulist[e.key]
        })
        this.props.getDropdownlistdata(this.props.menulist[e.key])
    }
    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                {
                    this.props.menulist.map((e,i)=>
                        <Menu.Item key={i}>{e}</Menu.Item>
                    )
                }
            </Menu>
        )
        return (
            <div>
                <Dropdown overlay={menu}>
                    <Button style={{ marginLeft: 8 }}>
                        {this.state.language} <Icon type="down" />
                    </Button>
                </Dropdown>
            </div>
        )
    }
}

export {Dropdownlist}
