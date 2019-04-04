import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as notificationActions from 'redux/modules/notification';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userRoleManageActions from 'redux/modules/user-role/user-role-manage';
import * as userPermissionManageActions from 'redux/modules/user-permission/user-permission-manage';
import * as userRolePermissionManageActions from 'redux/modules/user-role/user-role-permission-manage';
import * as userPermissionActionManageActions from 'redux/modules/user-permission/user-permission-action-manage';
import * as userPermissionSubjectManageActions from 'redux/modules/user-permission/user-permission-subject-manage';

import { isLoaded, loadPage as loadContents } from 'redux/modules/user/user-manage';
import { initializeWithKey } from 'redux-form';
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
    listData: state.userPermissionManage.list,
    listSubject: state.userPermissionSubjectManage.listAll,
    listAction: state.userPermissionActionManage.listAll,
  }),
  {
    ...userPermissionManageActions,
    loadListSubject: userPermissionSubjectManageActions.loadAll,
    loadListAction: userPermissionActionManageActions.loadAll,
    addNotification: notificationActions.addNotification
  })
export default class UserPermissionViewRow extends Component {
  static propTypes = {
    listData: PropTypes.array,
    listSubject: PropTypes.array,
    listAction: PropTypes.array,
    loadListSubject: PropTypes.func,
    loadListAction: PropTypes.func,
    userPermission: PropTypes.object,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
    onClickCancel: PropTypes.func,
    onClickLink: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // this.props.loadListSubject();
    // this.props.loadListAction();
  }

  componentDidMount() {
  }

  componentWillUpdate(nextProps, nextState) {
  }

  render() {
    const { listData, listSubject, listAction, userPermission } = this.props;
    const handleSubject = (subjectId)=>{
      let subject = lodash.find(listSubject, (s)=> s.id == subjectId);
      return (
        <span>{subject.name}</span>
      );
    };
    const handleAction = (actionId)=>{
      let action = lodash.find(listAction, (a)=> a.id == actionId);
      return (
        <span>{action.name}</span>
      );
    };
    const styles = require('./UserPermission-View-Row.scss');
    return (
      <tr key={userPermission.id}>
        <td>{userPermission.id}</td>
        <td><span>{userPermission.name}</span></td>
        <td><span>{userPermission.description}</span></td>
        <td>{handleSubject(userPermission.subjectId)}</td>
        <td>{handleAction(userPermission.actionId)}</td>
        {/* <td>
          Users ({userPermission.numOfUsers}), Groups ({userPermission.numOfGroups})
        </td> */}
        <td>{userPermission.enable ? 'Enabled' : 'Disabled'}</td>
        <td className="row">
          <ButtonGroup className={styles.groupButtonCol}>
            <span>
              <DropdownButton id="actionDropdown" className={'item-action ' + styles.dropdownIcon} title={<Glyphicon glyph="option-vertical" />}>
                <Dropdown.Item onClick={()=> this.props.onClickEdit(userPermission)}><span className={'glyphicon glyphicon-edit'}></span> Edit</Dropdown.Item>
                <Confirm
                  onConfirm={()=>this.props.onClickDelete(userPermission)}
                  body="Are you sure you want to delete this?"
                  confirmText="Confirm Delete"
                  title="Deleting Item">
                  <Dropdown.Item>
                    <span>Delete UserPermission</span>
                  </Dropdown.Item>
                </Confirm>
              </DropdownButton>
            </span>
          </ButtonGroup>

        </td>
      </tr>
    );
  }
}
