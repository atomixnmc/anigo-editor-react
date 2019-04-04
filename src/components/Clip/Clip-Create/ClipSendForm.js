import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector, submit } from 'redux-form';
import { ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import { asyncConnect } from 'redux-connect';
import Select from 'react-select';
import Pager from 'react-pager';
import * as lodash from 'lodash';

import { renderInput, optionsTransform, optionsChange, renderTextArea } from 'utils/formUtil';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as clipManageActions from 'redux/modules/clip/clip-manage';
import clipValidation from './Clip-Validator';

@connect(
  state => {
    return ({
      // listUserRole: state.userRoleManage.listAll,
      // listUserGroup: state.userGroupManage.listAll,
      skills: state.projectManage.skills,
      scales: state.projectManage.scales
    });
  },
  {
    ...clipManageActions
  }
)
@reduxForm({
  form: 'sendClip',
  validate: clipValidation,
  onSubmit: (values, dispatch, props ) => {
    console.log('sendClip', values, props.project);
    values.projectRef = props.project._id;
    dispatch(clipManageActions.createNew(values))
    .then(()=>{
      if (props.onSubmitFinishedAction) {
        props.onSubmitFinishedAction();
      }
    });
  }
})
export default class ClipSendForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    saveError: PropTypes.object,
    error: PropTypes.object,
    dispatch: PropTypes.func,
    change: PropTypes.func,
    initialValues: PropTypes.object,
    currentId: PropTypes.number,
    form: PropTypes.string,
    onClickCancel: PropTypes.func,
    project: PropTypes.object,
    skills: PropTypes.array,
    scales: PropTypes.array,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {
      dispatch
    } = this.props;
  }

  render() {
    const {
        currentId,
        form, invalid, pristine, submitting, dispatch, error, handleSubmit, change, initialValues,
        skills, scales
      } = this.props;

    return (
      <div>
        <div className="container">
          <div id="accordion">
              <div className="row">
                  <div className="col-lg-12">
                      <div className="text-center">
                          <h3>Recommendation Form</h3>
                      </div>
                  </div>
              </div>

              <div className="panel panel-default">
                  <div className="panel-heading">
                      <h4 className="panel-title">
                          <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
                              <i className="glyphicon glyphicon-search text-gold"></i>
                              <b>SECTION I: APPLICANT INFO</b>
                          </a>
                      </h4>
                  </div>
                  <div id="collapse1" className="collapse show">
                      <div className="panel-body">
                          <div className="row">
                              <div className="col-md-9 col-lg-9">
                                  <div className="form-group">
                                      <label className="control-label">Name</label>
                                      <Field
                                        name="name"
                                        component={renderInput}/>
                                  </div>
                              </div>
                              <div className="col-md-3 col-lg-3">
                                  <div className="form-group">
                                      <label className="control-label">Date Of Birth</label>
                                      <div className="input-group date">
                                          <input className="form-control" type="text" />
                                        <span className="input-group-append">
                                              <button className="btn btn-outline-secondary" type="button">
                                                  <i className="fa fa-calendar"></i>
                                              </button></span>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="row">
                              <div className="col-md-4 col-lg-4">
                                  <div className="form-group">
                                      <label className="control-label">Mailing Address</label>
                                      <Field
                                        name="address"
                                        component={renderInput}/>
                                  </div>
                              </div>
                              <div className="col-md-2 col-lg-3">
                                  <div className="form-group">
                                      <label className="control-label">City</label>
                                      <Field
                                        name="city"
                                        component={renderInput}/>
                                  </div>
                              </div>

                              <div className="col-md-3 col-lg-3">
                                  <div className="form-group">
                                      <label className="control-label">State</label>
                                      <Field
                                        name="state"
                                        component={renderInput}/>
                                  </div>
                              </div>

                              <div className="col-md-3 col-lg-2">
                                  <div className="form-group">
                                      <label className="control-label">Zip Code</label>
                                      <Field
                                        name="zipcode"
                                        component={renderInput}/>
                                  </div>
                              </div>
                          </div>

                          <div className="row">
                              <div className="col-md-3 col-lg-12">
                                  <div className="form-group">
                                      <label className="control-label">College Name</label>
                                      <Field
                                        name="college"
                                        component={renderInput}/>
                                  </div>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-md-6 col-lg-6">
                                  <div className="form-group">
                                      <label className="control-label">Contact Information:(Phone Number)</label>
                                      <Field
                                        name="phone"
                                        component={renderInput}/>
                                  </div>
                              </div>

                              <div className="col-md-6 col-lg-6">
                                  <label className="control-label">Email</label>
                                  <div className="input-group">
                                      <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                                      <Field
                                        name="email"
                                        component={renderInput}/>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="panel panel-default">
                  <div className="panel-heading">
                      <h4 className="panel-title">
                          <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">
                              <i className="glyphicon glyphicon-lock text-gold"></i>
                              <b>SECTION II: Recommendation</b>
                          </a>
                      </h4>
                  </div>
                  <div id="collapse2" className="collapse show">
                      <div className="panel-body">
                          <div className="row">
                              <div className="col-lg-12">
                                  <label className="control-label">Please mark the appropriate box that best describes this candidate:</label>

                                  <table className="table table-primary">
                                      <thead>
                                          <tr>
                                              <th>

                                              </th>
                                              {scales && scales.length > 0 && scales.map(scale=>
                                              <th key={scale}>
                                                  {scale}
                                              </th>)}
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {skills && skills.length > 0 && skills.map(skill=>
                                          <tr key={skill.name}>
                                              <td>
                                                {skill.description}
                                              </td>
                                              <td>
                                                  <label className="control-label">
                                                      <input type="checkbox" />
                                                  </label>
                                              </td>
                                              <td>
                                                  <label className="control-label">
                                                      <input type="checkbox" />
                                                  </label>
                                              </td>
                                              <td>
                                                  <label className="control-label">
                                                      <input type="checkbox" />
                                                  </label>
                                              </td>
                                              <td>
                                                  <label className="control-label">
                                                      <input type="checkbox" />
                                                  </label>
                                              </td>
                                          </tr>
                                          )}
                                      </tbody>

                                  </table>
                                  <label className="control-label">Comments (please feel free toattach a letter or other documentation):</label>
                                  <Field
                                        name="description"
                                        component={renderTextArea}/>
                              </div>
                          </div>
                          <br />
                          <div className="row">
                              <div className="col-lg-12">
                                  <label className="control-label">I recommend this candidate:</label>

                                  <label className="control-label">
                                      <input type="checkbox" />
                                      With Reservation
                                  </label>
                                  <label className="control-label">
                                      <input type="checkbox" />
                                      Failry Strongly
                                  </label>

                                  <label className="control-label">
                                      <input type="checkbox" />
                                      Strongly
                                  </label>
                                  <label className="control-label">
                                      <input type="checkbox" />
                                      Enthusiastically
                                  </label>

                              </div>

                              <hr />
                          </div>
                      </div>
                  </div>
              </div>
              <br />
          </div>
        </div>
        {/* <div className="container">
          <div className="row form-group">
                <div className="col-xs-12">
                    <ul className="nav nav-pills nav-justified thumbnail setup-panel">
                        <li className="active"><a href="#step-1">
                            <h4 className="list-group-item-heading">Step 1</h4>
                            <p className="list-group-item-text">First step description</p>
                        </a></li>
                        <li className="disabled"><a href="#step-2">
                            <h4 className="list-group-item-heading">Step 2</h4>
                            <p className="list-group-item-text">Second step description</p>
                        </a></li>
                        <li className="disabled"><a href="#step-3">
                            <h4 className="list-group-item-heading">Step 3</h4>
                            <p className="list-group-item-text">Third step description</p>
                        </a></li>
                    </ul>
                </div>
          </div>
            <div className="row setup-content" id="step-1">
                <div className="col-xs-12">
                    <div className="col-md-12 well text-center">
                        <h1> STEP 1</h1>
                        <button id="activate-step-2" className="btn btn-primary btn-lg">Activate Step 2</button>
                    </div>
                </div>
            </div>
            <div className="row setup-content" id="step-2">
                <div className="col-xs-12">
                    <div className="col-md-12 well">
                        <h1 className="text-center"> STEP 2</h1>
                    </div>
                </div>
            </div>
            <div className="row setup-content" id="step-3">
                <div className="col-xs-12">
                    <div className="col-md-12 well">
                        <h1 className="text-center"> STEP 3</h1>
                    </div>
                </div>
            </div>
        </div> */}
        <div className="text-center">
          <button className="btn btn-success"
            onClick={handleSubmit}
            disabled={pristine || invalid || submitting}>
            <i className="" /> Save
          </button>
          <button className="btn btn-danger"
            onClick={this.props.onClickCancel}
            disabled={submitting}>
            <i className="" /> Cancel
          </button>
        </div>
      </div>
    );
  }
}
