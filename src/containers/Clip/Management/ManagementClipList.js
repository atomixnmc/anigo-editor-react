import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';

import * as notificationActions from 'redux/modules/notification';
import * as clipManageActions from 'redux/modules/clip/clip-manage';

@connect(
  state => (
    {
      listClip: state.clipManage.listAll
    }),
  {
    ...clipManageActions,
    ...notificationActions
  })

export default class extends Component {
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
    console.log(listClip);
    return (
      <div className="">
        <h2>Clip Management</h2>
        {(listClip || []).map(clip => {
          const { _id, name, description, created, title, position } = clip || {};
          return (
            <a href={'/admin/recruit/clips/' + _id + '/view'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="row well" key={_id}>
                <div className="col-md-2 col-lg-2">
                  <img src="https://via.placeholder.com/60" />
                </div>
                <div className="col-md-7 col-lg-7">
                  <div style={{ fontWeight: 'bold' }}>{name}</div>
                  <div>{position}</div>
                  <div>{description}</div>
                  <div>{DateTime.fromISO(created).toRelative()}</div>
                </div>
                <div className="col-md-3 col-lg-3">
                  <a href="javascript:void(0)" className="btn btn-primary">Approve</a>
                  <a href="javascript:void(0)" className="btn btn-danger">Reject</a>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    );
  }
}
