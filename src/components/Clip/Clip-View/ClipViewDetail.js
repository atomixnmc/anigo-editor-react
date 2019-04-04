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
  }),
  {
  })
export default class ClipViewDetail extends Component {
  static propTypes = {
    clip: PropTypes.object,
    isEditable: PropTypes.bool
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
      clip: {
        name, creator, _id, company, location, expired,
        views, created, image, position, description,
        title,
      }
    } = this.props;
    return (
        <div className="row well">
          <div className="">
            <img src="https://via.placeholder.com/150" />
          </div>
          <div className="">
            <div className="row">
              <div className="col-md-4 col-lg-4">Name</div>
              <div className="col-md-8 col-lg-8">{name}</div>
            </div>
            <div className="row">
              <div className="col-md-4 col-lg-4">Expired</div>
              <div className="col-md-2 col-lg-2">{expired}</div>
            </div>
            <div className="row">
              <div className="col-md-4 col-lg-4">Position</div>
              <div className="col-md-2 col-lg-2">{position}</div>
            </div>
            <div className="row"><div className="well">{description}</div></div>
            <div className="row">
              <div className="panel-body">
              <div className="row">
                  <div className="col-lg-12">
                      <label className="control-label">Please mark the appropriate box that best describes this candidate:</label>

                      <table className="table table-primary">
                          <thead>
                              <tr>
                                  <th>

                                  </th>
                                  <th>
                                      EXCELLENT
                                  </th>
                                  <th>
                                      GOOD
                                  </th>

                                  <th>
                                      AVERAGE
                                  </th>

                                  <th>
                                      BELOW AVERAGE
                                  </th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>
                                      Academic Background
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      Artistic Skill
                                  </td>
                                  <td>
                                      <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      Character
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      Ambition
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      Emotional Stability
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      Ability To work with Others
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                              </tr>
                              <tr>
                                  <td>
                                      Communication Skills
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                                  <td>
                                      <label className="control-label">
                                          <span><i className="glyphicon glyphicon-check" style={{color: 'green'}} /></span>
                                      </label>
                                  </td>
                              </tr>
                          </tbody>

                      </table>
                  </div>
              </div>
              </div>
           </div>
           </div>
           {this.props.isEditable && <div className="row">
            <div className="pull-right">
              <a className="btn btn-primary">Edit</a>
              <a className="btn btn-danger">Remove</a>
            </div>
           </div>
           }
        </div>
     );
  }
}
