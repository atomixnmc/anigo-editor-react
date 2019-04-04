import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as notificationActions from 'redux/modules/notification';
import * as userManageActions from 'redux/modules/user/user-manage';
import * as userGroupManageActions from 'redux/modules/user-group/user-group-manage';
import { isLoaded, loadPage as loadContents } from 'redux/modules/user/user-manage';
import { initializeWithKey } from 'redux-form';
import { UserFormEditRow, UserViewRow } from 'components';
import { asyncConnect } from 'redux-connect';
import { ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import { LinkContainer } from 'react-router-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import Pager from 'react-pager';
import * as lodash from 'lodash';

@connect(
  state => ({
    listData: state.userGroupManage.list
  }),
  {
    ...userGroupManageActions,
    addNotification: notificationActions.addNotification
  })
export default class UserGroupViewRow extends Component {
  static propTypes = {
    listData: PropTypes.array,
    userGroup: PropTypes.object,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
    onClickCancel: PropTypes.func,
    onClickLink: PropTypes.func
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
    const { listData, userGroup } = this.props;
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
      <tr key={userGroup.id}>
        <td>{userGroup.id}</td>
        <td><span>{userGroup.name}</span></td>
        <td><span>{userGroup.description}</span></td>
        <td>
          Users ({userGroup.numOfUsers})
        </td>
        {/* <td><span>{handlePermissions(userGroup.permissions)}</span></td> */}
        {/* <td>{userGroup.enable ? 'Enabled' : 'Disabled'}</td>
        <td className="row">
          <ButtonGroup>
            <span>
              <DropdownButton id="actionDropdown" className={'item-action '} title={<Glyphicon glyph="option-vertical" />}>
                <Dropdown.Item onClick={()=> this.props.onClickEdit(userGroup)}><span className={'glyphicon glyphicon-edit'}></span> Edit</Dropdown.Item>
                <Confirm
                  onConfirm={()=>this.props.onClickDelete(userGroup)}
                  body="Are you sure you want to delete this?"
                  confirmText="Confirm Delete"
                  title="Deleting Item">
                  <Dropdown.Item>
                    <span>Delete</span>
                  </Dropdown.Item>
                </Confirm>
              </DropdownButton>
            </span>
          </ButtonGroup>
        </td> */}
      </tr>
    );
  }
}
