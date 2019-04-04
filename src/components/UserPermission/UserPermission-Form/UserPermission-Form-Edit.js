import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector, submit } from 'redux-form';
import { ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userRoleManageActions from 'redux/modules/user-role/user-role-manage';
import * as userPermissionManageActions from 'redux/modules/user-permission/user-permission-manage';
import { asyncConnect } from 'redux-connect';
import Select from 'react-select';
import Pager from 'react-pager';
import { renderInput, optionsTransform, optionsChange } from 'utils/formUtil';
import * as lodash from 'lodash';

import userPermissionValidation from './UserPermission-Validator';

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
      saveError: state.userPermissionManage.saveError,
      list: state.userPermissionManage.list,
    });
  },
  dispatch => bindActionCreators(userPermissionManageActions, dispatch)
)
@reduxForm({
  form: 'userPermissionFormEditRow',
  validate: userPermissionValidation,
  onSubmit: (values, dispatch, props ) => {
    // NOTE: Transform to id list
    // values.categories = lodash.map(values.categories, (cat) => cat.id);
    // values.tags = lodash.map(values.tags, (tag) => tag.id);

    dispatch(userPermissionManageActions.save(values))
    .then(()=>{
      if (props.onSubmitFinishedAction) {
        props.onSubmitFinishedAction();
      }
    });
  }
})
export default class UserPermissionFormEdit extends Component {
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

    const userPermission = initialValues;

    return (
    <div>
        <div>UserPermission</div>
        <div>
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
        </div>
    </div>
    );
  }
}
