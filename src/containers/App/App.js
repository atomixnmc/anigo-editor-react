import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import * as lodash from 'lodash';
import { connect, ReactReduxContext } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import { push } from 'connected-react-router';
import NotificationSystem from 'react-notification-system';
import { Route } from 'react-router-dom';

import config from 'config';

import { add as addPermission, remove as removePermission, clear as clearPermissions } from 'react-redux-permissions';
import { isLoaded as isAuthLoaded, fetchUser, logout, extractPermissions } from 'redux/modules/auth';
import * as notificationActions from 'redux/modules/notification';
import * as authActions from 'redux/modules/auth';
import { InfoBar, Header } from 'components';
import { getErrorMessage, watchForError } from 'utils/errorParse';


import { FrontPageLayout } from 'containers';

// @asyncConnect([{
//   promise: ({store: {dispatch, getState}}) => {
//     const promises = [];
//     // if (!isInfoLoaded(getState())) {
//     //   promises.push(dispatch(loadInfo()));
//     // }
//     // if (!isAuthLoaded(getState())) {
//     //   promises.push(dispatch(fetchUser()));
//     // }

//     return Promise.all(promises);
//   }
// }])
@connect(
  state => ({
    user: state.auth.user,
    userPermissions: state.permissions,
    changePassword: state.auth.changePassword,
    notification: state.notification.notification,
    notificationId: state.notification.notificationId,
    notificationType: state.notification.notificationType
  }),
  {
    logout,
    pushState: push,
    addPermission,
    removePermission,
    clearPermissions,
    ...authActions,
    ...notificationActions
  })
export default class App extends Component {
  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.object,
    user: PropTypes.object,
    logout: PropTypes.func,
    pushState: PropTypes.func,
    addPermission: PropTypes.func,
    removePermission: PropTypes.func,
    clearPermissions: PropTypes.func,
    // extractPermissions: PropTypes.func,
    notification: PropTypes.any,
    notificationId: PropTypes.number,
    addNotification: PropTypes.func,
    closeNotification: PropTypes.func,
    clearNotification: PropTypes.func,
    notificationType: PropTypes.string,
    fetchUser: PropTypes.func,
  };

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    this.refreshUser();
  }

  componentWillReceiveProps(nextProps) {
    // FIXME: Notification system
    // watchForError(this.props, nextProps, 'App');
    if (nextProps && nextProps.notificationId > 0 && nextProps.notification) {
      // console.log('Show notification');
      this.addNotification(nextProps.notification, nextProps.notificationType);
      this.props.closeNotification();
    }    
    if (!this.props.user && nextProps.user) {
      // login
    } else if (this.props.user && !nextProps.user) {
      // logout
    }
  }   

  checkAuth() {
    const { user } = this.props;
    if (!user) {
      // oops, not logged in, so can't be here!
      replace('/');
    }
    cb();
  }

  requireLogin(nextState, replace, cb){
    checkAuth();
  }

  refreshUser() {
    let loginPromise = this.props.fetchUser();
    if (loginPromise && loginPromise.then) {
      loginPromise
      .then(userInfo=>{
        // console.log('App After fetch', userInfo);
        extractPermissions(userInfo, {
          addPermission: this.props.addPermission,
          removePermission: this.props.removePermission,
          clearPermissions: this.props.clearPermissions
        });

        // this.props.clearPermissions();
        // lodash.each(userInfo.rolePermissions, (p)=>{
        //   if (p.enable) {
        //     // console.log('add Permission', p);
        //     this.props.addPermission(p.name);
        //   }
        // });
      });
    }
    

  }

  addNotification(data, level) {
    if (data) {
      this._notificationSystem.addNotification({
        message: data,
        level: level
      });
    }
  }

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { user } = this.props;

    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Header/>
        <NotificationSystem ref="notificationSystem" />
        <div className="appContent">
          <Route path="/" component={FrontPageLayout} context={ReactReduxContext}/>
          {/* <Route path="admin" component={AdminLayout} /> */}
          {/* <Route path="*" component={NotFound} status={404} /> */}
        </div>
        <InfoBar/>
      </div>
    );
  }
}
