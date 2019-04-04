import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector, submit } from 'redux-form';
import { ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import userValidation from './User-Validator';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as useProfileActions from 'redux/modules/user/user-profile';
import * as userRoleManageActions from 'redux/modules/user-role/user-role-manage';
import * as userGroupManageActions from 'redux/modules/user-group/user-group-manage';
import { asyncConnect } from 'redux-connect';
import Select from 'react-select';
import Pager from 'react-pager';
import { renderInput, optionsTransform, optionsChange } from 'utils/formUtil';
import * as lodash from 'lodash';
import * as notificationActions from 'redux/modules/notification';

@connect(
  state => {
    return ({
      listUserRole: state.userRoleManage.listAll,
      listUserGroup: state.userGroupManage.listAll,
    });
  },
  {
    ...userManageActions,
    ...notificationActions
  }
)
@reduxForm({
  form: 'userFormEditProfile',
  validate: userValidation,
  onSubmit: (values, dispatch, props ) => {
    dispatch(useProfileActions.updateProfile(values))
    .then(()=>{
      props.addNotification('Update Profile Success!', 'success');
      if (props.onSubmitFinishedAction) {
        props.onSubmitFinishedAction();
      }
    });
  }
})
export default class UserFormEditRow extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    saveError: PropTypes.object,
    error: PropTypes.object,
    dispatch: PropTypes.func,
    reset: PropTypes.func,
    change: PropTypes.func,
    editItemStop: PropTypes.func,
    listUserRole: PropTypes.array,
    listUserGroup: PropTypes.array,
    userEntry: PropTypes.object,
    initialValues: PropTypes.object,
    currentId: PropTypes.number,
    form: PropTypes.string,
    formKey: PropTypes.string,
    onClickCancel: PropTypes.func,
    addNotification: PropTypes.func,
    closeNotification: PropTypes.func,
    clearNotification: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {
      dispatch
    } = this.props;
    dispatch(userRoleManageActions.loadAll());
    dispatch(userGroupManageActions.loadAll());
  }

  render() {
    const {
        currentId,
        form, invalid, pristine, submitting, dispatch, error, handleSubmit, change, reset,
        saveError, editItemStop,
        formKey, initialValues
    } = this.props;

    const user = initialValues;
    const handleUserRoleOptions = (value) =>{
      const result = optionsTransform(this.props.listUserRole, value, 'id', 'name');
      return result;
    };
    const handleUserRoleOptionsChange = (values) => {
      optionsChange(this.props.listUserRole, values, change, 'roleId');
    };
    const handleUserGroupOptions = (value) =>{
      const result = optionsTransform(this.props.listUserGroup, value, 'id', 'name');
      return result;
    };
    const handleUserGroupOptionsChange = (values) => {
      optionsChange(this.props.listUserGroup, values, change, 'userGroupIds');
    };
    return (
      <div className="form form-default">
        <div className={'row'} style={{margin: '4px'}}>
          <label className={'col-md-2'}> Username </label>
          <div className={'col-md-10'}>
            {user.username}
          </div>
        </div>
        <div className={'row'} style={{margin: '4px'}}>
          <label className={'col-md-2'}> Email </label>
            <div className={'col-md-10'}>

          <Field
            name="email"
            component={email =>
            <div>
            <input type="text" className="form-control" {...email.input} />
            </div>}/>

          </div>
        </div>
        <div className={'row'} style={{margin: '4px'}}>
          <label className={'col-md-2'}> Role </label>
          <div className={'col-md-10'}>
            <span className="btn btn-default">
              {user.role.name}
            </span>
          </div>
        </div>

        <div className={'row'} style={{margin: '4px'}}>
            <label className={'col-md-2'}> Group </label>
            <div className={'col-md-10'}>
              {user.groups.map(group=>
                <span key={group.name} className="btn btn-default">
                  {group.name}
                </span>
              )
              }
            </div>
         </div>
        <div className={'row'} style={{margin: '4px'}}>
          <label className={'col-md-3'}></label>
          <div>
            {/* <button className="btn btn-default"
              onClick={this.props.onClickCancel}
              disabled={submitting}>
              <i className="fa fa-ban" /> Cancel
            </button> */}
            <button className="btn btn-default"
              type="reset"
              onClick={this.props.reset}
              disabled={submitting}>Reset</button>
            <button className="btn btn-success"
              onClick={handleSubmit}
              disabled={pristine || invalid || submitting}>
              <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')} /> Save
            </button>
            {/* {saveError && <div className="text-danger">{saveError}</div>} */}
            </div>
        </div>
      </div>
    );
  }
}
