import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import { ClipSendForm } from 'components';

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
      listProject: state.projectManage.listAll,
      project: state.projectManage.currentEntry,
    }),
  {
    ...projectManageActions,
    ...notificationActions
  })

export default class FrontSendClip extends Component {
  static propTypes = {
    listProject: PropTypes.array,
    project: PropTypes.object,
    loadAll: PropTypes.func,
    loadById: PropTypes.func,
    params: PropTypes.object
  };

  componentDidMount() {
    // this.props.loadAll();
    this.props.loadById(this.props.params.jobId);
  }
  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { listProject, project } = this.props;
    return (
      <div className="container">
        <h2>Send Clip for: {project && <span>{project.name}</span>}</h2>
        <div>
          <ClipSendForm project= {project}/>
        </div>
      </div>
    );
  }
}
