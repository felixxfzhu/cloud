/**
 * Created by dell on 2019/4/21.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { Comment, Tooltip, Avatar} from 'antd';
import moment from 'moment';
import "antd/dist/antd.css";
// import img1 from '../img/a.png';
import {Head} from "./../components/commom"

class Detial extends React.Component {
    constructor (props) {
        super(props);
        this.state={
            info:{
                language: "Language",
                menulist: ["Chinese", "English"],
                profile:"WADE",
                toLink:"/login/"
            },
            detial:{
                productName: "Jade",
                productId: "123456789",
                productUrl:"https://www.baidu.com/",
                productCategory: "Deposit insurance",
                productPrice: "6666.00",
                productIntroduction:" Jade (Enjoyment Edition) The Children's Insurance Products Program provides The Children's Insurance Products Program provides The Children's Insurance Products Program provides"
                
            },
            likes: 0,
            dislikes: 0,
            action: null,
        },
        this.like = () => {
          this.setState({
            likes: 1,
            dislikes: 0,
            action: 'liked',
          });
        },
        this.dislike = () => {
          this.setState({
            likes: 0,
            dislikes: 1,
            action: 'disliked',
          });
        },
        this.alert = () => {
         alert("test");
        }

    }
    render() {
      //  const { getFieldDecorator } = this.props.form;
      const { likes, dislikes, action } = this.state;
      const actions = [
        <span>
          <Tooltip title="Like">
            <Icon
              type="like"
              theme={action === 'liked' ? 'filled' : 'outlined'}
              onClick={this.like}
            />
          </Tooltip>
          <span style={{ paddingLeft: 8, cursor: 'auto' }}>
            {likes}
          </span>
        </span>,
        <span>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={action === 'disliked' ? 'filled' : 'outlined'}
            onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
          {dislikes}
        </span>
      </span>,
      ];

        return (
            <div className="page detial">
                <Head info={this.state.info} ></Head>
                <div className="content">
                <p className="contentTop">Product Details and Preferences</p>
                    <div className = 'product_insure'>
                        <div className="product_insure_img fl">
                            <img alt="example" src='/src/img/a.png' />
                         </div>
                        <div className="product_insure_main fl">
                            <h3 className="insure_main_productName" onClick={this.alert}>{this.state.detial.productName}</h3>          
                            <p className='product_insure_main_category'>ProductCategory:  {this.state.detial.productCategory}</p>
                            <p className='product_insure_main_category'>ProductId:  {this.state.detial.productId}</p>
                            <p className="insure_main_productIntroduction">Product Introduction:  {this.state.detial.productIntroduction}</p>
                            
                            <label  className="insure_main_price">
                                <span className="product_insure_main_category">Price   </span>
                                <span className="insure_from_price">$ </span>
                                <span className="insure_from_price">{this.state.detial.productPrice}</span>
                            </label>   
                            <label  className="mg_t8">
                                <span className="product_insure_main_category">Effective Date:   </span>
                                <span className="product_insure_main_category">At 0:00 the day after the date of insurance</span>
                            </label>
                            <label>
                                <a href={this.state.detial.productUrl}>
                                   <p className = 'product_insure_main_buy'>BUY NOW</p>
                                   </a>
                                   <Comment
                                    actions={actions}
                                    />
                            </label>
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}

export default Detial;

