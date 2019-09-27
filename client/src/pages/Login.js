import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AppIcon from '../images/monkey.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {Link} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userAction';


const styles = (theme) => ({
  ...theme.spreadThis
})

class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      email: '',
      password: '',
      errors : {}
    }
  }
  handleChange = event => {
      this.setState ({
        [event.target.name] : event.target.value
      })
  }
  handleSubmit = event => {
    event.preventDefault();
    this.setState ({
      
    });
    const userData = {
      email : this.state.email,
      password : this.state.password
    }
    this.props.loginUser(userData, this.props.history);
  }
  
  render() {
    const {classes, UI: {loading}} = this.props;
    const {errors} = this.state
    return (
      <Grid container className = {classes.form}>
          <Grid item sm />
          <Grid item sm className = {classes.boxTitle}>
              <img src = {AppIcon} alt = "image" className = {classes.image} />
              <Typography variant = "h2" className = {classes.pageTitle}>Sign in</Typography>
              <form noValidate onSubmit = {this.handleSubmit}>
                  <TextField id="email" name="email" type="email" label="Email" className = {classes.textField}
                    value= {this.state.email} onChange = {this.handleChange} helperText = {errors.email}
                    error = {errors.email ? true : false } fullWidth/>
                  <TextField id="password" name="password" type="password" label="Password" className = {classes.textField}
                    value= {this.state.password} onChange = {this.handleChange}  helperText = {errors.password} 
                    error = {errors.password ? true : false } fullWidth/>
                  {errors.general && (
                    <Typography variant="body2" className={classes.customError}>
                      {errors.general}
                    </Typography>
                  )}
                  <Button type= "submit" variant = "contained" color = "primary" className = {classes.button}
                    disabled = {loading}>Login
                    {loading && (
                      <CircularProgress className = {classes.progress} size = {30} />
                    )}
                  </Button>
                  <br/>
                  <small>dont have an account ? sign up <Link to='/signup'>here</Link></small>
              </form>
          </Grid>
          <Grid item sm  />
      </Grid>
    );
  }
}

Login.protoType = {
  classes : PropTypes.object.isRequired,
  loginUser : PropTypes.object.isRequired,
  user : PropTypes.object.isRequired,
  UI : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user : state.user,
  UI : state.UI
});

const mapActionsToProps = {
  loginUser
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));
