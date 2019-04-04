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
// import './ClipViewRow.scss';

export default class ClipViewRow extends Component {
  static propTypes = {
    project: PropTypes.object
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

  render() {
    const {
      project: {
        name, creator, _id, company, location, expired,
        views, created, image, position, description,
        title,
      }
    } = this.props;
    return (
        <div className="row well">
          <div className="col-md-2 col-lg-2">
            <img src="https://via.placeholder.com/60" />
          </div>
          <div className="col-md-10 col-lg-10">
            <div className="row">
                <div className="col-md-4 col-lg-4">{title}</div>
                <div className="col-md-4 col-lg-4">{name}</div>
                <div className="col-md-2 col-lg-2">{expired}</div>
                <div className="col-md-2 col-lg-2">{position}</div>
           </div>
            <div className="row">{description}</div>
           </div>
           <div className="row">
            <div className="pull-right">
            <a href={'/clips/' + _id + '/view'} className="btn btn-primary">Detail</a>
            </div>
           </div>
        </div>
     );
  }
}
