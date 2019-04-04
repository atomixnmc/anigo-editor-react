import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import lodash from 'lodash';

import './ClipTimeline.scss';

const keys = [
  { id: 'f1', time: 2},
  { id: 'f2', time: 3},
]
export default class ClipTimeline extends React.Component {
  static propTypes = {
    user: PropTypes.object
  };
  render() {
    return (
      <div style={{ width: '100%', height: '100%'}}>
        <div style={{ width: '100%', height: '80px'}}>
          <div style={{ width: '30%', height: '80px', float: 'left'}}>
            <span>Clip Timeline</span>
            <div>
              <span className="btn btn-sm"><i className="fa fa-save"/></span>
              <span className="btn btn-sm"><i className="fa fa-copy"/></span>
              <span className="btn btn-sm"><i className="fa fa-chain"/></span>
            </div>
            <div>
              <span className="btn btn-sm"><i className="fa fa-step-backward"/></span>
              <span className="btn btn-sm"><i className="fa fa-play"/></span>
              <span className="btn btn-sm"><i className="fa fa-step-forward"/></span>
              <span className="btn btn-sm"><i className="fa fa-circle"/></span>
              <span className="btn btn-sm"><i className="fa fa-repeat"/></span>
              <input type="range" min="1" max="600" step="1" style={{width: '70px'}}></input>
            </div>
          </div>
          <div style={{ width: '70%', height: '80px', float: 'left'}}>

          </div>
        </div>
        <div style={{clear: 'both', height: '1px', backgroundColor: '#111'}}></div>
        <div className="smallScroll" style={{ width: '100%', height: '100%',  overflow: 'scroll'}}>
          <div style={{ width: '30%', height: '100%', float: 'left'}}>
            <div style={{ width: '200px'}}></div>
          </div>
          <div style={{ width: '70%', height: '100%', float: 'left'}}>
            <svg>
              <symbol id="keyframe" viewBox="-6 -6 6 6">
                <path d="M 0 -6 L 6 0 L 0 6 L -6 0 Z"></path>
              </symbol>
              {keys.map(key=>(
                <use xlinkHref="#keyframe" key={key.id} class="keyframe" y={20} x={key.time * 20}/>
              ))}
            </svg>
          </div>
        </div>
      </div>
      
    );
  }
}
