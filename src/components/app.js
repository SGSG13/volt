import React, {Component} from 'react'
import Header from './header'
import Products from './products'
import Customers from './customers'
import Invoices from './invoices'
import {Router, Route} from 'react-router-dom'

import  createBrowserHistory from 'history/createBrowserHistory';
const   customHistory = createBrowserHistory();


class App extends Component {
   
    render() {
        return (
            <div>
                <Router history={customHistory}>
                    <div>
                        <Header/>
                        <Route path="/products" component = {Products}/>
                        <Route path="/" component = {Invoices} exact/>
                        <Route path="/customers" component = {Customers}/>
                        <Route path="/invoices" component = {Invoices}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
