import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as notificationActions from 'redux/modules/notification';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userRoleManageActions from 'redux/modules/user-role/user-role-manage';
import * as userGroupManageActions from 'redux/modules/user-group/user-group-manage';
import { isLoaded, loadPage } from 'redux/modules/user-group/user-group-manage';
import { initializeWithKey } from 'redux-form';
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

import { UserGroupFormNewRow, UserGroupFormEditRow, UserGroupViewRow } from 'components';

const userGroupKey = (userGroup) => 'userGroup_' + userGroup.id;

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
    listData: state.userGroupManage.list,
    total: state.userGroupManage.total,
    currentPage: state.userGroupManage.currentPage,
    editing: state.userGroupManage.editing,
    loading: state.userGroupManage.loading,
    error: state.userGroupManage.error,
    errorMessage: state.userGroupManage.errorMessage,
    isError: state.userGroupManage.isError
  }),
  {
    ...userGroupManageActions,
    ...notificationActions
  })
export default class UserGroupManage extends Component {
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
      current: 0,
      visiblePage: 0,
      title: '',
      selectedGroup: null,
      selectedGroupId: 0
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.state.current = 0;
    this.state.visiblePage = 5;
    this.reloadPage();
  }

  componentWillReceiveProps(nextProps) {
    watchForError(this.props, nextProps, 'UserGroupManage');
    this.props.clearError();
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.totalPage = Math.ceil(nextProps.total / 10);
  }

  search(pageNum) {
    // this.props.loadPage(this.state.current, 10, this.state.selectedGroupId);
    this.state.current = pageNum !== undefined && lodash.isNumber(pageNum) ? pageNum : 0;
    this.props.loadPage(this.state.current, 10);
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
      editItemStart(userGroupKey(user));
    } else {
      editItemStop(userGroupKey(user));
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
        <section className={'section section-header section-primary'}>
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <h1 className="section-header-title">User Groups</h1>
                <h2 className="section-header-subtitle">Groups</h2>
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
                <a className="btn btn-default" href="/user-permission-manage">
                  <i className="glyphicon glyphicon-user"/> Manage Permissions
                </a>
              </div>
              <div className="btn-group pull-right">
                {/* <Permissions allowed={['UserGroup_Create']}>
                <button className="btn btn-primary" onClick={this.handleAdd}>
                  <i className="glyphicon glyphicon-plus"/> Add
                </button>
                </Permissions> */}
              </div>
            </div>
            <div className="row">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Descriptions</th>
                    <th>Linked</th>
                    {/* <th>Permissions</th> */}
                    {/* <th>Status</th> */}
                    {/* <th>Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {listData && this.state.isAddingNew &&
                    <UserGroupFormNewRow initialValues={{}} dataEntry={{}}
                      onClickCancel={()=>this.handleAdd(false)}
                      onSubmitFinishedAction={()=>{
                        this.handleAdd(false);
                        this.reloadPage();
                      }}/>
                  }

                  {listData && listData.length > 0 ?
                    listData.map((userGroup) =>
                      isEditing(userGroupKey(userGroup)) ?
                      <UserGroupFormEditRow form={userGroupKey(userGroup)} key={userGroupKey(userGroup)} initialValues={userGroup}
                        onClickCancel={()=>this.handleEdit(userGroup, false)}
                        onSubmitFinishedAction={()=>{
                          this.handleEdit(userGroup, false);
                          this.reloadPage();
                        }}
                      />
                      :
                      <UserGroupViewRow key={userGroupKey(userGroup)} userGroup={userGroup}
                        onClickEdit={()=>this.handleEdit(userGroup, true)}
                        onClickDelete={()=>this.handleDelete(userGroup)}
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

