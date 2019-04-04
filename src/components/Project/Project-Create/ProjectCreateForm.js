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
import { renderInput, renderTextArea, optionsTransform, optionsChange } from 'utils/formUtil';
import * as lodash from 'lodash';
import * as notificationActions from 'redux/modules/notification';

import projectValidator from './NewProjectValidator';
import * as projectManageActions from 'redux/modules/Project/project-manage';

const listPosition = [
  { value: 'Developer', label: 'Developer'},
  { value: 'Project Manager', label: 'Project Manager'}
];

@connect(
  state => {
    return ({
    });
  },
  {
    ...projectManageActions,
    ...notificationActions
  }
)
@reduxForm({
  form: 'projectAddForm',
  validate: projectValidator,
  onSubmit: (values, dispatch, props ) => {
    dispatch(projectManageActions.createNew(values))
    .then(()=>{
      props.addNotification('Add Project success!', 'success');
      if (props.onSubmitFinishedAction) {
        props.onSubmitFinishedAction();
      }
    });
  }
})
export default class ProjectAddForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    saveError: PropTypes.object,
    error: PropTypes.object,
    dispatch: PropTypes.func,
    reset: PropTypes.func,
    change: PropTypes.func,
    initialValues: PropTypes.object,
    form: PropTypes.string,
    formKey: PropTypes.string,
    onClickCancel: PropTypes.func,
    addNotification: PropTypes.func,
    closeNotification: PropTypes.func,
    clearNotification: PropTypes.func,
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
        form, invalid, pristine, submitting, dispatch, error, handleSubmit, change, reset, formKey, initialValues
    } = this.props;

    const project = initialValues;


    const handlePositionOptions = (value) =>{
      const result = optionsTransform(listPosition, value, 'value', 'label');
      return result;
    };
    const handlePositionOptionsChange = (values) => {
      optionsChange(listPosition, values, change, 'position');
    };
    const renderPositionSelect = position =>
    (<div>
      <Select
        closeMenuOnSelect={true}
        value={handlePositionOptions(position.input.value)}
        onChange={handlePositionOptionsChange}
        options={handlePositionOptions()}
        />
    </div>);

    return (
      <div className="form form-default">
        {/* <div className={'row'} style={{margin: '4px'}}>
          <label className={'col-md-2'}> Username </label>
          <div className={'col-md-10'}>
            {project.name}
          </div>
        </div> */}
        <div className={'row'} style={{margin: '4px'}}>
          <label className={'col-md-2'}> Name </label>
            <div className={'col-md-10'}>
          <Field
            name="name"
            component={renderInput}/>
          </div>
        </div>

        <div className={'row'} style={{margin: '4px'}}>
          <label className={'col-md-2'}> Title </label>
            <div className={'col-md-10'}>
          <Field
            name="title"
            component={renderInput}/>
          </div>
        </div>
        <div className={'row'} style={{margin: '4px'}}>
          <label className={'col-md-2'}> Description </label>
            <div className={'col-md-10'}>
            <Field
              name="description"
              component={renderTextArea}/>
          </div>
        </div>
        {/* <div className={'row'} style={{margin: '4px'}}>
          <label className={'col-md-2'}> Title </label>
            <div className={'col-md-10'}>
          <Field
            name="requestor"
            component={renderInput}/>
          </div>
        </div> */}
        <div className={'row'} style={{margin: '4px'}}>
          <label className={'col-md-2'}> Position </label>
            <div className={'col-md-10'} style={{paddingTop: '4px', color: '#000'}}>
          <Field
            name="position"
            component={renderPositionSelect}/>
          </div>
        </div>
        <div className={'row'} style={{margin: '4px'}}>
          <label className={'col-md-3'}></label>
          <div>
            {/* <button className="btn btn-default"
              onClick={this.props.onClickCancel}
              disabled={submitting}>
              <i className="fa fa-ban" /> Cancel
            </button> */}
            <button className="btn btn-default"
              type="reset"
              onClick={this.props.reset}
              disabled={submitting}>Reset</button>
            <button className="btn btn-success"
              onClick={handleSubmit}
              disabled={pristine || invalid || submitting}>
              <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')} /> Save
            </button>
            {/* {saveError && <div className="text-danger">{saveError}</div>} */}
            </div>
        </div>
      </div>
    );
  }
}
