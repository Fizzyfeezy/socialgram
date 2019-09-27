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
    }
  },
  spreadThis : {
    typography : {
      useNextVariants : true
    },
    form : {
      textAlign : 'center'
    },
    image : {
      margin : '20px auto 20px auto'
    },
    pageTitle : {
      fontSize : 18,
      textTransform : "uppercase",
      fontWeight: 600,
      color : '#00BCD4',
      margin : '10px auto 10px auto'
    },
    boxTitle : {
      background: 'rgb(255,255,255)',
      height : '500px',
      margin : '30px auto 20px auto',
      borderRadius : 10,
      opacity : 0.95
    },
    textField : {
      margin : '20px auto 20px auto',
      width : 300
    },
    button : {
      margin : '20px auto 10px auto',
      width : 300,
      position : 'relative'
    },
    customError : {
      color : "red",
      fontSize : '0.8rem',
      marginTop : 10
    },
    progress : {
      position : 'absolute'
    }
  }
});

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