import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import MyButton from '../../util/MyButton';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import {postScream, clearErrors} from '../../redux/actions/dataAction';


const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton : {
        position : 'relative',
        float : 'right',
        marginTop : 20
    },
    progressSpinner : {
        position : 'absolute'
    },
    closeButton : {
        position : 'absolute',
        left : '91%',
        top : '6%'
    },
    textField : {
        width : 550
      },
})

class PostScream extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         open: false,
         body : '',
         errors : {}
      }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if (nextProps.UI.errors) {
          this.setState({
            errors : nextProps.UI.errors
          });
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({
                body : '',
                open : false,
                errors: {}
            });
        }
      }
    handleOpen = () => {
        this.setState({
            open : true
        })
    }
    handleClose = () => {
        this.setState({
            open : false,
            errors : {}
        });
        this.props.clearErrors();
    }
    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const newScream = {
            body : this.state.body
        }
        this.props.postScream(newScream);
    }
    
  render() {
      const {classes, UI : {loading}} = this.props;
      const {errors} = this.state;
    return (
      <Fragment>
        <MyButton tip="Post a Scream" onClick = {this.handleOpen}>
            <AddIcon />
        </MyButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth = "sm">
            <MyButton tip="Close" onClick = {this.handleClose} tipClassName = {classes.closeButton}>
                <CloseIcon />
            </MyButton>
            <DialogTitle id="form-dialog-title">Post a new scream</DialogTitle>
            <DialogContent>
                <form onSubmit = {this.handleSubmit}>
                    <TextField
                        name="body"
                        margin="dense"
                        id="name"
                        row="3"
                        multiline
                        label="SCREAM!!"
                        placeholder="A short body about yourself"
                        type="text"
                        error = {errors.body ? true : false }
                        helperText={errors.body}
                        className={classes.textField}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <Button type= "submit" variant = "contained" color = "primary" className = {classes.submitButton}
                        disabled = {loading}>Submit
                        {loading && (
                        <CircularProgress className = {classes.progressSpinner} size = {30} />
                        )}
                    </Button>
                </form>
            </DialogContent> 
        </Dialog>
      </Fragment>
    );
  }
}
PostScream.propTypes = {
    classes : PropTypes.object.isRequired,
    postScream : PropTypes.func.isRequired,
    clearErrors : PropTypes.func.isRequired,
    UI : PropTypes.object.isRequired
}

const mapActionsToProps = {
    postScream,
    clearErrors
}
const mapStateToProps = (state) => ({
    UI : state.UI
})

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostScream));
