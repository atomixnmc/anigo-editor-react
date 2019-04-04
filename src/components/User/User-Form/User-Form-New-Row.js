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
import * as userRoleManageActions from 'redux/modules/user-role/user-role-manage';
import * as userGroupManageActions from 'redux/modules/user-group/user-group-manage';
import { asyncConnect } from 'redux-connect';
import Select from 'react-select';
import Pager from 'react-pager';
import { renderInput, optionsTransform, optionsChange } from 'utils/formUtil';
import * as lodash from 'lodash';

@connect(
  state => {
    return ({
      listUserRole: state.userRoleManage.listAll,
      listUserGroup: state.userGroupManage.listAll,
    });
  },
  dispatch => bindActionCreators(userManageActions, dispatch)
)
@reduxForm({
  form: 'userFormNewRow',
  validate: userValidation,
  onSubmit: (values, dispatch, props ) => {
    // NOTE: Transform to id list

    dispatch(userManageActions.createNew(values))
    .then(()=>{
      if (props.onSubmitFinishedAction) {
        props.onSubmitFinishedAction();
      }
    });
  }
})
export default class UserFormNewRow extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    saveError: PropTypes.object,
    error: PropTypes.object,
    dispatch: PropTypes.func,
    change: PropTypes.func,
    editItemStop: PropTypes.func,
    listUserRole: PropTypes.array,
    listUserGroup: PropTypes.array,
    userEntry: PropTypes.object,
    initialValues: PropTypes.object,
    currentId: PropTypes.number,
    form: PropTypes.string,
    formKey: PropTypes.string,
    onClickCancel: PropTypes.func
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
        form, invalid, pristine, submitting, dispatch, error, handleSubmit, change,
        saveError, editItemStop,
        formKey, initialValues
    } = this.props;

    const user = initialValues;
    const handleUserRoleOptions = (value) =>{
      const result = optionsTransform(this.props.listUserRole, value, 'id', 'name');
      return result;
    };
    const handleUserRoleOptionsChange = (values) => {
      optionsChange(this.props.listUserRole, values, change, 'role');
    };
    const handleUserGroupOptions = (value) =>{
      const result = optionsTransform(this.props.listUserGroup, value, 'id', 'name');
      return result;
    };
    const handleUserGroupOptionsChange = (values) => {
      optionsChange(this.props.listUserGroup, values, change, 'groups');
    };
    const renderRoleSelect = (role) =>
    (<div>
      <Select
        style={{paddingTop: '4px', color: '#000'}}
        closeMenuOnSelect={true}
        value={handleUserRoleOptions(role.input.value)}
        onChange={handleUserRoleOptionsChange}
        options={handleUserRoleOptions(this.props.listUserRole)}
        />
    </div>
    );
    const renderGroupSelect = (groups) =>
    (<div>
      <Select
        style={{paddingTop: '4px', color: '#000'}}
        closeMenuOnSelect={true}
        isMulti
        value={handleUserGroupOptions(groups.input.value)}
        onChange={handleUserGroupOptionsChange}
        options={handleUserGroupOptions(this.props.listUserGroup)}
        />
    </div>
    );
    return (
      <tr>
        <td>
          {user.id}
        </td>
        <td>
        <Field
          name="username"
          component={renderInput}/>
        </td>
        <td>
          <Field
            name="role"
            component={renderRoleSelect}/>
        </td>
        <td>
        <Field
          name="email"
          component={renderInput}/>
        </td>
        <td>
          <Field
            name="groups"
            component={renderGroupSelect}/>
        </td>
        <td>
          <button className="btn btn-default"
            onClick={this.props.onClickCancel}
            disabled={submitting}>
            <i className="fa fa-ban" /> Cancel
          </button>
          <button className="btn btn-success"
            onClick={handleSubmit}
            disabled={pristine || invalid || submitting}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')} /> Save
          </button>
          {/* {saveError && <div className="text-danger">{saveError}</div>} */}
        </td>
      </tr>
    );
  }
}
