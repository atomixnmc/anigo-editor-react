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
import { Link } from 'react-router';
import { DateTime } from 'luxon';

@connect(
  state => ({
    skillDefs: state.projectManage.skills
  }),
  {
  })
export default class ProjectViewRow extends Component {
  static propTypes = {
    project: PropTypes.object,
    skillDefs: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUpdate(nextProps, nextState) {
  }

  limitText(str, num) {
    str = str || '';
    num = num || Infinity;
    if (str.length <= num) return str;
    return str.substr(0, num - 3).trim() + '...';
  }

  handleSkills(skillNames) {
    return skillNames
      .map(skillName => this.props.skillDefs.find(skillDef => skillDef.name === skillName))
      .map(skill =>
        <span key={skill.name} className="btn btn-default" title={skill.description}>
          <i className={skill.icon}/>
        </span>
      );
  }
  render() {
    const {
      project: {
        name, creator, _id, company, location,
        views, created, image, position, description,
        title,
        skills = ['Java', 'React']
      }
    } = this.props;
    return (
      <div className="row well" key={_id}>
        <div className="col-md-2 col-lg-2">
          <img src="https://via.placeholder.com/60" />
        </div>
        <div className="col-md-8 col-lg-8">
          <div style={{ fontWeight: 'bold' }}>{title}</div>
          <div>{description}</div>
          <div>{DateTime.fromISO(created).toRelativeCalendar()}</div>
          <div>
            <span>Requirement Skills:</span>
            {this.handleSkills(skills)}
          </div>
        </div>
        <div className="col-md-2 col-lg-2">
          <a href={'/admin/recruit/jobs/' + _id + '/view'} className="btn btn-primary">Detail</a>
        </div>
      </div>
    );
  }
}
