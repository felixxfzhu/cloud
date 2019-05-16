import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import "./components/commom.css"
import "antd/dist/antd.css";

import Home from "./view/home";
import Regiser from "./view/regiser";
import Login from "./view/login";
import Detial from "./view/detial";
import Cart from "./view/cart";
import PresonalInfo from "./view/presonalInfo";

console.log(process.env.NODE_ENV);
export default class Root extends React.Component{
    render(){
        return (
            <HashRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/regiser" component={Regiser} />
                        <Route path="/login" component={Login} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/detial" component={Detial} />
                        <Route path="/presonalInfo" component={PresonalInfo} />
                        <Redirect from='/' to='/login/'></Redirect>
                    </Switch>
                </div>
            </HashRouter>
        );
    };
}

ReactDom.render(<Root />, document.getElementById('root'));
