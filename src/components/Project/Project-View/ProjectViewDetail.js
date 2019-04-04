import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import { LinkContainer } from 'react-router-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import Pager from 'react-pager';
import * as lodash from 'lodash';
import Permissions from 'react-redux-permissions';

import { ClipList} from 'components';
import * as projectManageActions from 'redux/modules/Project/project-manage';
import * as clipManageActions from 'redux/modules/clip/clip-manage';
const MOCK_Clip_LIST = [
  {
    _id: '5c88df12864faec815a5a79c',
    name: 'A',
    title: 'A',
    expired: '10/10/2019',
    position: 'Developer'
  },
  {
    _id: '5c88e56d864faec815a5aa5f',
    name: 'B',
    title: 'B',
    expired: '10/10/2019',
    position: 'Developer'
  },
];
@connect(
  state => ({
    listClip: state.clipManage.listByJobId
  }),
  {
    loadClipByJobId: clipManageActions.loadByJobId
  })
export default class ProjectViewDetail extends Component {
  static propTypes = {
    project: PropTypes.object,
    isAdmin: PropTypes.bool,
    listClip: PropTypes.array,
    loadClipByJobId: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadClipByJobId(this.props.project._id);
  }

  componentDidMount() {
  }

  componentWillUpdate(nextProps, nextState) {
  }

  render() {
    const { project, isAdmin, listClip } = this.props;
    // project.description = `
    //   1. Work with manager, support the data analysis and report. Create a prioritized list of needs for each business segment;
    //   2. Support Retail or MKT or Fin Team daily job, and monitor the key action could take excute;
    //   3. Cooperated with other team, work closed with other team member.
    // `;
    project.skills = [
      { name: 'Skill A' },
      { name: 'Skill B' }
    ];
    return (
      <div>
        <div className="row">
          <div className="col-md-2"><img src="https://via.placeholder.com/150" /></div>
          <div className="col-md-10">
            <div>
            <span>{ project.name }</span>
            <span>{ project.position }</span>
            </div>
            <div className="row"><pre>{ project.description }</pre></div>
            <div className="row">{ project.skills &&
              <ul>{project.skills.map(skill=>
              <li key={skill.name}>{ skill.name }</li>
             )}
             </ul>}</div>
            <div className="row">
              <div className="pull-left">
                <span>Created:<a href="">{project.creator}</a></span>
              </div>
              <div className="pull-right">
                <span>View:<a href="">{project.views}</a></span>
              </div>
            </div>
            <div className="row">
              <div className="pull-left">
              </div>
              <div className="pull-right">
                {!isAdmin && <a className="btn btn-primary" href={'/jobs/' + project._id + '/sendclip'}>Send Clip</a>}
                {/* <a className="btn btn-primary" href={'/jobs/' + project._id + '/apply'}>Apply</a> */}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4>Sent Clip</h4>
          <ClipList listClip={listClip} />
        </div>
      </div>
    );
  }
}
