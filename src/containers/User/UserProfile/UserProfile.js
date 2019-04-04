import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as userProfiletActions from 'redux/modules/user/user-profile';
import {connect} from 'react-redux';
import { UserProfileFormEdit } from 'components';

@connect(
  state => ({
    userInfo: state.auth.user
  }),
  {
    ...userProfiletActions
  })

export default class UserProfile extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
  }

  componentWillMount() {
  }

  render() {
    const styles = require('./UserProfile.scss');
    const { userInfo} = this.props;
    return (
        userInfo ?
          <div className={styles.loginPage + ' container'}>
          <h3>User {userInfo.username} <a className="small" href="/changePassword">Change password</a></h3>
          <div>
            <UserProfileFormEdit initialValues = {userInfo} userEntry = {userInfo} />
          </div>
        </div>
        :
        <div className="container">
          <h4>No User info</h4>
        </div>
      );
  }
}
