import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import "./components/commom.css"

import Home from "./view/home";
import Login from "./view/login";
console.log(process.env.NODE_ENV);
export default class Root extends React.Component{
    render(){
        return (
            <HashRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Redirect from='/' to='/login/'></Redirect>
                    </Switch>
                </div>
            </HashRouter>
        );
    };
}

ReactDom.render(<Root />, document.getElementById('root'));
