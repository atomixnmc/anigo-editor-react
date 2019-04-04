import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import { ClipViewRow, ClipList } from 'components';

import * as notificationActions from 'redux/modules/notification';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({
    user: state.auth.user,
    userPermissions: state.permissions
  }),
  {
    ...authActions
  })
export default class RecruitLayout extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    user: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object
  };
  render() {
    return (
        <Route exact path="/" component={ManagementRecruit} />
        <Route path="jobs" component={ManagementJobList}/>
        <Route path="jobs/create" component={ManagementCreateProject}/>
        <Route path="jobs/:jobId/view" component={ManagementViewProject}/>
        <Route path="clips" component={ManagementClipList}/>
        <Route path="clips/:clipId/view" component={ReviewClip}/>
        );
      }
    }
    