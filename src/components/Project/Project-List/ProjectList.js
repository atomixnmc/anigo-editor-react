import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import { ProjectViewCard } from 'components';

import * as notificationActions from 'redux/modules/notification';
import * as projectManageActions from 'redux/modules/Project/project-manage';

export default class ProjectList extends Component {
  static propTypes = {
    listProject: PropTypes.array
  };

  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { listProject } = this.props;
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {listProject && listProject.map(jd=>
            <ProjectViewCard key={jd._id} project={jd} />
          )}
        </div>
    );
  }
}
