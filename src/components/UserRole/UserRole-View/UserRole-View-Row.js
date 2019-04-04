import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as notificationActions from 'redux/modules/notification';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userRoleManageActions from 'redux/modules/user-role/user-role-manage';
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
    listData: state.userRoleManage.list
  }),
  {
    ...userRoleManageActions,
    addNotification: notificationActions.addNotification
  })
export default class UserManage extends Component {
  static propTypes = {
    listData: PropTypes.array,
    userRole: PropTypes.object,
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
    const { listData, userRole } = this.props;
    const handlePermissions = (permissions) => {
      if (permissions && lodash.isArray(permissions)) {
        return (
          permissions
          .sort((t1, t2) => t1.id > t2.id)
          .map((permission)=>
          permission && permission.name &&
          <div key={permission.name} className="btn btn-default" title={permission.name}>
          {permission.name}
          </div>
          )
        );
      } else {
        return (
          <div>No permission</div>
        );
      }
    };
    const styles = require('./UserRole-View-Row.scss');
    return (
      <tr key={userRole.id}>
        <td>{userRole.id}</td>
        <td><span>{userRole.name}</span></td>
        <td><span>{userRole.description}</span></td>
        <td>
          Users ({userRole.numOfUsers}), Groups ({userRole.numOfGroups})
        </td>
        {/* <td><span>{handlePermissions(userRole.permissions)}</span></td> */}
        <td>{userRole.enable ? 'Enabled' : 'Disabled'}</td>
        <td className="row">
          <ButtonGroup className={styles.groupButtonCol}>
            <span>
              <DropdownButton id="actionDropdown" className={'item-action ' + styles.dropdownIcon} title={<Glyphicon glyph="option-vertical" />}>
                <Permissions allowed={['UserRole_Edit']}>
                <Dropdown.Item onClick={()=> this.props.onClickEdit(userRole)}><span className={'glyphicon glyphicon-edit'}></span> Edit</Dropdown.Item>
                </Permissions>
                <Permissions allowed={['UserPermission_Edit']}>
                <LinkContainer to={'/user-role-permission/' + userRole.id}>
                  <Dropdown.Item>
                    <span>Edit UserRole Permissions</span>
                  </Dropdown.Item>
                </LinkContainer>
                </Permissions>
                {/* <Confirm
                  onConfirm={()=>this.props.onClickDelete(userRole)}
                  body="Are you sure you want to delete this?"
                  confirmText="Confirm Delete"
                  title="Deleting Item">
                  <Dropdown.Item>
                    <span>Delete</span>
                  </Dropdown.Item>
                </Confirm>*/}
              </DropdownButton>
            </span>
          </ButtonGroup>

        </td>
      </tr>
    );
  }
}
