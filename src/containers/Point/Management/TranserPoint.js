import React from 'react';

import { connect } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import { ClipViewRow, ClipList } from 'components';

import * as notificationActions from 'redux/modules/notification';
// import * as clipManageActions from 'redux/modules/clip/clip-manage';

import './AdminDashboard.scss';

export default class AdminDashboard extends React.Component {
  render() {
    return (
        <div>
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12 gutter">
            <div className="sales">
              <h2>Balance : <span id="user_balance"> 0 </span></h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12 gutter">
            <h2>
              Transfer point
            </h2>
            <div>
              <span>To </span>
              <input id="receiver_username" defaultValue /><span> value </span>
              <input id="transfer_value" defaultValue={0} /><span>$</span>
              <button className="btn btn-default">
                <span>Transfer</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}