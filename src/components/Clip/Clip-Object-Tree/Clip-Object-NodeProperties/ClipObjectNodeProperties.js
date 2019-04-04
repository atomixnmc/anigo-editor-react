import 'react-dat-gui/build/react-dat-gui.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import lodash from 'lodash';

import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui';
import { relative } from 'path';

export default class ClipObjetNodeProperties extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
        package: 'react-dat-gui',
        power: 9000,
        isAwesome: true,
        feelsLike: '#2FA1D6',
      }
    }

  }

  handleUpdate = data => this.setState({ data })

  render() {
    const { data } = this.state;

    return (
      <DatGui data={data} onUpdate={this.handleUpdate} style={{position: 'relative', paddingLeft: '15px'}}>
        <DatString path='package' label='Package' />
        <DatNumber path='power' label='Power' min={9000} max={9999} step={1} />
        <DatBoolean path='isAwesome' label='Awesome?' />
        <DatColor path='feelsLike' label='Feels Like' />
      </DatGui>
    )
  }
}
