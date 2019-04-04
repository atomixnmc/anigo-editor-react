import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as widgetActions from 'redux/modules/user/user-profile';
import {connect} from 'react-redux';

@connect(
  state => ({
  }),
  {...widgetActions})
export default class UserRoleAssign extends Component {
  static propTypes = {
  }

  componentWillMount() {
  }

  render() {
    const {} = this.props;
    return (
          <div className={'container'}>
          </div>
      );
  }
}
