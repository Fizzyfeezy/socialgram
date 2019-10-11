import React, { Component } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MyButton from '../util/MyButton';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {likeScream, unlikeScream} from '../redux/actions/dataAction';

class LikeButton extends Component {
    likedScream = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId)){
            return true
        } else {
            return false
        }
    }
    likeScream = () => {
        this.props.likeScream(this.props.screamId)
    }
    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId)
    }

  render() {
    const { user : {authenticated}} = this.props
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
    return (
      likeButton
    );
  }
}
LikeButton.propTypes = {
    user : PropTypes.object.isRequired,
    likeScream : PropTypes.func.isRequired,
    unlikeScream : PropTypes.func.isRequired,
    screamId : PropTypes.string.isRequired,
  }
  
  const mapStateToProps = (state) => ({
    user : state.user
  })
  
  const mapActionsToProps = {
    likeScream,
    unlikeScream
  }
  
export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
