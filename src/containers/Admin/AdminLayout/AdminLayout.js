import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import { Route } from 'react-router';
import * as notificationActions from 'redux/modules/notification';
import * as authActions from 'redux/modules/auth';
// import * as clipManageActions from 'redux/modules/clip/clip-manage';

import { WidgetCategoryStats, AdminSideBar, AdminHeader } from 'components';
import './AdminLayout.scss';

@connect(
  state => ({
    user: state.auth.user,
    userPermissions: state.permissions
  }),
  {
    ...authActions
  })
export default class AdminLayout extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    user: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object
  };
  render() {
    return (
      <div className="display-table">
        <div className="row display-table-row">
          <AdminSideBar />
          <div className="col-md-offset-2 col-md-10 display-table-cell v-align">
            <AdminHeader />
            <div className="user-dashboard">
            <Route exact path="/" component={AdminDashboard}/>
            {/* Admin pages */}
            <Permissions allowed={['Settings_List']}>
            <Route path="system-manage" component={AdminSystemManage}/>
            </Permissions>
            {/* <Permissions allowed={['Report_List']}>
            <Route path="report" component={Report}/>
            </Permissions> */}

            
            </div>
          </div>
        </div>
      </div>
    );
  }
}
