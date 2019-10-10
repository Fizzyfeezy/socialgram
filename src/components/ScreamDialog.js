import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
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
    },
    profileImage : {
        maxWidth : 200,
        height : 200,
        borderRadius : '50%',
        objectFit : 'cover'
    },
    dialogContent : {
        padding : 20
    },
    closeButton : {
        position : 'absolute',
        left : '90%'
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
        userImage,
        body,
        createdAt,
        userHandle,
        // screamId,
        // likeCount,
        // commentCount
      }} = this.props;
      const dialogMarkup = loading ? (
          <CircularProgress size = {200}/>
      ) : (
          <Grid container spacing = {6}>
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
