import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PostScream from './PostScream';


class Navbar extends Component {
  render() {
    const {authenticated} = this.props
    return (
      <div>
        <AppBar>
          <Toolbar className = "nav-container">
            {authenticated ? (
              <Fragment>
                <PostScream />
                <MyButton tip="Home" >
                  <HomeIcon />
                </MyButton>
                <MyButton tip="Notifications" >
                  <NotificationsIcon />
                </MyButton>
              </Fragment>
            ) : (
              <Fragment>
                <Button color="inherit" component = {Link} to = '/'>Home</Button>
                <Button color="inherit" component = {Link} to = '/login'>Login</Button>
                <Button color="inherit" component = {Link} to = '/signup'>Signup</Button>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
Navbar.propTypes = {
  authenticated : PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  authenticated : state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
