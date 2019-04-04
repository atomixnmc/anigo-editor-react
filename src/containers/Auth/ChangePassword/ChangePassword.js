import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';
import { reduxForm, reset, Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { renderInput, optionsTransform, optionsChange } from 'utils/formUtil';
import * as lodash from 'lodash';
import { getErrorMessage, watchForError } from 'utils/errorParse';

const validate = values => {
  const errors = {};
  if (!values.oldPassword) {
    errors.oldPassword = 'Required';
  } else if (values.oldPassword.length < 4) {
    errors.oldPassword = 'Minimum be 4 characters or more';
  }
  if (!values.newPassword) {
    errors.newPassword = 'Required';
  } else if (values.newPassword.length < 4) {
    errors.newPassword = 'Minimum be 4 characters or more';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword.length < 4) {
    errors.confirmPassword = 'Minimum be 4 characters or more';
  }
  return errors;
};

@connect(
  state => ({
    user: state.auth.user,
    isChangePassword: state.auth.isChangePassword,
    error: state.auth.error,
    errorMessage: state.auth.errorMessage,
    changePassword: state.auth.changePassword,
    resetchangePWState: state.auth.resetchangePWState
  }),
  dispatch => bindActionCreators(
    authActions,
    dispatch
  ))
  @reduxForm({
    form: 'changepassword-form',
    // fields: ['oldPassword', 'newPassword', 'confirmPassword'],
    validate: validate,
    onSubmit: (values, dispatch, props ) => {
      const { user } = props;
      const oldPassword = values.oldPassword;
      const newPassword = values.newPassword;
      const confirmPassword = values.confirmPassword;
      props.changePassword(user.username, oldPassword, newPassword, confirmPassword);
      dispatch(reset('changepassword-form'));
    }
  })
export default class ChangePassword extends Component {
  static propTypes = {
    user: PropTypes.object,
    changePasswordError: PropTypes.string,
    isChangePassword: PropTypes.bool,
    changePassword: PropTypes.func,
    resetchangePWState: PropTypes.func,
    // fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    dispatch: PropTypes.func,
    error: PropTypes.any,
    errorMessage: PropTypes.any,
  }

  componentWillReceiveProps(nextProps) {
    // watchForError(this.props, nextProps, 'TestCaseManage');
    // this.props.clearError();
  }

  componentWillUnmount() {
    this.props.resetchangePWState();
  }

  render() {
    const {user, errorMessage, resetchangePWState} = this.props;
    const { handleSubmit, pristine, submitting, invalid} = this.props;
    const styles = require('./ChangePassword.scss');
    if (this.props.isChangePassword) {
      return (
        <div className="container" style={{marginTop: '10px'}}>
          <p><i className="glyphicon glyphicon-ok"></i>{' '} You are successfully changing your password: {user.username}.</p>
          <div>
              <button className="btn btn-primary" onClick={resetchangePWState}><i className="fa fa-sign-out"/>{' '}Back to change password page</button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <section className="section section-header section-primary">
          <div className="container">
            <h1 className="section-header-title">Change password</h1>
          </div>
        </section>
        <section className="section section-content">
        <div className="container">
          {errorMessage &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              {' '}
              {errorMessage}
            </div>}
          {user &&
          <div>
            <p>You are currently logged in as : <b>{user.username}</b>.</p>
            <div>
              <form className = "changepassword-form" onSubmit={handleSubmit}>
                  <div>
                    <Field
                      name="oldPassword"
                      placeholder="Old Password"
                      label="Old Password"
                      component={ renderInput }
                      style={{width: '500px'}}
                      type="password" />
                    <br></br>
                    <Field
                      name="newPassword"
                      placeholder="New Password"
                      label="New Password"
                      component={ renderInput }
                      style={{width: '500px'}}
                      type="password" />
                    <br></br>
                    <Field
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      label="Confirm Password"
                      component={ renderInput }
                      style={{width: '500px'}}
                      type="password" />
                  </div>
                  <br></br>
                  <button
                    className="btn btn-success"
                    type="submit"
                    disabled={pristine || invalid || submitting}><i className="fa fa-sign-in"/>{' '}Submit
                  </button>
              </form>
            </div>
          </div>
          }
        </div>
        </section>
      </div>
    );
  }
}
