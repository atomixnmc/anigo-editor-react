import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as notificationActions from 'redux/modules/notification';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userRoleManageActions from 'redux/modules/user-role/user-role-manage';
import * as userGroupManageActions from 'redux/modules/user-group/user-group-manage';
import { isLoaded, loadPage as loadContents } from 'redux/modules/user/user-manage';
import { initializeWithKey } from 'redux-form';
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
    listData: state.userManage.data,
    listUserRole: state.userRoleManage.listAll,
    listUserGroup: state.userGroupManage.listAll
  }),
  {
    ...userManageActions,
    addNotification: notificationActions.addNotification,
    // loadUserRole: userRoleManageActions.loadAll,
    // loadUserGroup: userGroupManageActions.loadAll
  })
export default class UserViewRow extends Component {
  static propTypes = {
    listData: PropTypes.array,
    listUserRole: PropTypes.array,
    loadUserRole: PropTypes.func,
    loadUserGroup: PropTypes.func,
    user: PropTypes.object,
    onClickEdit: PropTypes.func,
    onClickCancel: PropTypes.func,
    onClickDelete: PropTypes.func,
    onClickEditDetail: PropTypes.func,
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
    const { listData, listUserRole, loadUserGroup, user } = this.props;

    const handleRole = (role) => {
      return (
        role ?
        role && role.name &&
         <div key={role.name} className="btn btn-default" title={role.description}>
          {role.name}
         </div>
        :
        'No Role'
      );
    };
    // console.log(listUserRole);

    // const handleRoleId = (roleId) => {
    //   let role = lodash.find(listUserRole, (r)=> r.id == roleId);
    //   if (role) {
    //     return (
    //     <div key={role.name} className="btn btn-default" title={role.roleDescription}>
    //     {role.name.length > 15 ? role.name.substring(0, 15) + '...' : role.name}
    //     </div>
    //     );
    //   } else {
    //     return (
    //       <div className="btn btn-default">No role</div>
    //       );
    //   }
    // };
    const handleGroups = (groups) => {
      return (
        groups
        .sort((t1, t2) => t1.id > t2.id)
        .map((group)=>
        group && group.name &&
         <div key={group.name} className="btn btn-default" title={group.name}>
         {group.name}
         </div>
        )
      );
    };
    const styles = require('./User-View-Row.scss');
    return (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td><span title={user.username}>{user.username && (user.username.length > 40 ? user.username.substring(0, 40) + '...' : user.username)}</span></td>
        {/* <td>{user.className}</td> */}
        <td>
          {handleRole(user.role)}
          {/* {user.roles &&
            handleRoles(user.roles)} */}
          {/* {
            <button className="btn btn-dashed" title="Add role">
              <span className="glyphicon glyphicon-plus"></span>
            </button>
          } */}
        </td>
        <td>{user.email}</td>
        <td>
        {/* {handleGroups(user.groups)} */}
        </td>
        <td className="row">
          <ButtonGroup className={styles.groupButtonCol}>
            <span>
              <DropdownButton id="actionDropdown" className={'item-action ' + styles.dropdownIcon} title={<Glyphicon glyph="option-vertical" />}>
                <Permissions allowed={['User_Edit']}>
                <Dropdown.Item onClick={()=> this.props.onClickEdit(user)}><span className={'glyphicon glyphicon-edit'}></span> Edit</Dropdown.Item>
                </Permissions>
                {/* <Dropdown.Item onClick={()=> this.props.onClickEditDetail(user)}><span className={'glyphicon glyphicon-edit'}></span> Edit Detail</Dropdown.Item> */}
                <Permissions allowed={['UserPermission_View']}>
                <Dropdown.Item href={'/user-permission-manage/' + user.id}><span className={'glyphicon glyphicon-user'}></span> View Permissions</Dropdown.Item>
                </Permissions>
                {/* <Confirm
                  onConfirm={()=> this.props.onClickDelete(user)}
                  body="Are you sure you want to delete this?"
                  confirmText="Confirm Delete"
                  title="Deleting Item">
                  <Dropdown.Item><span className={'glyphicon glyphicon-remove'}></span> Remove</Dropdown.Item>
                </Confirm> */}
              </DropdownButton>
            </span>
          </ButtonGroup>

        </td>
      </tr>
    );
  }
}
