import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import { Route, Switch } from 'react-router-dom';

import * as notificationActions from 'redux/modules/notification';
import * as authActions from 'redux/modules/auth';

import { Home, About, Login, LoginSuccess, ChangePassword, Register } from 'containers';
import { FrontCreateClip } from 'containers';
// import { ClipViewRow, ClipList } from 'components';
// import { WidgetCategoryStats } from 'components';

export default @connect(
  state => ({
    user: state.auth.user,
    userPermissions: state.permissions
  }),
  {
    ...authActions
  })
class FrontPageLayout extends React.Component {
  static propTypes = {
    user: PropTypes.object
  };
  render() {
    return (
      <div>
        { /* Home (main) route */ }
        <Switch>
          <Route exact path="/" component={Home}/>
          { /* Routes requiring login */ }
          {/* <Route onEnter={requireLogin}>
            <Route path="loginSuccess" component={LoginSuccess}/>
          </Route> */}

          { /* Routes */ }
          <Route path="/about" component={About}/>
          <Route path="/auth/login" component={Login}/>
          <Route path="/auth/changePassword" component={ChangePassword}/>
          <Route path="/auth/register" component={Register}/>
          {/* <Route path="/auth/user-profile" component={UserProfile}/> */}

          {/* <Route path="/projects" component={FrontProjectList}/>
          <Route path="/projects/create" component={FrontCreateProject}/>
          <Route path="/projects/:jobId/view" component={FrontViewProject}/>
          <Route path="/projects/:jobId/apply" component={FrontApplyJob}/>
          <Route path="/projects/:jobId/sendclip" component={FrontSendClip}/>*/}
          <Route path="/clips/create" component={FrontCreateClip}/>
          {/* <Route path="/clips" component={FrontClipList}/>
          <Route path="/clips/:clipId/view" component={FrontViewClip}/> */}
        </Switch>
      </div>
    );
  }
}
