import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Permissions from 'react-redux-permissions';
import { ProjectViewCard, ProjectList, ProjectViewRow } from 'components';
import { DateTime } from 'luxon';

import * as notificationActions from 'redux/modules/notification';
import * as projectManageActions from 'redux/modules/Project/project-manage';

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
    const { listProject } = this.props;
    return (
      <div className="">
        <h3>Job descriptions</h3>
        <div style={{ padding: 15 }}>
          <a className="btn btn-primary" href="/admin/recruit/jobs/create">Create new Job description</a>
        </div>
        {(listProject || []).map(jobDesc =>
          <ProjectViewRow key={jobDesc._id} project={jobDesc} />
        )}
      </div>
    );
  }
}
