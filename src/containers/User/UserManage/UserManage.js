import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as lodash from 'lodash';

import { initializeWithKey } from 'redux-form';
import { asyncConnect } from 'redux-connect';
import { ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import { LinkContainer } from 'react-router-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import Pager from 'react-pager';
import Permissions from 'react-redux-permissions';

import { UserFormNewRow, UserFormEditRow, UserViewRow } from 'components';
import { renderInput, optionsTransform, optionsTransform2, optionsChange } from 'utils/formUtil';
import { emptyPaginationState, validatePaginationState, handlePageSizeOptions, PagerWithSize, handlePageChangedUpdate, detectPageUpdate } from 'utils/paginationUtil';
import { getErrorMessage, watchForError } from 'utils/errorParse';
import * as notificationActions from 'redux/modules/notification';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userRoleManageActions from 'redux/modules/user-role/user-role-manage';
import { isLoaded, loadPage } from 'redux/modules/user/user-manage';

const userKey = (user) => 'user_' + user.id;

@asyncConnect([{
  deferred: true,
  promise: ({ store: { dispatch, getState }, params: { } }, ) => {
    if (!isLoaded(getState())) {
      return dispatch(loadPage(0, 10));
    }
  }
}])
@connect(
  state => ({
    listUser: state.userManage.listPage,
    editing: state.userManage.editing,
    loading: state.userManage.loading,
    newId: state.userManage.newId,
    successId: state.userManage.successId,
    successSuiteId: state.userManage.successSuiteId,
    error: state.userManage.error,
    errorMessage: state.userManage.errorMessage,
    isError: state.userManage.isError,
    listRole: state.userRoleManage.listAll,
    userStatistic: state.userManage.userStatistic,
    paginationUser: state.userManage.paginationUser,
    // roleId: state.userManage.roleId
  }),
  {
    ...userManageActions,
    ...notificationActions,
    loadUserRole: userRoleManageActions.loadAll,
    loadUserStatistic: userManageActions.loadUserStatistic
  })
export default class UserManage extends Component {
  static propTypes = {
    listUser: PropTypes.array,
    listRole: PropTypes.array,
    testSession: PropTypes.array,
    loading: PropTypes.bool,
    editing: PropTypes.object,
    editItemStart: PropTypes.func,
    editItemStop: PropTypes.func,
    load: PropTypes.func,
    loadPage: PropTypes.func,
    newId: PropTypes.number,
    params: PropTypes.object,
    deleteItem: PropTypes.func,
    successId: PropTypes.bool,
    successSuiteId: PropTypes.number,
    error: PropTypes.any,
    clearError: PropTypes.func,
    checkTestSuite: PropTypes.func,
    loadUserRole: PropTypes.func,
    loadUserStatistic: PropTypes.func,
    userStatistic: PropTypes.object,
    paginationUser: PropTypes.object,
    // roleId: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.handlePageChanged = this.handlePageChanged.bind(this);
    this.handleRoleChanged = this.handleRoleChanged.bind(this);
    this.handleTitleChanged = this.handleTitleChanged.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      paginationUser: emptyPaginationState(),
      editing: {},
      title: '',
      selectedRole: null,
      selectedRoleId: 0
    };
  }

  componentWillMount() {
    this.props.loadUserRole();
    this.props.loadUserStatistic();
    // this.props.loadUserGroup();
  }

  componentDidMount() {
    this.reloadPage();
  }

  componentWillReceiveProps(nextProps) {
    watchForError(this.props, nextProps, 'UserManage');
    // this.props.clearError();
    detectPageUpdate(nextProps.paginationUser, this.state.paginationUser,
      (newPagination)=>{
        console.log('detectPageUpdate newPagination', newPagination);
        this.setState({
          paginationUser: newPagination
        });
      },
    (newPageNum, newPageSize, newTotal)=>{
      this.reloadPageData(newPageNum, newPageSize);
    });
  }

  componentWillUpdate(nextProps, nextState) {
  }

  search(pageNum) {
    this.reloadPageData(this.state.paginationUser.current, 10, this.state.selectedRoleId, this.state.title);
  }
  reloadPageData(pageNum = 0, pageSize, selectedRoleId, title) {
    this.props.loadPage(
      lodash.isNumber(pageNum) ? pageNum : this.state.paginationUser.current,
      lodash.isNumber(pageSize) ? pageSize : this.state.paginationUser.pageSize,
      selectedRoleId || this.state.selectedRoleId,
      title || this.state.title );
  }
  reloadPage() {
    this.setState({ isAddingNew: false });
    this.reloadPageData();
  }
  handlePageChanged(pageNum, pageSize) {
    handlePageChangedUpdate(this.state.paginationUser, pageNum, pageSize, (newPagination)=>{
      console.log('handlePageChanged newPagination', newPagination);
      this.setState({
        paginationUser: newPagination
      }, ()=>{
        this.reloadPageData(pageNum, pageSize);
      });
    });
  }

  handleRoleChanged(newRole) {
    let changes = { selectedRole: newRole, selectedRoleId: newRole ? newRole.id : 0 };
    this.setState(changes, ()=>{
      this.reloadPageData(null, null, changes.selectedRoleId, null);
    });
  }

  handleTitleChanged(event) {
    let newTitle = event.target.value;
    this.setState({ title: newTitle }, ()=>{
      this.reloadPageData(null, null, null, newTitle);
    });
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

  handleEdit(user, status = true) {
    let key = userKey(user);
    const newEditing = {...this.state.editing, [key]: status};
    this.setState({ editing: newEditing });
  }

  render() {
    const { listUser, userStatistic, error, loading } = this.props;

    const isEditing = (key) => {
      return this.state.editing[key];
    };
    const listRoleWithAll = lodash.clone(this.props.listRole);
    if (listRoleWithAll) {
      listRoleWithAll.splice(0, 0, {id: 0, name: 'All'});
      if (!this.state.selectedRole) {
        this.state.selectedRole = listRoleWithAll[0];
      }
    }
    const listRoleOptionsWithAll = optionsTransform(listRoleWithAll, null, 'id', 'name');

    const handleRoleOptions = (value) => {
      return optionsTransform(listRoleOptionsWithAll, value);
    };
    const handleRoleOptionsChange = (selectedOptions) => {
      optionsChange(listRoleWithAll, selectedOptions, (newData)=> {
        this.handleRoleChanged(newData);
      });
    };

    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./UserManage.scss');
    return (
      <div>
        <section className={'section section-header section-primary ' + styles.pageHeader}>
          <div>
            <div className="row">
              <div className="col-sm-6">
                {/* <h1 className="section-header-title">Users</h1> */}
                <h3>Users Management</h3>
                <h4>Total users: <b>{userStatistic.total}</b> Active: <b>{userStatistic.active}</b> Inactive: <b>{userStatistic.inactive}</b></h4>
                {error &&
                  <div className="alert alert-danger" role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    {' '}
                    {error}
                  </div>}
              </div>
              <Permissions allowed={['User_Search']}>
              <div className="col-sm-6">
                <div className="input-group">
                  <input className="form-control" placeholder="Search by keyword" onChange={ this.handleTitleChanged }/>
                    <div className="input-group-btn">
                    <Button className="btn btn-default item-action" onClick={ this.search } >
                      <span className="glyphicon glyphicon-search"></span>
                    </Button>
                    <small></small>
                  </div>
                </div>
                <div style={{paddingTop: '10px', color: '#333'}}>
                  {/* <DropdownButton id="roleDropDown" className={'item-action ' + styles.dropdownIcon} title={<Glyphicon glyph="option-vertical" />}> */}
                  {/* </DropdownButton> */}
                  <Select
                    name="filter-role"
                    options={handleRoleOptions()}
                    value={handleRoleOptions(this.state.selectedRole)}
                    onChange={handleRoleOptionsChange}
                    placeholder="Select role"
                    closeOnSelect={"false"}
                  />
                </div>
              </div>
              </Permissions>
            </div>
          </div>
        </section>
        <section className="section section-content">
          <div>

            <div className="row">
              <div className="btn-group pull-left">
                <Permissions allowed={['UserRole_List']}>
                <a className="btn btn-default" href="/user-role-manage">
                  <i className="glyphicon glyphicon-user"/> Manage Roles
                </a>
                </Permissions>
                <Permissions allowed={['UserPermission_List']}>
                <a className="btn btn-default" href="/user-permission-manage">
                  <i className="glyphicon glyphicon-user"/> Manage Permissions
                </a>
                </Permissions>
                <Permissions allowed={['UserGroup_List']}>
                <a className="btn btn-default" href="/user-group-manage">
                  <i className="glyphicon glyphicon-user"/> Manage Groups
                </a>
                </Permissions>
              </div>
              <div className="btn-group pull-right">
                <Permissions allowed={['User_Create']}>
                <button className="btn btn-primary" onClick={this.handleAdd}>
                  <i className="glyphicon glyphicon-plus" /> Add
                </button>
                </Permissions>
              </div>
            </div>
            <div className="row">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Group</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listUser && this.state.isAddingNew &&
                    <UserFormNewRow initialValues={{}} dataEntry={{}}
                      onClickCancel={()=>this.handleAdd(false)}
                      onSubmitFinishedAction={()=>{
                        this.handleAdd(false);
                        this.reloadPage();
                      }}/>
                  }

                  {listUser && listUser.length > 0 ?
                    listUser.map((user) =>
                      isEditing(userKey(user)) ?
                      <UserFormEditRow form={userKey(user)} key={userKey(user)} initialValues={user}
                        onClickCancel={()=>this.handleEdit(user, false)}
                        onSubmitFinishedAction={()=>{
                          this.handleEdit(user, false);
                          this.reloadPage();
                        }}
                      />
                      :
                      <UserViewRow key={userKey(user)} user={user}
                        onClickEdit={()=>this.handleEdit(user, true)}
                        // onClickDelete={()=>this.handleDelete(user)}
                      />)
                    :
                    <tr>
                      <td colSpan="100%">
                        <div style={{textAlign: 'center'}}>
                          <h4>No entry with this search condition <small>at page ({this.state.paginationUser.current + 1}).</small></h4>
                          <p>
                            Please change condition & click <b>Search Button</b>
                          <Button className="btn btn-default item-action" onClick={ this.search } >
                            <span className="glyphicon glyphicon-search"></span>
                          </Button> again!</p>
                        </div>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
            <Pager
              total={this.state.paginationUser.totalPage}
              current={this.state.paginationUser.current}
              visiblePages={this.state.paginationUser.visiblePage}
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
            />
          </div>
        </section>
      </div>
    );
  }
}

