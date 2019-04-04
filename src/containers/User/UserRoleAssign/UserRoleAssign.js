import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as widgetActions from 'redux/modules/user/user-profile';
import {connect} from 'react-redux';

@connect(
  state => ({
    userKey: state.profile.userKey,
  }),
  {...widgetActions})
export default class UserProfile extends Component {
  static propTypes = {
    genAPIKey: PropTypes.func,
    getAPIKey: PropTypes.func,
    userKey: PropTypes.strings,
  }

  componentWillMount() {
    this.props.getAPIKey();
  }

  render() {
    // const styles = require('./UserRoleAssign.scss');
    const {userKey} = this.props;
    return (
          <div className={'container'}>
            <h3>API Interface</h3>
              {userKey &&
            <div>
              <p>Personal API access key = {userKey}</p>
              </div>}
              <div>
                  <button className="btn btn-success" onClick={this.props.genAPIKey}><i className="fa fa-sign-in"/>Generate a new key</button>
              </div>
          </div>
      );
  }
}
