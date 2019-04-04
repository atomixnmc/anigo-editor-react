import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import lodash from 'lodash';

export default class ClipView2D extends React.Component {
  static propTypes = {
    user: PropTypes.object
  };
  render() {
    return (
      <div>
        <h1>Clip 2D</h1>
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50"/>
        </svg>
      </div>
    );
  }
}
