import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DashboardButton extends Component {
    static propTypes = {
      value: PropTypes.number,
      text: PropTypes.string,
      icon: PropTypes.string,
      col: PropTypes.number
    };


  render() {
    return (
        <div className={'col-lg-' + this.props.col + ' col-md-6'}>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <div className="row">
              <div className="col-xs-3">
                <i className={'fa fa-5x ' + this.props.icon}></i>
              </div>
              <div className="col-xs-9 text-right">
                <div className="huge">{this.props.value}</div>
                <div>{this.props.text}</div>
              </div>
          </div>
      </div>
        </div>
      </div>

    );
  }
}
