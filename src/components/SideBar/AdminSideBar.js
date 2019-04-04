import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';

import * as notificationActions from 'redux/modules/notification';
import * as authActions from 'redux/modules/auth';

import './AdminSideBar.scss';

@connect(
  state => ({
    user: state.auth.user,
    userPermissions: state.permissions
  }),
  {
    ...authActions
  })
export default class AdminSideBar extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    user: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object
  };
  render() {
    return (
      <div className="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box admin-sidebar" style={{position: 'fixed'}}>
        <div className="logo">
          <a href="/">
            <img className="img-circle" src="http://placehold.it/120x120&text=Admin" alt="LOGO" />
          </a>
        </div>
        <div className="navi">
          <ul>
            <li className="active"><a href="/admin"><i className="glyphicon glyphicon-home" aria-hidden="true" /><span className="hidden-xs hidden-sm">Dashboard</span></a></li>
            <li><a href="/admin/recruit"><i className="glyphicon glyphicon-tasks" aria-hidden="true" /><span className="hidden-xs hidden-sm">Recruit</span></a></li>
            {/* <li><a href="/admin/statistic"><i className="glyphicon glyphicon-signal" aria-hidden="true" /><span className="hidden-xs hidden-sm">Statistics</span></a></li> */}
            {/* <li><a href="/admin/calendar"><i className="glyphicon glyphicon-calendar" aria-hidden="true" /><span className="hidden-xs hidden-sm">Calendar</span></a></li> */}
            <li><a href="/admin/user-manage"><i className="glyphicon glyphicon-user" aria-hidden="true" /><span className="hidden-xs hidden-sm">Users</span></a></li>
            <li><a href="/admin/system-manage"><i className="glyphicon glyphicon-cog" aria-hidden="true" /><span className="hidden-xs hidden-sm">Setting</span></a></li>
          </ul>
        </div>
      </div>
    );
  }
}
