import React, {Component} from 'react';
import  { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ApiConn from './ApiConn';
import Home from './home';


function Navbar() {
    return(
        <div className="app app-header">
            <Router>
                <div className="my-nav">
                    <h2 class="my-item">my div</h2>
                    <p class="my-item">Some text hihihiihihih</p>
                    <ul>
                        <li>
                            {/* <a href="#">Home</a> */}
                            <Link to={'/'} className="nav-link">Home</Link>
                        </li>
                        <li>
                            {/* <a href="#">SeaSharp-Activities</a> */}
                            <Link to={'/ApiConn'} className="nav-link">SeaSharp - Aktiviteter</Link>
                        </li>
                        <li>
                            <a href="#">Third Link(other api)</a>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/ApiConn' component={ApiConn} />
                </Switch>  
            </Router>
            <div>
                      

            </div>
        </div>
       
       
    );
}

export default Navbar;