import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import { ClipViewRow, ClipList } from 'components';

import * as notificationActions from 'redux/modules/notification';
import * as clipManageActions from 'redux/modules/clip/clip-manage';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    const promises = [
    ];
    return Promise.all(promises);
  }
}])
@connect(
  state => (
    {
      listClip: state.clipManage.listAll
    }),
  {
    ...clipManageActions,
    ...notificationActions
  })

export default class FrontClipList extends Component {
  static propTypes = {
    listClip: PropTypes.array,
    loadAll: PropTypes.func
  };

  componentDidMount() {
    this.props.loadAll();
  }
  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { listClip } = this.props;
    return (
      <div className="container">
        <h1>My Sent Clip</h1>
        <h2><i className="glyphicon glyphicon-star" style={{color: 'orange'}} /> Favourite</h2>
        <ClipList listClip={listClip} />
        <h2><i className="glyphicon glyphicon-remove" style={{color: 'red'}} /> Rejected</h2>
        <ClipList listClip={listClip} />
        <h2><i className="glyphicon glyphicon-check" style={{color: 'green'}} /> Approved</h2>
        <ClipList listClip={listClip} />
      </div>
    );
  }
}
