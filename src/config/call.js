/**
 * Created by dell on 2019/4/21.
 */

import React from "react";
import { Modal, message as Message } from "antd";
import Axios from "axios"

function info() {
    Modal.info({
        title: 'This is a notification message',
        content: (
            <div>
                <p>some messages...some messages...</p>
                <p>some messages...some messages...</p>
            </div>
        ),
        onOk() {},
    });
}
function error(errorMessage) {
    Modal.error({
        title: 'Warning',
        content: errorMessage,
    });
}
const instance = Axios.create({
    transformRequest:(requestData) => {
        return requestData;
    },
    transformResponse:(responseData) => {
        try{
            const {resultCode, errorInfo} = JSON.parse(responseData);
            if(resultCode === "0") {
                Message.error(errorInfo.errorMsg,8);
            }else{
                Message.success("loading Successful",1)
            }
        }catch(e){
            console.log(e)
        }
        return responseData;
    }
})
instance.interceptors.response.use(function(response){
    const {status, data, statusText,headers} = response;
    if(status === 200){
        return JSON.parse(data);
    }else{
        Message.error(status);
        return response;
    }
},function(error){
    Message.error(error);
    console.log(error);
})
const headers = {
    'Content-Type':'application/json'
}
export default {
    get:(url, params) => {
        return instance.get(url,{params: params, headers: headers});
    },
    post: (url,params) => {
        console.log(url);
        console.log(params);
        return instance.post(url,JSON.stringify(params),{headers: headers});
    }
}