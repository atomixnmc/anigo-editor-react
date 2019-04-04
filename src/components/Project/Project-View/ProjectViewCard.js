import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { ButtonGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import { LinkContainer } from 'react-router-bootstrap';
import Confirm from 'react-confirm-bootstrap';
import Pager from 'react-pager';
import * as lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import './ProjectViewCard.scss';

@connect(
  state => ({
  }),
  {
  })
export default class ProjectViewCard extends Component {
  static propTypes = {
    project: PropTypes.object
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

  limitText(str, num) {
    str = str || '';
    num = num || Infinity;
    if (str.length <= num) return str;
    return str.substr(0, num - 3).trim() + '...';
  }

  render() {
    const {
      project: {
        name, creator, _id, company, location,
        views, created, image, position, description,
        title,
      }
    } = this.props;
    return (
      <Link to={`/jobs/${_id}/view`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="job-card">
          <div className="job-card__header">
            <div className="header__image" style={{
              background: `lightgray url(${image}) center center / cover no-repeat`,
            }} />
          </div>
          <div className="job-card__body">
            <div className="body__title">{title}</div>
            <div className="body__company">{position}</div>
            <div className="body__location">{description}</div>
          </div>
          <div className="job-card__footer">
            <div className="footer__top">
              <div className="pull-left">Expired: 10/10/2019</div>
              <div className="pull-right">Sent: 5 Clip</div>
            </div>
            <div className="footer__line" />
            <div className="footer__time-ago">
              {DateTime.fromMillis(Date.parse(created)).toRelative()}
            </div>
            <div className="footer__divider">•</div>
            <div className="footer__views">
              {new Intl.NumberFormat('en-US').format(views || 0)} views
            </div>
           </div>
         </div>
      </Link>
     );
  }
}
