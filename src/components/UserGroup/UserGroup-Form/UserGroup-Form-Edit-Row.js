import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector, submit } from 'redux-form';
import { ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userGroupManageActions from 'redux/modules/user-group/user-group-manage';
import { asyncConnect } from 'redux-connect';
import Select from 'react-select';
import Pager from 'react-pager';
import { renderInput, optionsTransform, optionsChange } from 'utils/formUtil';
import * as lodash from 'lodash';

import userGroupValidation from './UserGroup-Validator';

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
      // saveError: state.testSessionManage.saveError,
      // list: state.testSessionManage.list,
    });
  },
  dispatch => bindActionCreators(userGroupManageActions, dispatch)
)
@reduxForm({
  form: 'userGroupFormEditRow',
  validate: userGroupValidation,
  onSubmit: (values, dispatch, props ) => {
    dispatch(userGroupManageActions.save(values))
    .then(()=>{
      if (props.onSubmitFinishedAction) {
        props.onSubmitFinishedAction();
      }
    });
  }
})
export default class UserGroupFormEditRow extends Component {
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
    onClickCancel: PropTypes.func
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
        formKey, initialValues
    } = this.props;

    const userGroup = initialValues;
    const handlePermissions = (permissions) => {
      if (permissions && lodash.isArray(permissions)) {
        return (
          permissions
          .sort((t1, t2) => t1.id > t2.id)
          .map((permission)=>
          permission && permission.name &&
          <div key={permission.name} className="btn btn-default" title={permission.name}>
          {permission.name}
          </div>
          )
        );
      } else {
        return (
          <div>No permission</div>
        );
      }
    };

    return (
      <tr>
        <td>
          {userGroup.id}
        </td>
        <td><span>{userGroup.name}</span></td>
        <td>
        <Field
          name="description"
          component={renderInput}/>
        </td>
        <td>
          Users ({userGroup.numOfUsers})
        </td>
        {/* <td><span>{handlePermissions(userGroup.permissions)}</span></td> */}
        {/* <td>
          <Field
          name="enable"
          className=""
          type="checkbox" className=" "
          component={renderInput}/>
        </td> */}
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
