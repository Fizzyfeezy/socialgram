import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

const styles = {
    card : {
        display: 'flex',
        marginBottom : 20
    },
    image : {
        minWidth : 200
    },
    content : {
        padding: 25
    }
}

class Scream extends Component {
  render() {
      const {classes, scream : {
          body,
          createdAt,
          userImage,
          userHandle,
          screamId,
          likeCount,
          commentCount
      }} = this.props
    return (
        <Card className = {classes.card}>
            <CardMedia image = {userImage} className = {classes.image} title = "profile image"/>
            <CardContent className = {classes.content}>
                <Typography variant = "h5" component = {Link} to = {`/users/${userHandle}`} color = "primary">{userHandle}</Typography>
                <Typography variant = "body2" color = "textSecondary"></Typography>
                <Typography variant = "body1" color = "textSecondary">{body}</Typography>
            </CardContent>
        </Card>
    );
  }
}

export default withStyles(styles)(Scream);