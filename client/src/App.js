import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path = '/' component = {Home} />
            <Route path = '/login' component = {Login} />
            <Route path = '/signup' component = {Signup} />
          </Switch>
        </div>
      </Router>
    );
  } 
}

export default App;
