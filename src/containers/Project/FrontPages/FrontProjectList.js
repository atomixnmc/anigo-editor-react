import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import { ProjectViewCard, ProjectList } from 'components';

import * as notificationActions from 'redux/modules/notification';
import * as projectManageActions from 'redux/modules/Project/project-manage';

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

export default class FrontProjectList extends Component {
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
    require('./styles.scss');
    const { listProject } = this.props;
    return (
      <div className="container job-list">
        <h2>Job description</h2>
        <h3 className="header">
          <i className="glyphicon glyphicon-star" style={{color: 'orange'}} /> Following/Favourite
        </h3>
        <ProjectList listProject={listProject} />
        <h3 className="header">
          <i className="glyphicon glyphicon-tag" style={{color: 'orange'}} /> Related
        </h3>
        <ProjectList listProject={listProject} />
        <div style={{ padding: 15 }}>
          <a className="btn btn-primary" href="/jobs/create">Create new Job description</a>
        </div>
      </div>
    );
  }
}
