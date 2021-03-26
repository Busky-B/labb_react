import React, {Component} from 'react';
import  { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ApiConn from './ApiConn';
import Home from './home';
import App from './App';
import MovieRate from "./MovieRate";
import './App.css';

const test = () =>  {
    console.log("<-- TEST FUNCTION -->")
    
}

function Navbar() {
    return(
        <div className="app app-header">
            <Router>
                <div className="my-nav">
                    <h2 className="my-item">React-Labb</h2>
                    <p className="my-item">Tobias Granbom </p>
                    <ul>
                        {/* executar test-function */}
                        {test()}
                        <li id="test">
                            <Link to={'/'} className="nav-link" >Home</Link>
                        </li>
                        <li>
                            <Link to={'/App'} className="nav-link">Todo-App</Link>
                        </li>
                        <li>
                            <Link to={'/ApiConn'} className="nav-link">SeaSharp - Aktiviteter</Link>
                        </li>
                        <li>
                            <Link to={'/MovieRate'} className="nav-link">MovieRate</Link>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <div>
                        <Route exact path='/' component={Home} />
                        <Route  path='/App' component={App} />
                        <Route path='/ApiConn' component={ApiConn} />
                        <Route path='/MovieRate' component={MovieRate}/>
                    </div>
                </Switch>  
            </Router>
            
        </div>
       
       
    );
}

export default Navbar;