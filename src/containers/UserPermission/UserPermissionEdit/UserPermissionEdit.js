import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import * as userPermissionEditActions from 'redux/modules/testsession/user-permission-edit';
// import { isLoaded, loadPage as loadContents } from 'redux/modules/testsession/testsession-manage';
import { TestSessionForm } from 'components';
import { asyncConnect } from 'redux-connect';
import { Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import Pager from 'react-pager';

// @asyncConnect([{
//   deferred: true,
//   promise: ({ store: { dispatch, getState }, params: { } }, ) => {
//     if (!isLoaded(getState())) {
//       return dispatch(loadContents(0, 10));
//     }
//   }
// }])
@connect(
  state => ({
    userPermissionEntry: state.userPermissionEdit.data,
  }),
  { })
export default class UserPermissionEdit extends Component {
  static propTypes = {
    userPermissionEntry: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUpdate(nextProps, nextState) {
  }

  render() {
    const { userPermissionEntry } = this.props;
    const styles = require('./UserPermissionEdit.scss');
    return (
      <div>
        <section className={'section section-header section-primary ' + styles.pageHeader}>
          <div className="container">
            <div className="row">
              <div className="col-sm-8">
                <h1 className="section-header-title">User Permission</h1>
                <h2 className="section-header-subtitle">Edit User Permission Detail</h2>

              </div>
              <div className="col-sm-4">
                <div className="cta">
                  <small></small>
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
                    <th className={styles.idCol}>ID</th>
                    <th className={styles.nameCol}>Test Suite Name</th>
                    <th className={styles.testScriptCol}>Total Script</th>
                    <th className={styles.typeCol}>Description</th>
                    <th className={styles.platformCol}>Platform</th>
                    <th className={styles.versionCol}>Version</th>
                    <th className={styles.Col}>Schedule time</th>
                    <th className={styles.statusCol}>Status</th>
                    <th className={styles.actionCol}></th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

