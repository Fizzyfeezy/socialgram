import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {deleteScream} from '../redux/actions/dataAction';

const styles = {
    deleteButton : {
        position : 'absolute',
        left : '80%'
    }
};

class DeleteScream extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         open : false
      }
    }
    

    handleOpen = () => {
        this.setState({
            open : true
        })
    }
    handleOpen = () => {
        this.setState({
            open : false
        })
    }
    handleDelete = () => {
        this.props.deleteScream(this.props.screamId);
        this.setState({
            open : false
        })
    }
    
  render() {
      const {classes} = this.props;
    return (
      <Fragment>
          <MyButton tip = "Delete scream" onClick = {this.handleOpen}
            btnClassName = {classes.deleteButton}>
                <DeleteOutline color = "secondary" />
          </MyButton>
          <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth = "sm">
            <DialogTitle id="form-dialog-title">Are you sure you want to delete the scream ?</DialogTitle>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleDelete} color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
DeleteScream.propTypes = {
    classes : PropTypes.object.isRequired,
    data : PropTypes.object.isRequired,
    deleteScream : PropTypes.func.isRequired,
    screamId : PropTypes.string.isRequired,
}

const mapActionsToProps = {
    deleteScream
}

export default connect(null, mapActionsToProps)(withStyles(styles)(DeleteScream));
