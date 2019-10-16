import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ChatIcon from '@material-ui/icons/Chat';
import Menu from '@material-ui/core/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import {markNotificationsRead} from '../../redux/actions/userAction';
import { IconButton } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

class Notifications extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         anchorE1 : null
      }
    }
    handleOpen = event => {
        this.setState({
            anchorE1 : event.target
        });
    }
    handleClose = () => {
        this.setState({
            anchorE1 : null
        });
    }
    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications
            .filter(not => !not.read)
            .map(not => not.notificationId);
        this.props.markNotificationsRead(unreadNotificationsIds);
    }
    

  render() {
      const notifications = this.props.notifications;
      const anchorE1 = this.state.anchorE1;

      dayjs.extend(relativeTime);

      let notificationsIcon;
      if(notifications && notifications.length > 0){
          notifications.filter(not => not.read === false).length > 0
          ? (
              notificationsIcon = (
                  <Badge badgeContent = {notifications.filter(not => not.read === false).length}
                  color = "secondary">
                      <NotificationsIcon/>
                  </Badge>
              )
          ) : (
              notificationsIcon = <NotificationsIcon />
          )
      } else {
        notificationsIcon = <NotificationsIcon />
      }
      let notificationsMarkup = 
        notifications && notifications.length > 0 ? (
            notifications.map(not => {
                const verb = not.type === 'like' ? 'liked' : 'commennted on';
                const time = dayjs(not.createdAt).fromNow();
                const iconColor = not.read ? 'primary' : 'secondary';
                const icon = not.type === 'like' ? (
                    <FavoriteIcon color={iconColor} style = {{marginRight : 10}} />
                ) : (
                    <ChatIcon color={iconColor} style = {{marginRight : 10}} />
                )

                return (
                    <MenuItem key = {not.createdAt} onClick={this.handleClose}>
                        {icon}
                        <Typography component={Link} color="primary" variant="body1"
                            to={`/users/${not.recipent}/scream/${not.screamId}`}>
                                {not.sender} {verb} your scream {time}
                            </Typography>
                    </MenuItem>
                )
            })
        ) : (
            <MenuItem onClick={this.handleClose}>
                You have no notifications yet
            </MenuItem>
        )
    return (
        <Fragment>
            <Tooltip placement="top" title="Notifications">
                <IconButton aria-owns={anchorE1 ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleOpen}>
                        {notificationsIcon}
                    </IconButton>
            </Tooltip>
            <Menu
            anchorEl={anchorE1}
            open={Boolean(anchorE1)}
            onClose={this.handleClose}
            onEntered={this.onMenuOpened}>
                {notificationsMarkup}
            </Menu>
        </Fragment>
    )
  }
}
Notifications.propTypes = {
    markNotificationsRead : PropTypes.func.isRequired,
    notifications : PropTypes.array.isRequired,
  }
  
  const mapStateToProps = (state) => ({
    notifications : state.user.notifications
  })

  const mapActionsToprops = {
      markNotificationsRead
  }
  
export default connect(mapStateToProps, mapActionsToprops)(Notifications);
