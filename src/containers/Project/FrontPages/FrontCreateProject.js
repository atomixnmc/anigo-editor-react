import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import { ProjectViewCard } from 'components';

import * as notificationActions from 'redux/modules/notification';
import * as projectManageActions from 'redux/modules/Project/project-manage';
import {ProjectViewDetail, ProjectCreateForm} from 'components';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    const promises = [
    ];
    return Promise.all(promises);
  }
}])
@connect(
  state => (
    {
      listProject: state.projectManage.listAll
    }),
  {
    ...projectManageActions,
    ...notificationActions
  })

export default class FrontCreateProject extends Component {
  static propTypes = {
    listProject: PropTypes.array,
    loadAll: PropTypes.func
  };

  componentDidMount() {
    this.props.loadAll();
  }
  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { listProject } = this.props;
    return (
      <div className="container">
        <h1>Create Job description</h1>
        <div>
          <ProjectCreateForm />
        </div>
      </div>
    );
  }
}
