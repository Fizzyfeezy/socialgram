import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AppIcon from '../images/monkey.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {signupUser} from '../redux/actions/userAction';
import {connect} from 'react-redux';

const styles = (theme) => ({
  ...theme.spreadThis,
  boxTitle : {
    backgroundColor: '#e0e0e0',
    height : '630px',
    margin : '30px auto 20px auto',
    borderRadius : 10,
    opacity : 0.95
  },
  textField : {
    margin : '15px auto 15px auto',
    width : 350
  },
  button : {
    margin : '20px auto 10px auto',
    width : 350,
    position : 'relative'
  }
})

class Signup extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      email: '',
      password: '',
      confirmPassword : '',
      handle : '',
      errors : {}
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if (nextProps.UI.errors) {
      this.setState({
        errors : nextProps.UI.errors
      });
    }
  }
  handleChange = event => {
      this.setState ({
        [event.target.name] : event.target.value
      })
  }
  handleSubmit = event => {
    event.preventDefault();
    const newUserData = {
      email : this.state.email,
      password : this.state.password,
      confirmPassword : this.state.confirmPassword,
      handle : this.state.handle
    }
    this.props.signupUser(newUserData, this.props.history);
  }
  
  render() {
    const {classes, UI: {loading}} = this.props;
    const {errors} = this.state
    return (
      <Grid container className = {classes.form}>
          <Grid item sm />
          <Grid item sm = {6} xs = {12} className = {classes.boxTitle}>
              <img src = {AppIcon} alt = "monkey-icon" className = {classes.image} />
              <Typography variant = "h2" className = {classes.pageTitle}>Sign up</Typography>
              <form noValidate onSubmit = {this.handleSubmit}>
                  <TextField id="email" name="email" type="email" label="Email" className = {classes.textField}
                    value= {this.state.email} onChange = {this.handleChange} helperText = {errors.email}
                    error = {errors.email ? true : false } fullWidth/>
                  <TextField id="password" name="password" type="password" label="Password" className = {classes.textField}
                    value= {this.state.password} onChange = {this.handleChange}  helperText = {errors.password} 
                    error = {errors.password ? true : false } fullWidth/>
                  <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" className = {classes.textField}
                    value= {this.state.confirmPassword} onChange = {this.handleChange}  helperText = {errors.confirmPassword} 
                    error = {errors.confirmPassword ? true : false } fullWidth />
                  <TextField id="handle" name="handle" type="text" label="Handle" className = {classes.textField}
                    value= {this.state.handle} onChange = {this.handleChange}  helperText = {errors.handle} 
                    error = {errors.handle ? true : false } fullWidth/>
                  {errors.general && (
                    <Typography variant="body2" className={classes.customError}>
                      {errors.general}
                    </Typography>
                  )}
                  <Button type= "submit" variant = "contained" color = "primary" className = {classes.button}
                    disabled = {loading}>Signup
                    {loading && (
                      <CircularProgress className = {classes.progress} size = {30} />
                    )}
                  </Button>
                  <br/>
                  <small>Already have an account ? sign in <Link to='/login'>here</Link></small>
              </form>
          </Grid>
          <Grid item sm  />
      </Grid>
    );
  }
}

Signup.propTypes = {
  classes : PropTypes.object.isRequired,
  signupUser : PropTypes.func.isRequired,
  user : PropTypes.object.isRequired,
  UI : PropTypes.object.isRequired,
  logoutUser : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user : state.user,
  UI : state.UI
});

const mapActionsToProps = {
  signupUser
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup));