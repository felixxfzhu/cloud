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
function Ajax(method, url, data) {
    var request = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.responseText);
                } else {
                    error(JSON.stringify(request));
                }
            }
        };
        request.open(method, url);
        request.send(data);
    });
}

export default Ajax;