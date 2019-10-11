import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../components/scream/Scream';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import {getUserData} from '../redux/actions/dataAction';
import StaticProfile from '../components/profile/StaticProfile';

class User extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         profile : null
      }
    }
    
    componentDidMount(){
        const handle = this.props.match.params.handle;
        this.props.getUserData(handle);
        axios.get(`/user/${handle}`).then(res => {
            this.setState({
                profile : res.data.user
            })
        }).catch(err => {
            console.log(err);
        })
    }
  render() {
      const {data : {screams, loading} } = this.props;
      const screamsMarkup = loading ? (
          <p>Loading data ...</p>
      ) : (
          screams === null ? (
              <p>No scream for this user</p>
          ) : (
              screams.map(scream => {
                return (
                    <Scream key = {scream.screamId} scream= {scream} />
                )
              })
          )
      )
    return (
      <Grid container spacing = {6}>
          <Grid item sm={8} xs = {12}>
              {screamsMarkup}
          </Grid>
          <Grid item sm={4} xs = {12}>
              {this.state.profile === null ? (
                  <p>Loading profile...</p>
              ) : (
                <StaticProfile profile = {this.state.profile}/>
              )}
          </Grid>
      </Grid>
    );
  }
}
User.propTypes = {
    getUserData : PropTypes.func.isRequired,
    data : PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    data : state.data
});

const mapActionsToProps = {
    getUserData
}

export default connect(mapStateToProps, mapActionsToProps)(User);
