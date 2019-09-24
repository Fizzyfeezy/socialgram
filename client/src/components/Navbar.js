import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Signup</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navbar;
