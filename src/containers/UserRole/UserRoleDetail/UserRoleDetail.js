import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as userRoleActions from 'redux/modules/user-role/user-role-manage';
import { isLoaded, loadPage as loadContents } from 'redux/modules/user-role/user-role-manage';
import { initializeWithKey } from 'redux-form';
import { TestSessionForm } from 'components';
import { asyncConnect } from 'redux-connect';
import { Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import Pager from 'react-pager';

@asyncConnect([{
  deferred: true,
  promise: ({ store: { dispatch, getState }, params: { } }, ) => {
    if (!isLoaded(getState())) {
      return dispatch(loadContents(0, 10));
    }
  }
}])
@connect(
  state => ({
    userRole: state.userRoleManage.data,
    total: state.userRoleManage.total,
    currentPage: state.userRoleManage.currentPage,
    editing: state.userRoleManage.editing,
    error: state.userRoleManage.error,
    loading: state.userRoleManage.loading,
    newId: state.userRoleManage.newId,
    errorMessage: state.userRoleManage.errorMessage,
    isError: state.userRoleManage.isError
  }),
  {
    ...userRoleActions
  })
export default class UserRoleDetail extends Component {
  static propTypes = {
    userRole: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    editing: PropTypes.object,
    load: PropTypes.func,
    loadPage: PropTypes.func,
    editStart: PropTypes.func,
    total: PropTypes.number,
    currentPage: PropTypes.number,
    turnOffMessage: PropTypes.func,
    clearError: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handlePageChanged = this.handlePageChanged.bind(this);
    this.state = {
      total: 5,
      current: 7,
      visiblePage: 3,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.state.current = 0;
    this.state.visiblePage = 5;
    this.props.loadPage(this.state.current, 10);
    this.state.total = Math.ceil(this.props.total / 10);
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.total = Math.ceil(nextProps.total / 10);
  }

  handlePageChanged(newPage) {
    this.setState({ current: newPage });
    this.props.loadPage(newPage, 10);
  }
  render() {
    const handleEdit = (testcase, ts) => {
      const { editStart } = this.props; // eslint-disable-line no-shadow
      if (ts) return () => editStart(String('id' + testcase.id));
      return () => editStart(String(testcase.id));
    };

    const { userRole, error, editing, loading } = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    return (
      <div>
        <section className={'section section-header section-primary '}>
          <div className="container">
            <div className="row">
              <div className="col-sm-8">
                <h1 className="section-header-title">UserGroup</h1>
                <h2 className="section-header-subtitle">UserGroup Detail</h2>
                {error &&
                  <div className="alert alert-danger" role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    {' '}
                    {error}
                  </div>}
              </div>
              <div className="col-sm-4">
                <div className="cta">
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section section-content">
          <div className="container">
            <div className="row">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
            <Pager
              total={this.state.total}
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

