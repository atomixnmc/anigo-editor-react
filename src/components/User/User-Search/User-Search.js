
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as notificationActions from 'redux/modules/notification';
import * as userSearchActions from 'redux/modules/user/user-search';
import Modal from 'react-bootstrap/Modal';
import { ButtonGroup, Button, DropdownButton, Checkbox } from 'react-bootstrap';
import { asyncConnect } from 'redux-connect';
import Select from 'react-select';
import Pager from 'react-pager';
import * as lodash from 'lodash';
import { renderInput, optionsTransform, optionsChange } from 'utils/formUtil';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    const promises = [
    ];
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    error: state.userSearch.error,
    errorMessage: state.userSearch.errorMessage,
    isError: state.userSearch.isError,
  }),
  { ...userSearchActions,
    addNotification: notificationActions.addNotification,
  })
export default class UserSearchDialog extends Component {
  static propTypes = {
    showDialogState: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    handleSave: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUpdate(nextProps, nextState) {
  }

  render() {
    require('./User-Search.scss');
    return (
      <div></div>
    );
  }
}

