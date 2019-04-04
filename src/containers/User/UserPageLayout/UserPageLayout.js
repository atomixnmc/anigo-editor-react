import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import {
  Login,
  LoginSuccess,
  Register,
  UserProfile,
  ChangePassword,
  UserManage,
  UserDetail,
  UserEdit,
  UserRoleAssign,
  UserRoleManage,
  // UserRoleDetail,
  // UserRoleEdit,
  UserRolePermissionManage,
  UserGroupAssign,
  UserGroupManage,
  UserGroupDetail,
  UserGroupEdit,
  UserPermissionManage,
  UserPermissionDetail,
  UserPermissionEdit,
  UserPermissionActionManage,
  UserPermissionSubjectManage,
} from './containers';

import * as notificationActions from 'redux/modules/notification';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({
    user: state.auth.user,
    userPermissions: state.permissions
  }),
  {
    ...authActions
  })
export default class AdminLayout extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    user: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object
  };
  render() {
    return (
      <Permissions allowed={['User_List']}>
      <Route path="user-manage" component={UserManage}/>
      </Permissions>
      <Permissions allowed={['User_View Content']}>
      <Route path="user-detail/:userId" component={UserDetail}/>
      </Permissions>
      <Permissions allowed={['User_Edit']}>
      <Route path="user-edit/:userId" component={UserEdit}/>
      </Permissions>
      <Route path="user-role-assign/:userId" component={UserRoleAssign}/>
      <Permissions allowed={['UserRole_List']}>
      <Route path="user-role-manage" component={UserRoleManage}/>
      </Permissions>
      <Permissions allowed={['UserRole_View Content']}>
      <Route path="user-role-detail/:roleId" component={UserRoleDetail}/>
      </Permissions>
      <Permissions allowed={['UserPermission_List']}>
      <Route path="user-role-permission/:roleId" component={UserRolePermissionManage}/>
      </Permissions>
      <Permissions allowed={['UserPermission_List']}>
      <Route path="user-permission-manage" component={UserPermissionManage}/>
      </Permissions>
      <Permissions allowed={['UserPermission_List']}>
      <Route path="user-permission-manage/:userId" component={UserPermissionManage}/>
      </Permissions>
      <Permissions allowed={['UserPermission_Edit']}>
      <Route path="user-permission-edit/:permissionId" component={UserPermissionEdit}/>
      </Permissions>
      <Permissions allowed={['UserPermission_View Content']}>
      <Route path="user-permission-detail/:permissionId" component={UserPermissionDetail}/>
      </Permissions>
      <Permissions allowed={['UserPermission_View Content']}>
      <Route path="user-permission-action-manage" component={UserPermissionActionManage}/>
      </Permissions>
      <Permissions allowed={['UserPermission_View Content']}>
      <Route path="user-permission-subject-manage" component={UserPermissionSubjectManage}/>
      </Permissions>
      <Permissions allowed={['UserGroup_List']}>
      <Route path="user-group-assign/:userId" component={UserGroupAssign}/>
      </Permissions>
      <Permissions allowed={['UserGroup_List']}>
      <Route path="user-group-manage" component={UserGroupManage}/>
      </Permissions>
      <Permissions allowed={['UserGroup_View Content']}>
      <Route path="user-group-detail/:userGroupId" component={UserGroupDetail}/>
      </Permissions>
      <Permissions allowed={['UserGroup_Edit']}>
      <Route path="user-group-edit/:userId" component={UserGroupEdit}/>
      </Permissions>        
      );
    }
  }
    