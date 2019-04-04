import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import { ClipViewDetail } from 'components';

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
      clip: state.clipManage.currentEntry
    }),
  {
    ...clipManageActions,
    ...notificationActions
  })

export default class ReviewClip extends Component {
  static propTypes = {
    params: PropTypes.object,
    // project: PropTypes.object,
    clip: PropTypes.object,
    loadById: PropTypes.func
  };

  componentDidMount() {
    this.props.loadById(this.props.params.clipId);
  }
  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { clip } = this.props;
    return (
      <div className="container">
        <h1>Clip : {clip && <small>{clip.name}</small>}</h1>
        <h3>Job description : {clip && clip.projectRef && <small>{clip.projectRef.title}</small>}</h3>
        {clip && clip.projectRef ?
        <div>
          <ClipViewDetail clip={clip} isEditable={false}/>
            <div className="row">
              <div className="pull-right">
                <a className="btn btn-primary">Approve</a>
                <a className="btn btn-danger">Reject</a>
              </div>
           </div>
        </div>
        :
        <div>
          <span>No entry found!</span>
        </div>
        }
      </div>
    );
  }
}
