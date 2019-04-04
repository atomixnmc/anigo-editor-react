import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector, submit } from 'redux-form';
import { ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userRoleManageActions from 'redux/modules/user-role/user-role-manage';
import * as userRolePermissionManageActions from 'redux/modules/user-role/user-role-permission-manage';
import * as userPermissionManageActions from 'redux/modules/user-permission/user-permission-manage';
import * as userPermissionActionManageActions from 'redux/modules/user-permission/user-permission-action-manage';
import * as userPermissionSubjectManageActions from 'redux/modules/user-permission/user-permission-subject-manage';

import { asyncConnect } from 'redux-connect';
import Select from 'react-select';
import Pager from 'react-pager';
import { renderInput, optionsTransform, optionsChange } from 'utils/formUtil';
import * as lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import userPermissionValidation from './UserPermission-Validator';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    const promises = [
    ];
    return Promise.all(promises);
  }
}])
@connect(
  state => {
    return ({
      saveError: state.userPermissionManage.saveError,
      list: state.userPermissionManage.list,
      listSubject: state.userPermissionSubjectManage.listAll,
      listAction: state.userPermissionActionManage.listAll,
    });
  },
  {
    ...userPermissionManageActions,
    loadListSubject: userPermissionSubjectManageActions.loadAll,
    loadListAction: userPermissionActionManageActions.loadAll,
  }
)
@reduxForm({
  form: 'userPermissionFormEditRow',
  validate: userPermissionValidation,
  onSubmit: (values, dispatch, props ) => {
    if (props.scopeName === 'role') {
      dispatch(userRolePermissionManageActions.addNew(values, props.userRoleId))
      .then(()=>{
        if (props.onSubmitFinishedAction) {
          props.onSubmitFinishedAction();
        }
      });
    } else {
      dispatch(userPermissionManageActions.addNew(values, props.userId))
      .then(()=>{
        if (props.onSubmitFinishedAction) {
          props.onSubmitFinishedAction();
        }
      });
    }
  }
})
export default class UserPermissionFormNewRow extends Component {
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
    loadVersion: PropTypes.func,
    initialValues: PropTypes.object,
    currentId: PropTypes.number,
    form: PropTypes.string,
    formKey: PropTypes.string,
    scopeName: PropTypes.string,
    listSubject: PropTypes.array,
    listAction: PropTypes.array,
    loadListSubject: PropTypes.func,
    loadListAction: PropTypes.func,
    onClickCancel: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {
      dispatch
    } = this.props;
    // this.props.loadListSubject();
    // this.props.loadListAction();
  }

  render() {
    const {
        currentId,
        form, invalid, pristine, submitting, dispatch, error, handleSubmit, change,
        saveError, editItemStop,
        formKey, initialValues
    } = this.props;

    const userPermission = initialValues;
    const handleSubjectOptions = (value) =>{
      const result = optionsTransform(this.props.listSubject, value, 'id', 'name');
      // console.log('handleSubjectOptions', this.props.listSubject, result);
      return result;
    };
    const handleSubjectOptionsChange = (values) => {
      optionsChange(this.props.listSubject, values, change, 'subjectId');
    };
    const handleActionOptions = (value) =>{
      const result = optionsTransform(this.props.listAction, value, 'id', 'name');
      // console.log('handleActionOptions', this.props.listAction, result);
      return result;
    };
    const handleActionOptionsChange = (values) => {
      optionsChange(this.props.listAction, values, change, 'actionId');
    };
    const renderSubjectSelect = subjectId =>
    (<div>
      <Select
        style={{paddingTop: '4px', color: '#000'}}
        closeMenuOnSelect={true}
        value={handleSubjectOptions(subjectId.input.value)}
        onChange={handleSubjectOptionsChange}
        options={handleSubjectOptions(this.props.listSubject)}
        />
    </div>);

    const renderActionSelect = actionId =>
    (
    <div>
      <Select
        style={{paddingTop: '4px', color: '#000'}}
        closeMenuOnSelect={true}
        value={handleActionOptions(actionId.input.value)}
        onChange={handleActionOptionsChange}
        options={handleActionOptions(this.props.listAction)}
        />
    </div>);

    return (
      <tr>
        <td>
          {userPermission.id}
        </td>
        <td>
          {userPermission.name}
        </td>
        <td>
        <Field
          name="description"
          component={renderInput}/>
        </td>
        <td>
          <Field
            name="subjectId"
            component={renderSubjectSelect}/>
        </td>
        <td>
          <Field
            name="actionId"
            component={renderActionSelect}/>
        </td>
        <td>
        <Field
          name="enable"
          type="checkbox" className=" "
          component={renderInput}/>
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
