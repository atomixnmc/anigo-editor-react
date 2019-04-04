import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector, submit } from 'redux-form';
import { ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userPermissionSubjectManageActions from 'redux/modules/user-permission/user-permission-subject-manage';
import { asyncConnect } from 'redux-connect';
import Select from 'react-select';
import Pager from 'react-pager';
import { renderInput, optionsTransform, optionsChange } from 'utils/formUtil';
import * as lodash from 'lodash';

import userPermissionSubjectValidation from './UserPermissionSubject-Validator';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    const promises = [
    ];
    return Promise.all(promises);
  }
}])
@connect(
  state => {
    return ({
      listPrivacyLevel: state.userPermissionManage.listPrivacyLevel
    });
  },
  dispatch => bindActionCreators(userPermissionSubjectManageActions, dispatch)
)
@reduxForm({
  form: 'userPermissionSubjectFormEditRow',
  validate: userPermissionSubjectValidation,
  onSubmit: (values, dispatch, props ) => {
    dispatch(userPermissionSubjectManageActions.addNew(values))
    .then(()=>{
      if (props.onSubmitFinishedAction) {
        props.onSubmitFinishedAction();
      }
    });
  }
})
export default class UserPermissionSubjectFormNewRow extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    saveError: PropTypes.object,
    error: PropTypes.object,
    dispatch: PropTypes.func,
    change: PropTypes.func,
    editItemStop: PropTypes.func,
    loadVersion: PropTypes.func,
    initialValues: PropTypes.object,
    currentId: PropTypes.number,
    form: PropTypes.string,
    formKey: PropTypes.string,
    onClickCancel: PropTypes.func,
    listPrivacyLevel: PropTypes.array,
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
        form, invalid, pristine, submitting, dispatch, error, handleSubmit, change,
        saveError, editItemStop,
        formKey, initialValues,
        listPrivacyLevel
    } = this.props;

    const userPermissionSubject = initialValues;
    const handlePrivacyLevelOptions = (value) =>{
      const result = optionsTransform(listPrivacyLevel, value, 'label', 'value');
      return result;
    };
    const handlePrivacyLevelOptionsChange = (values) => {
      optionsChange(listPrivacyLevel, values, change, 'privacyLevel', 'value', true);
    };
    const renderPrivacyLevel = (privacyLevel) => (
      <div>
        <Select
          style={{paddingTop: '4px', color: '#000'}}
          closeMenuOnSelect={false}
          value={handlePrivacyLevelOptions(privacyLevel.input.value)}
          onChange={handlePrivacyLevelOptionsChange}
          options={listPrivacyLevel}
          />
    </div>
    );
    return (
      <tr>
        <td>
          {userPermissionSubject.id}
        </td>
        <td>
        <Field
          name="name"
          component={renderInput}/>
        </td>
        <td>
        <Field
          name="description"
          component={renderInput}/>
        </td>
        {/* <td>
          Users ({userPermissionSubject.numOfUsers}), Groups ({userPermissionSubject.numOfGroups})
        </td> */}
        {/* <td><span>{handlePermissionSubjects(userPermissionSubject.permissions)}</span></td> */}
        <td>
        <Field
              name="privacyLevel"
              component={renderPrivacyLevel}/>
        </td>
        <td>
          <Field
          name="enable"
          className=""
          type="checkbox" className=" "
          component={renderInput}/>
        </td>
        <td>
          <button className="btn btn-default"
            onClick={this.props.onClickCancel}
            disabled={submitting}>
            <i className="fa fa-ban" /> Cancel
          </button>
          <button className="btn btn-success"
            onClick={handleSubmit}
            disabled={pristine || invalid || submitting}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')} /> Save
          </button>
          {/* {saveError && <div className="text-danger">{saveError}</div>} */}
        </td>
      </tr>
    );
  }
}
