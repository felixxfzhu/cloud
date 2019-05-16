/**
 * Created by dell on 2019/4/21.
 */
import React from 'react';
import MD from 'md5';
import { Link, Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Modal, message as Message } from "antd";
import {Paths, API} from "../config";
import {Head, Loading} from "./../components/commom"

class LoginForm extends React.Component {
    constructor (props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            info:{
                language: "Language",
                menulist: ["Chinese", "English"],
                toLink:"/login/"
            },
            isShowAndHide:"hide"
        }
    }
    handleSubmit(e){
        console.log(this.props.history)
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    isShowAndHide: "show"
                })
                const parameter = {
                    loginName: values.userName,
                    loginPassWord: MD(values.password)
                }
                API.login(parameter).then((response) => {
                    if(response){
                        const {status, message, result} = response;
                        if(status == "1"){
                            this.setState({
                                isShowAndHide: "hide"
                            })
                            console.log(result);
                            localStorage.setItem("userInfo", JSON.stringify(result));
                            this.props.history.push( '/');
                        }else{
                            Message.error(message)
                        }
                    }
                })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="page login">
                <Head info={this.state.info} ></Head>
                <div className="content">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            <Link to="/regiser" className="register-form-button">Or register now!</Link>
                        </Form.Item>
                    </Form>
                </div>
                <Loading isShowAndHide={this.state.isShowAndHide}/>
            </div>
        );
    }
}
const Login = Form.create({ name: 'normal_login' })(LoginForm);

export default Login;
 