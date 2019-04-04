import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import lodash from 'lodash';
import * as notificationActions from 'redux/modules/notification';
import { getErrorMessage, watchForError } from 'utils/errorParse';
// import DashboardCharts from './DashboardCharts';
import Permissions from 'react-redux-permissions';

import { Link } from 'react-router-dom';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    const promises = [
    ];
    return Promise.all(promises);
  }
}])
@connect(
  state => (
    {
      user: state.auth.user,
      error: state.dashboard.error,
      errorMessage: state.dashboard.errorMessage,
      isError: state.dashboard.isError,
    }),
  {
    ...notificationActions
  })

export default class Home extends Component {
  static propTypes = {
    user: PropTypes.object,
    clearError: PropTypes.func,
  };

  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {
    watchForError(this.props, nextProps, 'Home');
    this.props.clearError();
  }

  render() {
    require('./Home.scss');

    const { user } = this.props;
    // require the logo image both from client and server
    return (
      <section className="section section-content">
        {!user &&
          <div className="container">
            <h2>Please <Link to="/auth/login">login</Link> or <Link to="/register">register</Link></h2>
          </div>
        }
        <div className="container">
          <h2>Animation Maker Easy</h2>
          <div className="container">
            <p>Create new animation</p>
            <p><img src="https://speed.animaker.com/assets/images/landing/features/library_image.png" width="100%"/></p>
          </div>
        </div>
      </section>
    );
  }
}
