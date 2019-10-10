import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {likeScream, unlikeScream} from '../redux/actions/dataAction';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MyButton from '../util/MyButton';
import DeleteScream from './DeleteScream';

const styles = {
    card : {
        position : 'relative',
        display: 'flex',
        marginBottom : 20
    },
    image : {
        minWidth : 200,
        objectFit : 'cover'
    },
    content : {
        padding: 25
    }
}

class Scream extends Component {

    likedScream = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId)){
            return true
        } else {
            return false
        }
    }
    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId)
    }
    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId)
    }

  render() {
      dayjs.extend(relativeTime)
      const {classes, scream : {
          body,
          createdAt,
          userImage,
          userHandle,
          screamId,
          likeCount,
          commentCount
      }, user : {authenticated, credentials : {
          handle
      }}} = this.props

      const likeButton = !authenticated ? (
          <MyButton tip = "like">
            <Link to = '/login'>
                <FavoriteBorderIcon color = "primary" />
            </Link>
          </MyButton>
      ) : (
          this.likedScream() ? (
              <MyButton tip = "Undo like" onClick = {this.unlikeScream}>
                <FavoriteIcon color = "primary" />
              </MyButton>
          ) : (
            <MyButton tip = "Like" onClick = {this.likeScream}>
                <FavoriteBorderIcon color = "primary" />
            </MyButton>
          )
      );

    const deleteButton = authenticated && userHandle === handle ? (
        <DeleteScream  screamId = {screamId}/>
    ) : null
    return (
        <Card className = {classes.card}>
            <CardMedia image = {userImage} className = {classes.image} title = "profile image"/>
            <CardContent className = {classes.content}>
                <Typography variant = "h5" component = {Link} to = {`/users/${userHandle}`} color = "primary">{userHandle}</Typography>
                {deleteButton}
                <Typography variant = "body2" color = "textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant = "body1" color = "textSecondary">{body}</Typography>
                {likeButton}
                <span>{likeCount} likes</span>
                <MyButton tip = "comments">
                    <ChatIcon color = "primary" />
                </MyButton>
                <span>{commentCount} comments</span>
            </CardContent>
        </Card>
    );
  }
}
Scream.propTypes = {
    user : PropTypes.object.isRequired,
    likeScream : PropTypes.func.isRequired,
    unlikeScream : PropTypes.func.isRequired,
    scream : PropTypes.object.isRequired,
    classes : PropTypes.object.isRequired,
  }
  
  const mapStateToProps = (state) => ({
    user : state.user
  })
  
  const mapActionsToProps = {
    likeScream,
    unlikeScream
  }
  
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));