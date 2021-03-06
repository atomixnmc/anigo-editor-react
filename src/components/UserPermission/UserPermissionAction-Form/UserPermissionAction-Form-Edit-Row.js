import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector, submit } from 'redux-form';
import { ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userPermissionActionManageActions from 'redux/modules/user-permission/user-permission-action-manage';
import { asyncConnect } from 'redux-connect';
import Select from 'react-select';
import Pager from 'react-pager';
import { renderInput, optionsTransform, optionsChange } from 'utils/formUtil';
import * as lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import userPermissionActionValidation from './UserPermissionAction-Validator';

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
  dispatch => bindActionCreators(userPermissionActionManageActions, dispatch)
)
@reduxForm({
  form: 'userPermissionActionFormEditRow',
  validate: userPermissionActionValidation,
  onSubmit: (values, dispatch, props ) => {
    dispatch(userPermissionActionManageActions.save(values))
    .then(()=>{
      if (props.onSubmitFinishedAction) {
        props.onSubmitFinishedAction();
      }
    });
  }
})
export default class UserPermissionActionFormEditRow extends Component {
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

    const userPermissionAction = initialValues;
    return (
      <tr>
        <td>
          {userPermissionAction.id}
        </td>
        <td><span>{userPermissionAction.name}</span></td>
        <td>
        <Field
          name="description"
          component={renderInput}/>
        </td>
        {/* <td>
          Users ({userPermissionAction.numOfUsers}), Groups ({userPermissionAction.numOfGroups})
        </td> */}
        {/* <td><span>{handlePermissionActions(userPermissionAction.permissions)}</span></td> */}
        <td>
          <Field
          name="enable"
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
