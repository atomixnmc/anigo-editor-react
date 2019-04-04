import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as adminSystemManageActions from 'redux/modules/admin/admin-system-manage';
import * as userManageActions from 'redux/modules/user/user-manage';
import {connect} from 'react-redux';
import config from 'config';

@connect(
  state => ({
    userKey: state.adminSystemManage.userKey,
    systemConfig: state.adminSystemManage.systemConfig,
    userStatistic: state.userManage.userStatistic,
  }),
  {
    ...adminSystemManageActions,
    loadUserStatistic: userManageActions.loadUserStatistic
  })
export default class AdminSystemManage extends Component {
  static propTypes = {
    genAPIKey: PropTypes.func,
    getAPIKey: PropTypes.func,
    getSystemConfig: PropTypes.func,
    loadUserStatistic: PropTypes.func,
    userKey: PropTypes.string,
    systemConfig: PropTypes.object,
    userStatistic: PropTypes.object
  }

  componentWillMount() {
    this.props.getAPIKey();
    this.props.getSystemConfig();
    this.props.loadUserStatistic();
  }

  render() {
    // const styles = require('./UserRoleAssign.scss');
    const {userKey, systemConfig, userStatistic} = this.props;
    return (
      <div>
        <div className="section">
          <h3>System</h3>
          <div>
            <p>API Server path: <b>{'http://' + config.apiHost + ':' + config.apiPort}</b></p>
          </div>
          {/* <div>
              <a className="btn btn-default" href=""><i className="fa fa-sign-in"/>Change Server</a>
          </div> */}
          <h3>API Interface</h3>
          {userKey &&
          <div>
            <p>API access key: <b>{userKey}</b></p>
          </div>}
          <div>
              <button className="btn btn-success" onClick={this.props.genAPIKey}><i className="fa fa-sign-in"/>Generate a new key</button>
          </div>
        </div>
        <div className="section">
          <h3>Database</h3>
          <div>
            <p>Uri: <b>{systemConfig.dataSource}</b></p>
          </div>
        </div>
        <div className="section">
          <h3>Timezone</h3>
          <div>
            <p>Current Timezone: <b>{systemConfig.timeZone}</b></p>
          </div>
          {/* <div>
              <a className="btn btn-default btn-disabled"><i className="fa fa-sign-in"/>Change Timezone</a>
          </div> */}
        </div>
        <div className="section">
          <h3>Languages</h3>
          <div>
            <p>Current language: <b>{config.language}</b></p>
          </div>
          {/* <div>
              <a className="btn btn-default btn-disabled"><i className="fa fa-sign-in"/>Change language</a>
          </div> */}
        </div>
        <div className="section">
          <h3>Users</h3>
          <div>
            <p>Total users: <b>{userStatistic.total}</b></p>
            <p>Active users: <b>{userStatistic.active}</b></p>
            <p>Inactive users: <b>{userStatistic.inactive}</b></p>
          </div>
          <div>
              <a className="btn btn-default" href="/user-manage"><i className="fa fa-sign-in"/>User Management</a>
          </div>
        </div>
      </div>
      );
  }
}
