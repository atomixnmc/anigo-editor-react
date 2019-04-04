import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import lodash from 'lodash';

export default class ClipObjectNodeTree extends React.Component {
  static propTypes = {
    user: PropTypes.object
  };
  render() {
    return (
      <h1>Clip ObjectNodeTree</h1>
    );
  }
}
