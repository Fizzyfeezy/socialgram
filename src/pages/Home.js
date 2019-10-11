import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getScreams} from '../redux/actions/dataAction';

class Home extends Component {

  // componentDidMount(){
  //   axios.get('/screams').then(res => {
  //     this.setState({
  //       screams : res.data
  //     })
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }

  componentDidMount(){
    this.props.getScreams();
  }

  render() {
    const {data : {screams, loading}} = this.props;
    let recentScreamsMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream = {scream}/>)
    ) : (<p>loading...</p>);
    return (
      <Grid container spacing = {2}>
        <Grid item sm = {8} xs = {12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm = {4 } xs = {12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}
Home.propTypes = {
  data : PropTypes.object.isRequired,
  getScreams : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  data : state.data
})

const mapActionsToProps = {
  getScreams
}

export default connect(mapStateToProps, mapActionsToProps)(Home);
