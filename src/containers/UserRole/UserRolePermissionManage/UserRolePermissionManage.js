import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as notificationActions from 'redux/modules/notification';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userRoleManageActions from 'redux/modules/user-role/user-role-manage';
import * as userPermissionManageActions from 'redux/modules/user-permission/user-permission-manage';
import * as globalPermissionManageActions from 'redux/modules/global-permission/global-permission-manage';
import * as userRolePermissionManageActions from 'redux/modules/user-role/user-role-permission-manage';
import * as userPermissionActionManageActions from 'redux/modules/user-permission/user-permission-action-manage';
import * as userPermissionSubjectManageActions from 'redux/modules/user-permission/user-permission-subject-manage';

import { initializeWithKey } from 'redux-form';
import { UserPermissionFormNewRow, UserPermissionFormEditRow, UserPermissionFormEdit, UserPermissionViewRow, UserPermissionConfigFormNewRow, UserPermissionConfigFormEditRow, UserPermissionConfigViewRow, PermissionMatrixView, PermissionMatrixEdit } from 'components';
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

const userRolePermissionKey = (userRolePermission) => 'userRolePermission_' + userRolePermission.subjectId + '_' + userRolePermission.actionId;

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
    listData: state.userRolePermissionManage.listAll,
    listDataGlobal: state.globalPermissionManage.listAll,
    listSubject: state.userPermissionSubjectManage.listAll,
    listAction: state.userPermissionActionManage.listAll,
    total: state.userRolePermissionManage.total,
    currentPage: state.userRolePermissionManage.currentPage,
    editing: state.userRolePermissionManage.editing,
    loading: state.userRolePermissionManage.loading,
    error: state.userRolePermissionManage.error,
    errorMessage: state.userRolePermissionManage.errorMessage,
    isError: state.userRolePermissionManage.isError,
    userRoleEntry: state.userRoleManage.entry,
  }),
  {
    ...userRolePermissionManageActions,
    loadAllGlobalPermission: globalPermissionManageActions.loadAll,
    loadAllUserRoles: userRoleManageActions.loadAll,
    loadAllUserRolePermissions: userRolePermissionManageActions.loadAll,
    loadUserRoleById: userRoleManageActions.loadById,
    loadListSubject: userPermissionSubjectManageActions.loadAll,
    loadListAction: userPermissionActionManageActions.loadAll,
    ...notificationActions
  })
export default class UserRolePermissionManage extends Component {
  static propTypes = {
    listData: PropTypes.array,
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
    loadAllUserRolePermissions: PropTypes.func,
    loadAllGlobalPermission: PropTypes.func,
    loadUserRoleById: PropTypes.func,
    loadListSubject: PropTypes.func,
    loadListAction: PropTypes.func,
    params: PropTypes.object,
    total: PropTypes.number,
    currentPage: PropTypes.number,
    error: PropTypes.any,
    clearError: PropTypes.func,
    userRoleEntry: PropTypes.object,
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
      isShowList: false,
      isEditingMode: false
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
    this.reloadPage();
  }

