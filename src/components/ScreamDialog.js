import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {connect} from 'react-redux';
import MyButton from '../util/MyButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {getScream} from '../redux/actions/dataAction';
import Grid from '@material-ui/core/Grid';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

const styles  = theme => ({
    ...theme.spreadThis,
    invisibleSeparator : {
        border : 'none',
        margin : 4
    }
})

class ScreamDialog extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         open : false
      }
    }
    handleOpen = () => {
        this.setState({
            open : true
        });
        this.props.getScream(this.props.screamId);
    }
    handleClose = () => {
        this.setState({
            open : false,
        });
    }
    
  render() {
      const {classes, UI : {loading}, scream : {
          screamId, body, createdAt, likeCount, commentCount,
          userImage, userHandle
      }} = this.props;
      const dialogMarkup = loading ? (
          <CircularProgress size = {200}/>
      ) : (
          <Grid container spacing = {16}>
            <Grid item sm={5}>
                <img src={userImage} alt="Profile" className = {classes.profileImage} />
            </Grid>
            <Grid item sm={7}>
                <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>@{userHandle}</Typography>
                <hr className = {classes.invisibleSeparator} />
                <Typography color="textSecondary" variant="body2">{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}</Typography>
                <hr className = {classes.invisibleSeparator} />
                <Typography variant="body1">{body}</Typography>
            </Grid>
          </Grid>
      )
    return (
      <Fragment>
        <MyButton tip="Expand scream" onClick = {this.handleOpen} tipClassName = {classes.expandButton}>
            <UnfoldMore color = "primary" />
        </MyButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth = "sm">
            <MyButton tip="Close" onClick = {this.handleClose} tipClassName = {classes.closeButton}>
                <CloseIcon color = "primary" />
            </MyButton>
            <DialogTitle id="form-dialog-title">Post a new scream</DialogTitle>
            <DialogContent className = {classes.dialogContent}>
                {dialogMarkup}
            </DialogContent> 
        </Dialog>
      </Fragment>
    );
  }
}
ScreamDialog.propTypes = {
    classes : PropTypes.object.isRequired,
    scream : PropTypes.object.isRequired,
    getScream : PropTypes.func.isRequired,
    UI : PropTypes.object.isRequired,
    userHandle : PropTypes.string.isRequired,
    screamId : PropTypes.string.isRequired
}

const mapActionsToProps = {
    getScream
}
const mapStateToProps = (state) => ({
    UI : state.UI,
    scream : state.data.scream
})

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));
