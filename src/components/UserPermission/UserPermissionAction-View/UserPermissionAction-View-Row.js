import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as notificationActions from 'redux/modules/notification';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userRoleManageActions from 'redux/modules/user-role/user-role-manage';
import * as userPermissionManageActions from 'redux/modules/user-permission/user-permission-manage';
import * as userPermissionActionManageActions from 'redux/modules/user-permission/user-permission-action-manage';
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
    ...userPermissionActionManageActions,
    addNotification: notificationActions.addNotification
  })
export default class UserPermissionActionViewRow extends Component {
  static propTypes = {
    userPermissionAction: PropTypes.object,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
    onClickCancel: PropTypes.func
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
    const { userPermissionAction } = this.props;

    return (
      <tr>
        <td>{userPermissionAction.id}</td>
        <td><span>{userPermissionAction.name}</span></td>
        <td><span>{userPermissionAction.description}</span></td>
        <td>{userPermissionAction.enable ? 'Enabled' : 'Disabled'}</td>
        <td className="row">
          <ButtonGroup>
            <span>
              <Permissions allowed={['UserPermission_Edit Content']}>
              <DropdownButton id="actionDropdown" className={'item-action '} title={<Glyphicon glyph="option-vertical" />}>
                <Dropdown.Item onClick={()=> this.props.onClickEdit(userPermissionAction)}><span className={'glyphicon glyphicon-edit'}></span> Edit</Dropdown.Item>
                <Confirm
                  onConfirm={()=>this.props.onClickDelete(userPermissionAction)}
                  body="Are you sure you want to delete this?"
                  confirmText="Confirm Delete"
                  title="Deleting Item">
                  <Dropdown.Item>
                    <span>Delete</span>
                  </Dropdown.Item>
                </Confirm>
              </DropdownButton>
              </Permissions>
            </span>
          </ButtonGroup>

        </td>
      </tr>
    );
  }
}
