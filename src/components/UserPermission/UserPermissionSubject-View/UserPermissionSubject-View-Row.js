import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as notificationActions from 'redux/modules/notification';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userRoleManageActions from 'redux/modules/user-role/user-role-manage';
import * as userPermissionManageActions from 'redux/modules/user-permission/user-permission-manage';
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
  }),
  {
    ...userPermissionSubjectManageActions,
    addNotification: notificationActions.addNotification
  })
export default class UserPermissionSubjectViewRow extends Component {
  static propTypes = {
    userPermissionSubject: PropTypes.object,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
    onClickCancel: PropTypes.func,
    onClickLink: PropTypes.func
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
    const { userPermissionSubject } = this.props;

    // const styles = require('./UserPermissionSubject-View-Row.scss');
    return (
      <tr key={userPermissionSubject.id}>
        <td>{userPermissionSubject.id}</td>
        <td><span>{userPermissionSubject.name}</span></td>
        <td><span>{userPermissionSubject.description}</span></td>
        {/* <td>
          User ({userPermissionSubject.userNum}), Group({userPermissionSubject.groupNum})
        </td> */}
        <td>
          {userPermissionSubject.privacyLevel}
        </td>
        <td>{userPermissionSubject.enable ? 'Enabled' : 'Disabled'}</td>
        <td className="row">
          <ButtonGroup>
            <span>
              <DropdownButton id="actionDropdown" className={'item-action'} title={<Glyphicon glyph="option-vertical" />}>
                <Permissions allowed={['UserPermission_Edit Content']}>
                <Dropdown.Item onClick={()=> this.props.onClickEdit(userPermissionSubject)}><span className={'glyphicon glyphicon-edit'}></span> Edit</Dropdown.Item>
                </Permissions>
                <Permissions allowed={['UserPermission_Edit Content']}>
                <Confirm
                  onConfirm={()=>this.props.onClickDelete(userPermissionSubject)}
                  body="Are you sure you want to delete this?"
                  confirmText="Confirm Delete"
                  title="Deleting Item">
                  <Dropdown.Item>
                    <span>Delete</span>
                  </Dropdown.Item>
                </Confirm>
                </Permissions>
              </DropdownButton>
            </span>
          </ButtonGroup>

        </td>
      </tr>
    );
  }
}
