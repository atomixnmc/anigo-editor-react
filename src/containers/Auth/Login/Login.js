import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import { extractPermissions } from 'redux/modules/auth';
import { reduxForm, Field } from 'redux-form';
import * as lodash from 'lodash';
import { getErrorMessage, watchForError } from 'utils/errorParse';
import { renderInput, optionsTransform, optionsChange } from 'utils/formUtil';
import { add as addPermission, remove as removePermission, clear as clearPermissions } from 'react-redux-permissions';
import { push } from 'connected-react-router';

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.includes(' ')) {
    errors.username = 'Cannot contain whitespace';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 4) {
    errors.password = 'Minimum be 4 characters or more';
  }
  return errors;
};

@connect(
  state => ({
    user: state.auth.user,
    error: state.auth.error,
    errorMessage: state.auth.errorMessage,
    clearError: state.auth.clearError
  }),
  {
    ...authActions,
    addPermission,
    removePermission,
    clearPermissions,
    pushState: push
  }
)
@reduxForm({
  form: 'Login',
  validate: validate,
  onSubmit: (values, dispatch, props) => {
    const username = values.username;
    const password = values.password;
    // console.log(username, password);
    props.login(username, password);
    dispatch(props.reset());
  }
})
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    handleSubmit: PropTypes.func,
    login: PropTypes.func,
    logout: PropTypes.func,
    error: PropTypes.any,
    errorMessage: PropTypes.any,
    clearError: PropTypes.any,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    addPermission: PropTypes.func,
    removePermission: PropTypes.func,
    clearPermissions: PropTypes.func,
    pushState: PropTypes.func,
    // extractPermissions: PropTypes.func,
    fetchUser: PropTypes.func
  }

  componentWillMount() {
    this.props.clearError();
    // this.refreshUser();
  }

  componentWillReceiveProps(nextProps) {
    watchForError(this.props, nextProps, 'Login', false);

    if (nextProps.user) {
      // console.log('Try fetch', nextProps.user);
      this.refreshUser();
    }
  }
  componentWillUnmount() {
    this.props.clearError();
  }

  refreshUser() {
    let loginPromise = this.props.fetchUser();
    if (loginPromise && loginPromise.then) {
      loginPromise
      .then(userInfo=>{
        // console.log('Login After fetch', userInfo);
        extractPermissions(userInfo, {
          addPermission: this.props.addPermission,
          removePermission: this.props.removePermission,
          clearPermissions: this.props.clearPermissions
        });
        // this.props.clearPermissions();
        // lodash.each(userInfo.rolePermissions, (p)=>{
        //   if (p.enable) {
        //     // console.log('add Permission', p);
        //     this.props.addPermission(p.name);
        //   }
        // });
        this.props.pushState('/');
      });
    }
  }

  render() {
    const {user, error, errorMessage} = this.props;
    const styles = require('./Login.scss');
    const { handleSubmit, pristine, submitting, invalid} = this.props;
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>Login</h1>
          {errorMessage &&
          <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            {' '}
            {errorMessage}
          </div>}
        {!user &&
        <div>
          <form className="login-form form-inline" onSubmit={handleSubmit}>
            <div className="form-group">
            <Field
              placeholder="Enter your username"
              name="username"
              // label="Enter your username"
              component={renderInput}
              type="text"
              style={{width: '500px'}}/>
              <br></br>
            <Field
              placeholder="Password"
              name="password"
              // label="Password"
              component={renderInput}
              type="password"
              style={{width: '500px', paddingTop: '10px'}}/>
            </div>
            <br/>
            <div style={{paddingTop: '10px'}}>
              <a href="/register">Register</a> if you do not have account.
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-success"
                style={{marginTop: '10px'}}
                disabled={pristine || invalid || submitting}><i className="fa fa-sign-in"/>{' '}Log In
              </button>
            </div>
          </form>
        </div>
        }
      </div>
    );
  }
}
