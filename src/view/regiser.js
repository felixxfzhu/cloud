/**
 * Created by dell on 2019/4/21.
 */
import React from 'react';
import MD from 'md5';
import { Link, Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Radio, DatePicker, Modal, message as Message } from "antd";
import {Paths, API} from "../config";
import {Head, Loading} from "./../components/commom"

class RegiserForm extends React.Component {
    constructor (props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
        this.validateToNextPassword = this.validateToNextPassword.bind(this);
        this.state = {
            confirmDirty: false,
            info:{
                language: "Language",
                menulist: ["Chinese", "English"],
                toLink:"/login/"
            },
            isShowAndHide:"hide"
        };
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let params = {
                    loginName:"",
                    loginPassword:"",
                    gender:"",
                    dateOfBirth:"",
                    age:""
                }
                let birthday = values.age._d.getTime();
                let today = new Date();
                let age = (today - birthday)/(365*24*60*60*1000);
                console.log('Received values of form: ', today.getTime());
                this.setState({
                    isShowAndHide: "show"
                })
                const parameter = {
                    customerId:Math.floor(Math.random()*10000),
                    loginName: values.userName,
                    loginPassword: MD(values.password),
                    name:values.userName,
                    age:Math.floor(age),
                    gender:values.gender
                }
                API.regiser(parameter).then((response) => {
                    this.setState({
                        isShowAndHide: "hide"
                    })
                    if(response){
                        const {status, message, result} = response;
                        if(status == "1"){
                            console.log(result);
                            localStorage.setItem("userInfo", JSON.stringify(result));
                            this.props.history.push( '/login');
                        }else{
                            Message.error(message);
                        }
                    }
                })
            }
        });
    }
    handleConfirmBlur(e){
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareToFirstPassword(rule, value, callback){
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    validateToNextPassword(rule, value, callback){
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render() {
        const { getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 8 } },
            wrapperCol: { xs: { span: 24 },sm: { span: 16 }}
        };
        const tailFormItemLayout = {
            wrapperCol: { xs: {span: 24, offset: 0},sm: {span: 16,offset: 8}}
        };
        return (
            <div className="page regiser">
                <Head info={this.state.info} ></Head>
                <div className="content">
                     <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="User Name">
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </Form.Item>
                        <Form.Item label="Password" hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                    {required: true, message: 'Please input your password!'},
                                    {validator: this.validateToNextPassword }
                                ],
                            })(<Input.Password />)}
                        </Form.Item>
                        <Form.Item label="Confirm Password" hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [
                                    {required: true, message: 'Please confirm your password!'},
                                    { validator: this.compareToFirstPassword}
                                ]
                            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                        </Form.Item>
                        <Form.Item label="Gender">
                            {getFieldDecorator('gender',{
                                rules: [
                                    {required: true, message: 'Please select your gender!'}
                                ]
                            })(
                                <Radio.Group>
                                    <Radio value="M">Male</Radio>
                                    <Radio value="F">Female</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>
                        <Form.Item label="Smoker">
                            {getFieldDecorator('smoker',{
                                rules: [
                                    {required: true, message: 'Please select your Smoker!'}
                                ]
                            })(
                                <Radio.Group>
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>
                        <Form.Item label="Birthday">
                            {getFieldDecorator('age', {
                                rules: [
                                    {required: true, message: 'Please input your birthday!'}
                                ]
                            })(<DatePicker />)}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            {getFieldDecorator('agreement', {
                                valuePropName: 'checked',
                                rules: [
                                    {required: true,message: 'Please submit the agreement!'}
                                ],
                            })(
                                <Checkbox>
                                    I have read the <a href="">agreement</a>
                                </Checkbox>,
                            )}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <Loading isShowAndHide={this.state.isShowAndHide}/>
            </div>
        );
    }
}
const Regiser = Form.create({ name: 'normal_login' })(RegiserForm);

export default Regiser;
 