  componentWillReceiveProps(nextProps) {
    watchForError(this.props, nextProps, 'UserRolePermissionManage');
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
    // this.search(this.state.current);
    if (this.props.params && this.props.params.roleId) {
      this.props.loadAllGlobalPermission();
      this.props.loadListSubject();
      this.props.loadListAction();
      this.props.loadUserRoleById(this.props.params.roleId);
      this.props.loadAllUserRolePermissions(this.props.params.roleId);
    }
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
      editItemStart(userRolePermissionKey(user), { display });
    } else {
      editItemStop(userRolePermissionKey(user), { display });
    }
  }
  handleEditMode(status) {
    this.setState({
      isEditingMode: status
    });
  }

  render() {
    const { listData, listDataGlobal, listSubject, listAction, userRoleEntry, error, editing, loading } = this.props;

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
    const permissionMatrixRole = createPermissionMatrix(listData, permissionMatrixGlobal);
    // console.log('permissionMatrixGlobal', permissionMatrixRole);
    // console.log('permissionMatrixRole', permissionMatrixRole);
    const isEditing = (key) => {
      return editing[key];
    };
    const getEdittingConfig = (key) => {
      return editing[key] ? editing[key] : { display: 'row' };
    };
    const showEditForm = (userRolePermission) => {
      return (
        <UserPermissionConfigFormEditRow form={userRolePermissionKey(userRolePermission)} key={userRolePermissionKey(userRolePermission)} initialValues={userRolePermission} scopeName={'role'} userRoleId={this.props.params.roleId}
        onClickCancel={()=>this.handleEdit(userRolePermission, false)}
        onSubmitFinishedAction={()=>{
          this.handleEdit(userRolePermission, false);
          this.reloadPage();
        }}
      />
      );
    };
    const showViewForm = (userRolePermission) => {
      return (
        <UserPermissionConfigViewRow key={userRolePermissionKey(userRolePermission)} userPermission={userRolePermission} scopeName={'role'} userRoleId={this.props.params.roleId}
          onClickEdit={()=>this.handleEdit(userRolePermission, true)}
          // onClickDelete={()=>this.handleDelete(userRolePermission)}
        />
      );
    };
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    return (
      <div>
        <section className={'section section-header section-primary'}>
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <h1 className="section-header-title"><a style={{color: 'inherit', textDecoration: 'none'}} href="/user-role-manage"><i className={'glyphicon glyphicon-chevron-left'}></i>User Role</a> : {userRoleEntry && userRoleEntry.name} </h1>
                <h2 className="section-header-subtitle">Permissions</h2>
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
                  <i className="glyphicon glyphicon-user"/> Manage RolePermission Actions
                </a>
                <a className="btn btn-default" href="/user-permission-subject-manage">
                  <i className="glyphicon glyphicon-user"/> Manage RolePermission Subjects
                </a>
              </div>

              <div className="btn-group pull-right">
                <a className="btn btn-default" href="/user-permission-manage">
                  <i className="glyphicon glyphicon-user"/> Manage Global RolePermission
                </a>
              </div>
            </div>
            {this.state.isShowList ?
            <div>
              <div className="row">
                <h4>Role permission list <a className="btn btn-default" onClick={ ()=>{ this.setState({isShowList: false}); }}>View as Matrix</a></h4>
                <div className="btn-group pull-right">
                  <Permissions allowed={['UserPermission_Create']}>
                  <button className="btn btn-primary" onClick={this.handleAdd}>
                    <i className="glyphicon glyphicon-plus"/> Add
                  </button>
                  </Permissions>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      {/* <th>Name</th> */}
                      {/* <th>Descriptions</th> */}
                      <th>Subject</th>
                      <th>Action</th>
                      <th>Enable</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listData && this.state.isAddingNew &&
                      <UserPermissionConfigFormNewRow initialValues={{}} dataEntry={{}} scopeName={'role'} userRoleId={this.props.params.roleId}
                        onClickCancel={()=>this.handleAdd(false)}
                        onSubmitFinishedAction={()=>{
                          this.handleAdd(false);
                          this.reloadPage();
                        }}/>
                    }

                    {listData && listData.length > 0 ?
                      listData.map((userRolePermission) =>
                        isEditing(userRolePermissionKey(userRolePermission)) ?
                        showEditForm(userRolePermission)
                        :
                        showViewForm(userRolePermission))
                      :
                      <tr>
                        <td colSpan="100%">
                          <div style={{textAlign: 'center'}}>
                            <h4>No entry with this search condition <small>at page ({this.state.current + 1}).</small></h4>
                          </div>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
                {/* <Pager
                total={this.state.totalPage}
                current={this.state.current}
                visiblePages={this.state.visiblePage}
                titles={{
                  first: 'First',
                  prev: '\u00AB',
                  prevSet: '...',
                  nextSet: '...',
                  next: '\u00BB',
                  last: 'Last'
                }}
                className="pagination-sm pull-right"
                onPageChanged={this.handlePageChanged}
              /> */}
            </div>
            :
            <div>
              <h4>Role permission matrix <a className="btn btn-default" onClick={ ()=>{ this.setState({isShowList: true}); }}>View as list</a></h4>
              {this.state.isEditingMode ?
              <PermissionMatrixEdit listSubject={ listSubject } listAction={ listAction } permissions={listData} permissionMatrix={permissionMatrixRole} checkPropName={'enable'} scopeName={'role'} initialValues={permissionMatrixRole} userRoleId={this.props.params.roleId} isSaveReduced={true}
                onClickCancel={()=>this.handleEditMode(false)}
                onSubmitFinishedAction={()=>{
                  this.handleEditMode(false);
                  this.reloadPage();
                }}/>
              :
              <PermissionMatrixView listSubject={ listSubject } listAction={ listAction} permissions={listData} permissionMatrix={permissionMatrixRole} checkPropName={'enable'} scopeName={'role'} userRoleId={this.props.params.roleId}
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

