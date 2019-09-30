import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createTheme from '@material-ui/core/styles/createMuiTheme';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';
import {Provider} from 'react-redux';
import store from './redux/store';

const theme = createTheme(themeFile);

// let authenticated;
// const token = localStorage.FBIdToken;
// if(token){
//   const decodedToken = jwtDecode(token);
//   if (decodedToken.exp * 1000 < Date.now()) {
//     window.location.href = '/login'
//     authenticated = false;
//   } else {
//     authenticated = true;
//   }
// }

class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme = {theme}>
        <Provider store = {store}>
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
        </Provider> 
      </MuiThemeProvider>
    );
  } 
}

export default App;