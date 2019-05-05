/**
 * Created by dell on 2019/4/21.
 */

import React from "react";
import { Modal } from "antd";
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
const Call = {
    getData:function (path, parameter) {
        Axios.get(path, parameter)
        .then(function (response) {
            console.log(JSON.stringify(response))
            return response;
        })
        .catch(function (errorMessage) {
            console.log(this);
            error(JSON.stringify(errorMessage));
        })
    },
    postData:function (path, parameter) {
        Axios.post(path, parameter)
            .then(function (response) {
                console.log(JSON.stringify(response))
                return response;
            })
            .catch(function (errorMessage) {
                console.log(this);
                error(JSON.stringify(errorMessage));
            })
    }
}

export default Call;