import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as notificationActions from 'redux/modules/notification';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userRoleManageActions from 'redux/modules/user-role/user-role-manage';
import * as userPermissionManageActions from 'redux/modules/user-permission/user-permission-manage';
import * as globalPermissionManageActions from 'redux/modules/global-permission/global-permission-manage';
import * as userPermissionActionManageActions from 'redux/modules/user-permission/user-permission-action-manage';
import * as userPermissionSubjectManageActions from 'redux/modules/user-permission/user-permission-subject-manage';
import { initializeWithKey } from 'redux-form';
import { UserPermissionFormNewRow, UserPermissionFormEditRow, UserPermissionFormEdit, UserPermissionViewRow, PermissionMatrixView, PermissionMatrixEdit } from 'components';
import { asyncConnect } from 'redux-connect';
import { ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import { LinkContainer } from 'react-router-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import Pager from 'react-pager';
import { renderInput, optionsTransform, optionsTransform2, optionsChange } from 'utils/formUtil';
import * as lodash from 'lodash';
import { getErrorMessage, watchForError } from 'utils/errorParse';
import Permissions from 'react-redux-permissions';

const userPermissionKey = (userPermission) => 'userPermission_' + userPermission.id;

// @asyncConnect([{
//   deferred: true,
//   promise: ({ store: { dispatch, getState }, params: { } }, ) => {
//     if (!isLoaded(getState())) {
//       return dispatch(loadPage(0, 10));
//     }
//   }
// }])
@connect(
  state => ({
    user: state.userManage.data,
    listData: state.userPermissionManage.list,
    listDataAll: state.userPermissionManage.listAll,
    listDataGlobal: state.globalPermissionManage.listAll,
    listSubject: state.userPermissionSubjectManage.listAll,
    listAction: state.userPermissionActionManage.listAll,
    total: state.userPermissionManage.total,
    currentPage: state.userPermissionManage.currentPage,
    editing: state.userPermissionManage.editing,
    loading: state.userPermissionManage.loading,
    error: state.userPermissionManage.error,
    errorMessage: state.userPermissionManage.errorMessage,
    isError: state.userPermissionManage.isError,
  }),
  {
    ...userPermissionManageActions,
    loadListSubject: userPermissionSubjectManageActions.loadAll,
    loadListAction: userPermissionActionManageActions.loadAll,
    loadAllGlobalPermission: globalPermissionManageActions.loadAll,
    loadUserById: userManageActions.loadById,
    ...notificationActions
  })
export default class UserPermissionManage extends Component {
  static propTypes = {
    user: PropTypes.object,
    listData: PropTypes.array,
    listDataAll: PropTypes.array,
    listDataGlobal: PropTypes.array,
    listSubject: PropTypes.array,
    listAction: PropTypes.array,
    loading: PropTypes.bool,
    editing: PropTypes.object,
    editItemStart: PropTypes.func,
    editItemStop: PropTypes.func,
    deleteItem: PropTypes.func,
    load: PropTypes.func,
    loadPage: PropTypes.func,
    loadListSubject: PropTypes.func,
    loadListAction: PropTypes.func,
    loadAllGlobalPermission: PropTypes.func,
    loadUserById: PropTypes.func,
    params: PropTypes.object,
    total: PropTypes.number,
    currentPage: PropTypes.number,
    error: PropTypes.any,
    clearError: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.handlePageChanged = this.handlePageChanged.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditMode = this.handleEditMode.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      total: 5,
      totalPage: 5,
      current: 1,
      visiblePage: 3,
      title: '',
      isEditingMode: false,
      // selectedRole: null,
      // selectedRoleId: 0
    };
  }

  componentWillMount() {
    this.props.loadAllGlobalPermission();
    this.props.loadListSubject();
    this.props.loadListAction();
  }

  componentDidMount() {
    this.state.current = 0;
    this.state.visiblePage = 5;
    // this.props.loadRole();
    // this.props.loadPage(this.state.current, 10, this.state.selectedRoleId, this.state.newTitle);
    this.reloadPage();
    // this.state.totalPage = Math.ceil(this.props.total / 10);
  }

  componentWillReceiveProps(nextProps) {
    watchForError(this.props, nextProps, 'UserPermissionManage');
    this.props.clearError();
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.totalPage = Math.ceil(nextProps.total / 10);
  }

  search(pageNum) {
    // this.props.loadPage(this.state.current, 10, this.state.selectedRoleId);
    this.state.current = pageNum !== undefined && lodash.isNumber(pageNum) ? pageNum : 0;
    this.props.loadPage(this.state.current, 10);
  }
  reloadPage() {
    // this.setState({ current: 0 });
    this.props.loadAllGlobalPermission();
    this.props.loadListSubject();
    this.props.loadListAction();
    if (this.props.params.userId) {
      this.props.loadUserById(this.props.params.userId);
    }
    this.search(this.state.current);
  }
  handlePageChanged(pageNum) {
    const newPage = pageNum > 0 ? pageNum : 0;
    this.setState({ current: newPage });
    this.props.loadPage(newPage, 10);
  }

  handleAdd(status) {
    if (status) {
      this.setState({ isAddingNew: true });
    } else {
      this.setState({ isAddingNew: false });
    }
  }

  handleDelete(user) {
    const { deleteItem } = this.props; // eslint-disable-line no-shadow

    deleteItem(user.id)
    .then(() => {
      this.reloadPage();
    });
  }

  handleEdit(user, status = true, display = 'row') {
    const {editItemStart, editItemStop} = this.props;
    if (status) {
      editItemStart(userPermissionKey(user), { display });
    } else {
      editItemStop(userPermissionKey(user), { display });
    }
  }
  handleEditMode(status) {
    this.setState({
      isEditingMode: status
    });
  }

  render() {
    const { user, listData, listDataAll, listDataGlobal, listSubject, listAction, error, editing, loading } = this.props;
    // const permissions = listDataGlobal;
    const isEditing = (key) => {
      return editing[key];
    };
    const getEdittingConfig = (key) => {
      return editing[key] ? editing[key] : { display: 'row' };
    };
    const showEditForm = (userPermission) => {
      return (
      <UserPermissionFormEditRow form={userPermissionKey(userPermission)} key={userPermissionKey(userPermission)} initialValues={userPermission}
        onClickCancel={()=>this.handleEdit(userPermission, false)}
        onSubmitFinishedAction={()=>{
          this.handleEdit(userPermission, false);
          this.reloadPage();
        }}
      />
      );
    };
    const showViewForm = (userPermission) => {
      return (
        <UserPermissionViewRow key={userPermissionKey(userPermission)} userPermission={userPermission}
          onClickEdit={()=>this.handleEdit(userPermission, true)}
          // onClickDelete={()=>this.handleDelete(user)}
        />
      );
    };
    const createPermissionMatrix = (listPermissions, globalMatrix) => {
      let permissionMatrix = {};
      listSubject.forEach(subject=>{
        permissionMatrix['s_' + subject.id] = {};
        listAction.forEach(action=>{
          let permissionConfig = { subjectId: subject.id, actionId: action.id};
          let userPermission = lodash.find(listPermissions, permissionConfig);
          if (globalMatrix) { // NOTE: Has Global Maxtrix reference!!
            let globalMatrixCell = globalMatrix['s_' + subject.id]['a_' + action.id];
            if (globalMatrixCell) {
              permissionConfig.available = globalMatrixCell.available;
            } else {
              permissionConfig.available = false;
            }
            if (userPermission) {
              permissionConfig.enable = userPermission.enable;
            } else {
              permissionConfig.enable = false;
            }
          } else {
            if (userPermission) {
              permissionConfig.available = userPermission.available;
              // permissionConfig.enable = userPermission.enable;
            } else {
              permissionConfig.available = false;
              // permissionConfig.enable = false;
            }
          }
          permissionMatrix['s_' + subject.id]['a_' + action.id] = permissionConfig;
        });
      });
      return permissionMatrix;
    };
    const permissionMatrixGlobal = createPermissionMatrix(listDataGlobal);
    const permissionMatrixUser = createPermissionMatrix(listData, permissionMatrixGlobal);

    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./UserPermissionManage.scss');
    return (
      <div>
        <section className={'section section-header section-primary ' + styles.pageHeader}>
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <h1 className="section-header-title">User Permissions</h1>
                <h2 className="section-header-subtitle">User Permissions Management</h2>
                {error &&
                  <div className="alert alert-danger" role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    {' '}
                    {error}
                  </div>}
              </div>
              <div className="col-sm-6">
              </div>
            </div>
          </div>
        </section>
        <section className="section section-content">
          <div className="container">

            <div className="row">
                <div className="btn-group pull-left">
                  <a className="btn btn-default" href="/user-permission-action-manage">
                    <i className="glyphicon glyphicon-user"/> Manage Permission Actions
                 </a>
                  <a className="btn btn-default" href="/user-permission-subject-manage">
                    <i className="glyphicon glyphicon-user"/> Manage Permission Subjects
                 </a>
                </div>
                {this.props.params.userId &&
                <div className="btn-group pull-right">
                  <a className="btn btn-default" href="/user-permission-manage">
                    <i className="glyphicon glyphicon-user"/> Manage Global Permission
                 </a>
                </div>
                }
            </div>
            {
              this.props.params.userId && user &&
              <div className="well section">
                <p>Username: <b>{user.username}</b></p>
                { user.role && <p>Role: <b>{user.role.name}</b> <a className="btn btn-default" href={'/user-role-permission/' + user.role.id}>Role permissions</a></p> }
              </div>
            }
             {this.props.params.userId ?
            <div className="row">
            </div>
            :
            <div>
              <h4>Global permission matrix</h4>
              <hr/>
              {this.state.isEditingMode ?
              <PermissionMatrixEdit listSubject={ null } listAction={null} permissions={listDataGlobal} permissionMatrix={permissionMatrixGlobal} checkPropName={'available'} scopeName={'global'} initialValues={permissionMatrixGlobal}
                onClickCancel={()=>this.handleEditMode(false)}
                onSubmitFinishedAction={()=>{
                  this.handleEditMode(false);
                  this.reloadPage();
                }}/>
              :
              <PermissionMatrixView listSubject={ null } listAction={null} permissions={listDataGlobal} permissionMatrix={permissionMatrixGlobal} checkPropName={'available'} scopeName={'global'}
                onClickEdit={()=>this.handleEditMode(true)}
              />
              }
            </div>
            } 
          </div>
        </section>
      </div>
    );
  }
}

