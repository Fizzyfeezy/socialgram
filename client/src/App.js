import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createTheme from '@material-ui/core/styles/createMuiTheme';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

const theme = createTheme({
  palette :{
    primary : {
      light : '#33c9dc',
      main : '#00bcd4',
      dark : '#008394',
      contrastText : '#fff'
    },
    secondary : {
      light : '#ff6333',
      main : '#ff3d00',
      dark : '#b22a00',
      contrastText : '#fff'
    },
    typography : {
      useNextVariants : true
    }
  }
})

class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme = {theme}>
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
      </MuiThemeProvider>
    );
  } 
}

export default App;