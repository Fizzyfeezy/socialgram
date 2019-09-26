import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';


class App extends Component {
  render () {
    return (
      <div className="App">
        <Router>
          <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path = '/' component = {Home} />
              <Route path = '/login' component = {Login} />
              <Route path = '/signup' component = {Signup} />
            </Switch>
          </div>
        </Router>    
      </div>
    );
  } 
}

export default App;