import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as notificationActions from 'redux/modules/notification';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userRoleManageActions from 'redux/modules/user-role/user-role-manage';
import * as userPermissionManageActions from 'redux/modules/user-permission/user-permission-manage';
import * as userPermissionActionManageActions from 'redux/modules/user-permission/user-permission-action-manage';
import * as userPermissionSubjectManageActions from 'redux/modules/user-permission/user-permission-subject-manage';
import { isLoaded, loadPage as loadContents } from 'redux/modules/user/user-manage';
import { UserFormEditRow, UserViewRow } from 'components';
import { asyncConnect } from 'redux-connect';
import { ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import { LinkContainer } from 'react-router-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import Pager from 'react-pager';
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
export default class PermissionMatrixView extends Component {
  static propTypes = {
    listSubject: PropTypes.array,
    listAction: PropTypes.array,
    scopeName: PropTypes.string,
    permissions: PropTypes.array,
    permissionMatrix: PropTypes.object,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
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
    const { listAction, listSubject, permissions, permissionMatrix, scopeName } = this.props;

    // const styles = require('./UserPermissionSubject-View-Row.scss');

    const handleCellText = (cell, isCheckEnable = true)=>{
      if (cell.available) {
        if (isCheckEnable) {
          return cell.enable ? 'Y' : 'N';
        } else {
          // return 'A';
          return <i className="glyphicon glyphicon-check"/>;
        }
      } else {
        return 'N/A';
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
          return '#eeeeee';
        }
      } else {
        return '#eeeeee';
      }
    };
    const handleCell = (userPermissionSubject, userPermissionAction, isCheckEnable = true) =>{
      let cell = permissionMatrix['s_' + userPermissionSubject.id]['a_' + userPermissionAction.id];
      return (
      <td style={{padding: '4px', borderRight: '1px solid #eee', backgroundColor: handleCellBgColor(cell, isCheckEnable), color: handleCellTextColor(cell, isCheckEnable)}} key={userPermissionSubject.id + ' ' + userPermissionAction.id}>
        { handleCellText(cell, isCheckEnable)}
      </td>
      );
    };
    // console.log(permissionMatrix);
    return (
      <div>
        <div className="pull-right" style={{marginBottom: '8px'}}>
          <Permissions allowed={['UserPermission_Edit']}>
          <button className="btn btn-primary"
            onClick={()=>this.props.onClickEdit()}>
            <i className="glyphicon glyphicon-pencil" /> Edit
          </button>
          </Permissions>
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
                handleCell(userPermissionSubject, userPermissionAction, scopeName !='global')
              )}
            </tr>
          )}
        </table>
      </div>
    );
  }
}
