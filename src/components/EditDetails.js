import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import {editUserDetails} from '../redux/actions/userAction';
import MyButton from '../util/MyButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
    ...theme.spreadThis,
    button : {
        float : 'right'
    },
    textField : {
        width : 550
      },
})
export class EditDetails extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         bio : '',
         website : '',
         location : '',
         open : false
      }
    }
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio : credentials.bio ? credentials.bio : '',
            website : credentials.website ? credentials.website : '',
            location : credentials.location ? credentials.location : '',
        })
    }
    componentDidMount(){
        const {credentials} = this.props;
        this.mapUserDetailsToState(credentials);
    }
    handleOpen = () => {
        this.setState({
            open : true
        });
        this.mapUserDetailsToState(this.props.credentials);
    }
    handleClose = () => {
        this.setState({
            open : false
        });
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const userDetails = {
            bio : this.state.bio,
            website : this.state.website,
            location : this.state.location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }
    
  render() {
    const {classes} = this.props;
    return (
      <Fragment>
          <MyButton tip="Edit details" placement = "top" onClick = {this.handleOpen} btnClassName = {classes.button} >
            <EditIcon color = 'primary' />
          </MyButton>
          <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth = "sm">
            <DialogTitle id="form-dialog-title">Edit your details</DialogTitle>
            <DialogContent>
                <form>
                    <TextField
                        name="bio"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Bio"
                        placeholder="A short bio about yourself"
                        type="text"
                        className={classes.textField}
                        value={this.state.bio}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        name="website"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Website"
                        placeholder="Your personal/professional website"
                        type="text"
                        className={classes.textField}
                        value={this.state.website}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        name="location"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="location"
                        placeholder="Where you live"
                        type="text"
                        className={classes.textField}
                        value={this.state.location}
                        onChange={this.handleChange}
                        fullWidth
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
    classes : PropTypes.object.isRequired,
    editUserDetails : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    credentials : state.user.credentials
})
const mapActionsToprops = {
    editUserDetails
}

export default connect(mapStateToProps, mapActionsToprops)(withStyles(styles)(EditDetails));