import React, { Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import {submitComment} from '../../redux/actions/dataAction';

const styles = (theme) => ({
    ...theme.spreadThis,
    commentImage : {
        maxWidth : '100%',
        height : 100,
        borderRadius : '50%',
        objectFit : 'cover'
    },
    commentData : {
        marginLeft : 20
    },
    textField : {
        width : 550
      },
    button : {
    margin : '20px auto 10px auto',
    width : 100,
    position : 'relative'
    },
    progressSpinner : {
        position : 'absolute'
    }
});

class CommentForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
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
                body : ''
            });
        }
      }
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const submitCommentBody = {
            body : this.state.body
        }
        this.props.submitComment(this.props.screamId, submitCommentBody);
    }
    
  render() {
      const {classes, authenticated, UI : {loading}} = this.props;
      const {errors} = this.state
      const commentFormMarkup = authenticated ? (
          <Grid item sm = {12} style = {{textAlign : 'center'}}>
                <form onSubmit = {this.handleSubmit}>
                    <TextField
                    name = "body" 
                    type = "text" 
                    label = "Comment on scream" 
                    error = {errors.comment ? true : false}
                    helperText = {errors.comment}
                    value={this.state.body}
                    onChange={this.handleChange}
                    fullWidth 
                    className  = {classes.textField}
                    />
                    <Button type= "submit" variant = "contained" color = "primary" className = {classes.button}
                        disabled = {loading}>Submit
                        {loading && (
                        <CircularProgress className = {classes.progressSpinner} size = {30} />
                        )}
                    </Button>
                </form>
                <hr className = {classes.visibleSeparator} />
          </Grid>
      ) : null
    return (
      commentFormMarkup
    );
  }
}

CommentForm.propTypes = {
    classes : PropTypes.object.isRequired,
    submitComment : PropTypes.func.isRequired,
    UI : PropTypes.object.isRequired,
    screamId : PropTypes.string.isRequired,
    authenticated : PropTypes.bool.isRequired
}

const mapActionsToProps = {
    submitComment
}
const mapStateToProps = (state) => ({
    UI : state.UI,
    authenticated : state.user.authenticated
})

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm));
