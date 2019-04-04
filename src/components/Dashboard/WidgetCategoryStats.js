import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class WidgetCategoryStats extends Component {
  static propTypes = {
    value: PropTypes.any,
    text: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    bgColor: PropTypes.string,
    col: PropTypes.number,
    unit: PropTypes.any,
    stats: PropTypes.object,
    isUseColorCode: PropTypes.bool
  };


  render() {
    require('./WidgetCategoryStats.scss');
    let colorCode = '';
    if (this.props.color) {
      colorCode = this.props.color;
    } else {
      if (this.props.isUseColorCode) {
        const value = parseFloat(this.props.value);
        if (value >= 70) {
          colorCode = '#5cb85c';
        } else if (value > 30) {
          colorCode = '#ffdd22';
        } else {
          colorCode = '#ff4422';
        }
      }
    }
    return (
      <div className="panel panel-default widget">
        <div className="panel-body" style={{backgroundColor: this.props.bgColor}}>
          <div className="main" style={{backgroundColor: colorCode, paddingTop: '30px'}}>
            <h3 style={{marginTop: '0px'}}>{this.props.value}{this.props.unit}</h3>
          </div>
          <div className="stats">
            <h4 style={{ textAlign: 'center'}}>{this.props.text}</h4>
            {this.props.stats &&
            <div className="row">
              <div className="col-md-4" style={{borderBottom: 'solid 2px #5cb85c'}}><span>Pass:</span><span className="number">{this.props.stats.pass}</span></div>
              <div className="col-md-4" style={{borderBottom: 'solid 2px #ff4422'}}><span>Fail:</span><span className="number">{this.props.stats.fail}</span></div>
              <div className="col-md-4" style={{borderBottom: 'solid 2px #ffdd22'}}><span>Skip:</span><span className="number">{this.props.stats.skip}</span></div>
            </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
