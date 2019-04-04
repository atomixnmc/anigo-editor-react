import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { push } from 'connected-react-router';
import { asyncConnect } from 'redux-connect';
// import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import Permissions from 'react-redux-permissions';
import { clear as clearPermissions } from 'react-redux-permissions';
import * as authActions from 'redux/modules/auth';
import config from '../../config';

// @asyncConnect([{
//   promise: ({store: {dispatch, getState}}) => {
//     const promises = [];

//     // if (!isInfoLoaded(getState())) {
//     //   promises.push(dispatch(loadInfo()));
//     // }
//     if (!authActions.isAuthLoaded(getState())) {
//       promises.push(dispatch(authActions.fetchUser()));
//     }

//     return Promise.all(promises);
//   }
// }])
@connect(
  state => ({
    user: state.auth.user,
    userPermissions: state.permissions,
    changePassword: state.auth.changePassword
  }),
  {
    pushState: push,
    clearPermissions,
    ...authActions
  },
  null,
  {
    pure: false
  })
export default class Header extends Component {
  static propTypes = {
    // children: PropTypes.object,
    user: PropTypes.object,
    userPermissions: PropTypes.any,
    clearPermissions: PropTypes.func,
    logout: PropTypes.func,
    pushState: PropTypes.func,
    // load: PropTypes.func
  };

  static contextTypes = {
    store: PropTypes.object
  };

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
    } else if (this.props.user && !nextProps.user) {
      // logout
    }
    // console.log('Header componentWillReceiveProps', nextProps);
  }

  handleLogout = () => {
    this.props.clearPermissions();
    this.props.logout();
  };

  render() {
    const {user, userPermissions} = this.props;
    // const styles = require('./Header.scss');
    // console.log('Header', user, userPermissions);
    return (
      <div className='sticky-top'>
        <Navbar dark expand role='navigation' className="bg-dark">
          <NavbarBrand to="/#/">AniGo</NavbarBrand>
          <Nav className="mr-auto">
            <NavItem>
              <NavLink activeClassName='active' tag={RRNavLink} to='/'>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink activeClassName='active' tag={RRNavLink} to='/auth/register'>
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink activeClassName='active' tag={RRNavLink} to='/auth/login'>
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink activeClassName='active' tag={RRNavLink} to='/clips/create'>
                Create
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
