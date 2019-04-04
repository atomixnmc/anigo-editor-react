import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import { ClipViewRow } from 'components';

import * as notificationActions from 'redux/modules/notification';

export default class ClipList extends Component {
  static propTypes = {
    listClip: PropTypes.array
  };

  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { listClip } = this.props;
    return (
        <div>
          {listClip && listClip.map(jd=>
            <ClipViewRow key={jd._id} project={jd} />
          )}
        </div>
    );
  }
}
