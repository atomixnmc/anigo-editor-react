import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import { ClipViewRow, ClipList } from 'components';

import * as notificationActions from 'redux/modules/notification';
import * as authActions from 'redux/modules/auth';
// import * as clipManageActions from 'redux/modules/clip/clip-manage';

@connect(
  state => ({
    user: state.auth.user,
    userPermissions: state.permissions
  }),
  {
    ...authActions
  })
export default class ManagementRecruit extends Component {
  static propTypes = {
    user: PropTypes.object
  }
  render() {
    const { user } = this.props;
    return (
      <div className="">
        <h3>Recruit</h3>
        <div>
          <a href="/admin/recruit/jobs" className="btn btn-default">Jobs List</a>
          <a href="/admin/recruit/clips" className="btn btn-default">Clips List</a>
          <a href="/admin/recruit/categories" className="btn btn-default">Categories</a>
          <a href="/admin/recruit/skills" className="btn btn-default">Skills</a>
          <a href="/admin/recruit/positions" className="btn btn-default">Positions</a>
        </div>
        <hr/>
        <div></div>
      </div>
    );
  }
}
