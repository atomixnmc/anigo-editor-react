import React, { Component, } from 'react';
import PropTypes from 'prop-types';

export default class Report extends Component {
  static propTypes = {
    tableData: PropTypes.object,
    title: PropTypes.string
  };

  render() {
    const styles = require('./ResultTable.scss');
    const { rows, total, coverage } = this.props.tableData;
    return (
      <div className="panel panel-default">
        <div className={styles.bodyWeeklyTestReport + ' panel-body'}>
          <table className={styles.tableWeeklyTestReport + ' table table-hover'}>
            <thead>
              <tr>
                <th rowSpan="2">No</th>
                <th rowSpan="2">Date Testing</th>
                <th colSpan="5">{ this.props.title }</th>
              </tr>
              <tr >
                <th>Pass</th>
                <th>Fail</th>
                <th>Skip</th>
                <th>Total</th>
                <th>% Passed</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(data =>
                <tr key={data.no}>
                  <td>{data.no}</td>
                  <td>{data.date}</td>
                  <td>{data.pass}</td>
                  <td>{data.fail}</td>
                  <td>{data.skip}</td>
                  <td>{data.rowTotal}</td>
                  <td>{data.perPassed + '%'}</td>
                </tr>
              )}
              <tr className={styles.subTotalRow}>
                <td></td>
                <td className={styles.subTotalLabel}>Sub total</td>
                <td>{total.passTotal}</td>
                <td>{total.failTotal}</td>
                <td>{total.skipTotal}</td>
                <td>{total.total}</td>
                <td></td>
              </tr>
              <tr className={styles.coverageRow}>
                <td></td>
                <td className={styles.coverageLabel}>Coverage %</td>
                <td>{coverage.passCoverage + '%'}</td>
                <td>{coverage.failCoverage + '%'}</td>
                <td>{coverage.skipCoverage + '%'}</td>
                <td>{coverage.totalCoverage + '%'}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    );
  }
}
