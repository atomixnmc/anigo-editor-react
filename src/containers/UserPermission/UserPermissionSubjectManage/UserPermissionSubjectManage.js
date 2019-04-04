import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as notificationActions from 'redux/modules/notification';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userRoleManageActions from 'redux/modules/user-role/user-role-manage';
import * as userPermissionManageActions from 'redux/modules/user-permission/user-permission-manage';
import * as userPermissionActionManageActions from 'redux/modules/user-permission/user-permission-action-manage';
import * as userPermissionSubjectManageActions from 'redux/modules/user-permission/user-permission-subject-manage';

import { initializeWithKey } from 'redux-form';
import { UserPermissionSubjectFormNewRow, UserPermissionSubjectFormEditRow, UserPermissionSubjectViewRow } from 'components';
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

const userPermissionSubjectKey = (userPermissionSubject) => 'userPermissionSubject_' + userPermissionSubject.id;

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
    listData: state.userPermissionSubjectManage.list,
    total: state.userPermissionSubjectManage.total,
    currentPage: state.userPermissionSubjectManage.currentPage,
    editing: state.userPermissionSubjectManage.editing,
    loading: state.userPermissionSubjectManage.loading,
    error: state.userPermissionSubjectManage.error,
    errorMessage: state.userPermissionSubjectManage.errorMessage,
    isError: state.userPermissionSubjectManage.isError
  }),
  {
    ...userPermissionSubjectManageActions,
    ...notificationActions
  })
export default class UserPermissionManage extends Component {
  static propTypes = {
    listData: PropTypes.array,
    loading: PropTypes.bool,
    editing: PropTypes.object,
    editItemStart: PropTypes.func,
    editItemStop: PropTypes.func,
    deleteItem: PropTypes.func,
    load: PropTypes.func,
    loadPage: PropTypes.func,
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
    this.search = this.search.bind(this);
    this.state = {
      total: 5,
      totalPage: 5,
      current: 7,
      visiblePage: 3,
      title: '',
    };
  }

  componentWillMount() {
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
    this.props.loadPage(this.state.current);
  }
  reloadPage() {
    // this.setState({ current: 0 });
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

  handleEdit(user, status = true) {
    const {editItemStart, editItemStop} = this.props;
    if (status) {
      editItemStart(userPermissionSubjectKey(user));
    } else {
      editItemStop(userPermissionSubjectKey(user));
    }
  }

  render() {
    const { listData, error, editing, loading } = this.props;

    const isEditing = (key) => {
      return editing[key];
    };

    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    return (
      <div>
        <section className={'section section-header section-primary '}>
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
              <h1 className="section-header-title"><a style={{color: 'inherit', textDecoration: 'none'}} href="/user-permission-manage"><i className={'glyphicon glyphicon-chevron-left'}></i>User Permissions</a></h1>
                <h2 className="section-header-subtitle">Subjects - <a className={'small'} style={{color: 'inherit', textDecoration: 'none'}} href="/user-permission-action-manage">Actions</a></h2>
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
                <div className="btn-group pull-right">
                  <Permissions allowed={['UserPermission_Create']}>
                  <button className="btn btn-primary" onClick={this.handleAdd}>
                    <i className="glyphicon glyphicon-plus"/> Add
                  </button>
                  </Permissions>
                </div>
            </div>
            <div className="row">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Descriptions</th>
                    {/* <th>Actors</th> */}
                    <th>Privacy Level</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listData && this.state.isAddingNew &&
                    <UserPermissionSubjectFormNewRow initialValues={{}} dataEntry={{}}
                      onClickCancel={()=>this.handleAdd(false)}
                      onSubmitFinishedAction={()=>{
                        this.handleAdd(false);
                        this.reloadPage();
                      }}/>
                  }

                  {listData && listData.length > 0 ?
                    listData.map((userPermissionSubject) =>
                      isEditing(userPermissionSubjectKey(userPermissionSubject)) ?
                      <UserPermissionSubjectFormEditRow form={userPermissionSubjectKey(userPermissionSubject)} key={userPermissionSubjectKey(userPermissionSubject)} initialValues={userPermissionSubject}
                        onClickCancel={()=>this.handleEdit(userPermissionSubject, false)}
                        onSubmitFinishedAction={()=>{
                          this.handleEdit(userPermissionSubject, false);
                          this.reloadPage();
                        }}
                      />
                      :
                      <UserPermissionSubjectViewRow key={userPermissionSubjectKey(userPermissionSubject)} userPermissionSubject={userPermissionSubject}
                        onClickEdit={()=>this.handleEdit(userPermissionSubject, true)}
                        onClickDelete={()=>this.handleDelete(userPermissionSubject)}
                      />)
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
            <Pager
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
            />
          </div>
        </section>
      </div>
    );
  }
}

