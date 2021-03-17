import React, {Component} from 'react';
import  { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ApiConn from './ApiConn';
import Home from './home';
import App from './App';
import './App.css';


function Navbar() {
    return(
        <div className="app app-header">
            <Router>
                <div className="my-nav">
                    <h2 class="my-item">React-Labb</h2>
                    <p class="my-item">Tobias Granbom </p>
                    <ul>
                        <li>
                            <Link to={'/'} className="nav-link">Home</Link>
                        </li>
                        <li>
                            <Link to={'/App'} className="nav-link">Todo-App</Link>
                        </li>
                        <li>
                            <Link to={'/ApiConn'} className="nav-link">SeaSharp - Aktiviteter</Link>
                        </li>
                        <li>
                            <a href="#">Third Link(other api)</a>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <div>
                        <Route exact path='/' component={Home} />
                        <Route  path='/App' component={App} />
                        <Route path='/ApiConn' component={ApiConn} />
                    </div>
                </Switch>  
            </Router>
            
        </div>
       
       
    );
}

export default Navbar;