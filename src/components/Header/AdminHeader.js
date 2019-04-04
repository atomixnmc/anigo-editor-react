import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';

import * as notificationActions from 'redux/modules/notification';
import * as authActions from 'redux/modules/auth';

import './AdminHeader.scss';

@connect(
  state => ({
    user: state.auth.user,
    userPermissions: state.permissions
  }),
  {
    ...authActions
  })
export default class AdminHeader extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    user: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object
  };
  render() {
    return (
      <div className="row admin-header" style={{marginTop: '8px'}}>
        <div className="col-md-7">
          <nav className="navbar-default pull-left">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="offcanvas" data-target="#side-menu" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            </div>
          </nav>
          <div className="search col-md-5">
            <input type="text" placeholder="Search" id="search" />
          </div>
        </div>
        <div className="col-md-5">
          <div className="header-rightside">
            <ul className="list-inline header-top pull-right">
              <li className="hidden-xs">
                {/* <a href="#" className="btn-round">Add Project</a> */}
              </li>
              <li>
                <a href="#"><i className="glyphicon glyphicon-envelope" aria-hidden="false" /></a>
              </li>
              <li>
                <a href="#" className="icon-info">
                  <i className="glyphicon glyphicon-bell" aria-hidden="false" />
                  <span className="label label-primary">3</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
