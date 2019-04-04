import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as permissions } from 'react-redux-permissions';
import { reducer as form } from 'redux-form';
import { connectRouter } from 'connected-react-router';

import auth from './auth';
import notification from './notification';
import dashboard from './dashboard/dashboard';
import profile from './user/user-profile';
// import report from './report/report';
import userManage from './user/user-manage';
import userGroupManage from './user-group/user-group-manage';
import userRoleManage from './user-role/user-role-manage';

import userRolePermissionManage from './user-role/user-role-permission-manage';
import globalPermissionManage from './global-permission/global-permission-manage';
import userPermissionManage from './user-permission/user-permission-manage';
import userPermissionEdit from './user-permission/user-permission-edit';
import userPermissionActionManage from './user-permission/user-permission-action-manage';
import userPermissionSubjectManage from './user-permission/user-permission-subject-manage';

import adminSystemManage from './admin/admin-system-manage';

import projectManage from './project/project-manage';
import clipManage from './clip/clip-manage';

export default (history) => combineReducers({
  router: connectRouter(history),
  reduxAsyncConnect,
  auth,
  notification,
  dashboard,
  form,
  userManage,
  userRoleManage,
  userRolePermissionManage,
  userGroupManage,
  globalPermissionManage,
  userPermissionManage,
  userPermissionEdit,
  userPermissionActionManage,
  userPermissionSubjectManage,
  permissions,
  profile,
  adminSystemManage,
  projectManage,
  clipManage
  // report
});
