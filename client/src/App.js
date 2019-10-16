import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createTheme from '@material-ui/core/styles/createMuiTheme';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import Navbar from './components/layout/Navbar';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';
import {Provider} from 'react-redux';
import store from './redux/store';
import {logoutUser, getUserData} from './redux/actions/userAction';
import {SET_AUTHENTICATED} from './redux/type';
import axios from 'axios';

const theme = createTheme(themeFile);

axios.defaults.baseURL = 'https://us-central1-socialgram-b5c73.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({type : SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

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
                <AuthRoute exact path = '/login' component = {Login}/>
                <AuthRoute exact path = '/signup' component = {Signup}/>
                <Route exact path = '/users/:handle' component = {User} />
                <Route exact path = '/users/:handle/scream/:screamId' component = {User} />
              </Switch>
            </div>
          </Router>
        </Provider> 
      </MuiThemeProvider>
    );
  } 
}

export default App;