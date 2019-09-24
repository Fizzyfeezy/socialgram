import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';


class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path = '/' component = {Home} />
              <Route path = '/login' component = {Login} />
              <Route path = '/signup' component = {Signup} />
            </Switch>
          </div>  
        </div>
      </Router>
    );
  } 
}

export default App;