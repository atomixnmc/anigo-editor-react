import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import { ProjectViewDetail } from 'components';

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
      project: state.projectManage.currentEntry
    }),
  {
    ...projectManageActions,
    ...notificationActions
  })

export default class ManagementViewProject extends Component {
  static propTypes = {
    params: PropTypes.object,
    project: PropTypes.object,
    loadById: PropTypes.func
  };

  componentDidMount() {
    this.props.loadById(this.props.params.jobId);
  }
  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { project } = this.props;
    return (
      <div className="">
        <h1><a style={{color: 'inherit', textDecoration: 'none'}} href="/admin/recruit/jobs"><i className={'glyphicon glyphicon-chevron-left'} /></a>Job description : {project && <small>{project.title}</small>}</h1>
        {project ?
        <div>
          <ProjectViewDetail project={project} isAdmin />
        </div>
        :
        <div>
          <span>No entry found!</span>
        </div>
        }
      </div>
    );
  }
}
