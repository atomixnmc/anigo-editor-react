import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import { ClipViewRow, ClipList } from 'components';

import * as notificationActions from 'redux/modules/notification';
import * as authActions from 'redux/modules/auth';
// import * as clipManageActions from 'redux/modules/clip/clip-manage';

import {WidgetCategoryStats} from 'components';
import './AdminDashboard.scss';

@connect(
  state => ({
    user: state.auth.user,
    userPermissions: state.permissions
  }),
  {
    ...authActions
  })
export default class AdminDashboard extends Component {
  static propTypes = {
    user: PropTypes.object
  }
  render() {
    const { user } = this.props;
    return (
      <div className="user-dashboard">
        { user && <h1>Hello, <b><span id="user_username">{user.username}</span></b></h1>}
        <div className="row">
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3 col-xl-3" >
            <WidgetCategoryStats value={10} text="New Clip" bgColor={'#a5ddf7'}/>
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3" >
            <WidgetCategoryStats value={10} text="New Jobs" bgColor={'#a5ddf7'} />
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3" >
            <WidgetCategoryStats value={10} text="New Users" bgColor={'#a5ddf7'} />
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3" >
            <WidgetCategoryStats value={10} text="New Notifications" bgColor={'#a5ddf7'} />
          </div>
        </div>
      </div>
    );
  }
}
