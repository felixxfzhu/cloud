/**
 * @class Header
 * @extends {React.Component}
 */
import React from "react";
import { Modal, Button} from "antd";

class Dialog extends React.Component {
    constructor (props) {
        super(props);
    }
    info() {
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
    error() {
        Modal.error({
            title: 'This is an error message',
            content: 'some messages...some messages...',
        });
    }
    render(){
        return (
            <div className="error">
                <Button onClick={this.error}>Error</Button>
            </div>
        )
    }
}

export default Dialog;
