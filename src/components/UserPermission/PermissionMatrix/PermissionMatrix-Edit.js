import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as notificationActions from 'redux/modules/notification';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userRoleManageActions from 'redux/modules/user-role/user-role-manage';
import * as userPermissionManageActions from 'redux/modules/user-permission/user-permission-manage';
import * as userRolePermissionManageActions from 'redux/modules/user-role/user-role-permission-manage';
import * as globalPermissionManageActions from 'redux/modules/global-permission/global-permission-manage';
import * as userPermissionActionManageActions from 'redux/modules/user-permission/user-permission-action-manage';
import * as userPermissionSubjectManageActions from 'redux/modules/user-permission/user-permission-subject-manage';
import { isLoaded, loadPage as loadContents } from 'redux/modules/user/user-manage';
import { reduxForm, Field, formValueSelector, submit } from 'redux-form';
import { UserFormEditRow, UserViewRow } from 'components';
import { asyncConnect } from 'redux-connect';
import { ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import { LinkContainer } from 'react-router-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import Pager from 'react-pager';
import { renderInput, optionsTransform, optionsChange, flattenNestedObject } from 'utils/formUtil';
import * as lodash from 'lodash';
import Permissions from 'react-redux-permissions';

@connect(
  state => ({
    listSubject: state.userPermissionSubjectManage.listAll,
    listAction: state.userPermissionActionManage.listAll
  }),
  {
    addNotification: notificationActions.addNotification
  })
@reduxForm({
  form: 'permissionFormEditMatrix',
  onSubmit: (values, dispatch, props ) => {
    values = {
      rows: flattenNestedObject(values)
    };
    values.rows = lodash.map(values.rows, row=>{
      return {
        userPermissionSubjectId: row.subjectId,
        userPermissionActionId: row.actionId,
        enable: row.enable || false,
        available: row.available,
      };
    });

    if (props.isSaveReduced) {
      values.rows = lodash.filter(values.rows, (row)=> {
        if (props.checkPropName == 'enable') {
          return row.available == true;
        } else {
          return true;
        }
      });
    }
    // console.log(values);
    if (props.scopeName === 'global') {
      dispatch(globalPermissionManageActions.saveMatrix(values, props.scopeName))
      .then(()=>{
        if (props.onSubmitFinishedAction) {
          props.onSubmitFinishedAction();
        }
      });
    } else if (props.scopeName === 'role') {
      dispatch(userRolePermissionManageActions.saveMatrix(values, props.userRoleId))
      .then(()=>{
        if (props.onSubmitFinishedAction) {
          props.onSubmitFinishedAction();
        }
      });
    } else {
      dispatch(userPermissionManageActions.saveMatrix(values, props.userId))
      .then(()=>{
        if (props.onSubmitFinishedAction) {
          props.onSubmitFinishedAction();
        }
      });
    }
  }
})
export default class PermissionMatrixEdit extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    saveError: PropTypes.object,
    error: PropTypes.object,
    dispatch: PropTypes.func,
    change: PropTypes.func,
    initialValues: PropTypes.object,
    currentId: PropTypes.number,
    form: PropTypes.string,
    formKey: PropTypes.string,
    scopeName: PropTypes.string,
    listSubject: PropTypes.array,
    listAction: PropTypes.array,
    checkPropName: PropTypes.string,
    permissions: PropTypes.array,
    permissionMatrix: PropTypes.object,
    userRoleId: PropTypes.any,
    userId: PropTypes.any,
    isSaveReduced: PropTypes.bool,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
    onClickCancel: PropTypes.func,
    onClickLink: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUpdate(nextProps, nextState) {
  }

  render() {
    const { listAction, listSubject, permissions, permissionMatrix, checkPropName, scopeName } = this.props;
    const {
      form, invalid, pristine, submitting, dispatch, error, handleSubmit, change,
      formKey, initialValues
  } = this.props;

    // const styles = require('./UserPermissionSubject-View-Row.scss');
    const handleCellText = (cell, isCheckEnable = true)=>{
      if (isCheckEnable) {
        if (cell.available) {
          return (
            <input type="checkbox" className=" " checked={cell.enable} onChange={(event)=>{cell.enable = event.value;}}/>
          );
        } else {
          return <span></span>;
        }
      } else {
        return (
          <input type="checkbox" className=" " checked={cell.available} onChange={(event)=>{cell.enable = event.value;}}/>
        );
      }
    };
    const handleCellTextColor = (cell, isCheckEnable = true)=>{
      if (cell.available) {
        return cell.enable ? '#000000' : '#000000';
      } else {
        return '#aaaaaa';
      }
    };
    const handleCellBgColor = (cell, isCheckEnable = true)=>{
      if (cell.available) {
        if (isCheckEnable) {
          return cell.enable ? '#aaffaa' : '#ffaaaa';
        } else {
          return '#dddddd';
        }
      } else {
        return '#eeeeee';
      }
    };
    const handleCell = (userPermissionSubject, userPermissionAction, isCheckEnable = true) =>{
      let cell = permissionMatrix['s_' + userPermissionSubject.id]['a_' + userPermissionAction.id];
      // console.log('s_' + userPermissionSubject.id + '.' + 'a_' + userPermissionAction.id, cell);
      if (isCheckEnable) {
        if (cell.available) {
          return (
          <td style={{padding: '4px', borderRight: '1px solid #eee', backgroundColor: handleCellBgColor(cell, isCheckEnable), color: handleCellTextColor(cell, isCheckEnable)}} key={userPermissionSubject.id + ' ' + userPermissionAction.id}>
            <Field
              name={'s_' + userPermissionSubject.id + '.' + 'a_' + userPermissionAction.id + '.' + checkPropName}
              // defaultValue={cell[checkPropName]}
              type="checkbox" className=" "
              component={renderInput}/>
          </td>
          );
        } else {
          return (
          <td style={{padding: '4px', borderRight: '1px solid #eee', backgroundColor: handleCellBgColor(cell, isCheckEnable), color: handleCellTextColor(cell, isCheckEnable)}} key={userPermissionSubject.id + ' ' + userPermissionAction.id}>
            N/A
          </td>
          );
        }
      } else {
        return (
          <td style={{padding: '4px', borderRight: '1px solid #eee', backgroundColor: handleCellBgColor(cell, isCheckEnable), color: handleCellTextColor(cell, isCheckEnable)}} key={userPermissionSubject.id + ' ' + userPermissionAction.id}>
            <Field
              name={'s_' + userPermissionSubject.id + '.' + 'a_' + userPermissionAction.id + '.' + checkPropName}
              // defaultValue={cell[checkPropName]}
              type="checkbox" className=" "
              component={renderInput}/>
          </td>
          );
      }
    };
    // console.log(permissionMatrix);
    return (
      <div>
        <div className="pull-right" style={{marginBottom: '8px'}}>
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
        </div>
        <table className="table table-default table-bordered table-condensed table-hover table-striped">
          <thead key={'Header'} >
            <th style={{ backgroundImage: 'linear-gradient(to bottom right,  transparent calc(50% - 1px), red, transparent calc(50% + 1px));'}}></th>
            {listAction.map(userPermissionAction =>
              <th style={{ backgroundColor: '#ccc', borderBottom: '1px solid #bbb'}} key={'Header' + userPermissionAction.id}>{userPermissionAction.name}</th>
            )}
          </thead>
          {listSubject.map((userPermissionSubject, subjectIndex) =>
            <tr key={userPermissionSubject.id}>
              <td style={{ backgroundColor: '#ccc', padding: '4px', borderRight: '1px solid #bbb'}}>{userPermissionSubject.name}</td>
              {listAction.map((userPermissionAction, actionIndex) =>
                handleCell(userPermissionSubject, userPermissionAction, scopeName != 'global')
              )}
            </tr>
          )}
        </table>
      </div>
    );
  }
}
