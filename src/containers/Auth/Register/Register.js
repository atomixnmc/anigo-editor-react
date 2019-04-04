import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';
import {reduxForm, reset, Field} from 'redux-form';
import {bindActionCreators} from 'redux';
import { renderInput, optionsTransform, optionsChange } from 'utils/formUtil';
import * as lodash from 'lodash';
import { getErrorMessage, watchForError } from 'utils/errorParse';

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.includes(' ')) {
    errors.username = 'Cannot contain whitespace';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 4) {
    errors.password = 'Minimum be 4 characters or more';
  }
  if (!values.password2 || values.password != values.password2) {
    errors.password = 'Required';
  } else if (values.password.length < 4) {
    errors.password = 'Please retype password. Retype should be matched!';
  }
  return errors;
};

@connect(
  state => ({
    user: state.auth.user,
    initialValues: state.auth.userInitialValues,
    isRegisterSuccess: state.auth.isRegisterSuccess,
    error: state.auth.error,
    errorMessage: state.auth.errorMessage,
    clearError: state.auth.clearError,
    register: state.auth.register,
    resetRegisterState: state.auth.resetRegisterState}),
  dispatch => bindActionCreators(authActions, dispatch))
@reduxForm({
  form: 'register',
  // fields: ['username', 'password', 'email'],
  validate: validate,
  onSubmit: (values, dispatch, props ) => {
    const username = values.username;
    const password = values.password;
    const email = values.email;
    // console.log(values);
    props.register(username, password, email);
    dispatch(reset('register'));
  }
})
export default class Register extends Component {
  static propTypes = {
    user: PropTypes.object,
    register: PropTypes.func,
    isError: PropTypes.bool,
    error: PropTypes.any,
    errorMessage: PropTypes.any,
    clearError: PropTypes.func,
    isRegisterSuccess: PropTypes.bool,
    resetRegisterState: PropTypes.func,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    dispatch: PropTypes.func
  }

  componentWillMount() {
    this.props.clearError();
  }

  componentWillReceiveProps(nextProps) {
    watchForError(this.props, nextProps, 'Register', false);
    // console.log(nextProps);
    // this.props.clearError();
  }

  componentWillUnmount() {
    this.props.dispatch(reset('register'));
    this.props.resetRegisterState();
    this.props.clearError();
  }

  render() {
    const { user, error, errorMessage, resetRegisterState} = this.props;
    const { handleSubmit, pristine, submitting, invalid} = this.props;
    const styles = require('./Register.scss');

    // console.log('Re-Render', error);

    if (this.props.isRegisterSuccess) {
      return (
        <div className="container" style={{marginTop: '10px'}}>
          <div className={styles.loginPage + ' container'}>
          <p><i className="glyphicon glyphicon-ok"></i>{' '}You are successfully register new account.</p>
          <div>
            <button className="btn btn-primary" onClick={resetRegisterState}><i className="fa fa-sign-out"/>{' '}Back to register page</button>
          </div>
        </div>
      </div>
      );
    }
    return (
      <div>
        <section className="section section-header section-primary">
          <div className="container">
            <h1>Register new account</h1>
          </div>
        </section>
        <section className="section section-content">
          <div className="container">
            {errorMessage &&
              <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                {' '}
                { errorMessage}
              </div>}
            <div>
            <div>
              <form className = "register" onSubmit={handleSubmit}>
                  <div>
                      <Field
                        name="username"
                        placeholder="Username"
                        label="Username"
                        component={ renderInput }
                        style={{width: '500px'}}
                        type="text" />
                      <br></br>
                      <Field
                        name="password"
                        placeholder="Password"
                        label="Password"
                        component={ renderInput }
                        style={{width: '500px'}}
                        type="password" />
                      <br></br>
                      <Field
                        name="password2"
                        placeholder="Retype Password"
                        label="Confirm password"
                        component={ renderInput }
                        style={{width: '500px'}}
                        type="password2" />
                      <br></br>
                      <Field
                        name="email"
                        placeholder="Email"
                        label="Email"
                        component={ renderInput }
                        style={{width: '500px'}}
                        type="text" />
                      <br></br>
                        <h5>Personal information</h5>
                        <Field
                          name="fullname"
                          placeholder="Full Name"
                          label="Full Name"
                          component={ renderInput }
                          style={{width: '500px'}}
                          type="text" />
                        <br></br>
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
          </div>
        </section>
      </div>
    );
  }
}
