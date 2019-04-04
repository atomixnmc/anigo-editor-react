import React, { Component, } from 'react';
import PropTypes from 'prop-types';
// import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import * as widgetActions from 'redux/modules/report';
import C3Chart from 'react-c3js';
import ResultTable from './ResultTable';

// @asyncConnect([{
//   promise: ({ store: { } }) => {
//     const promises = [];
//     return Promise.all(promises);
//   }
// }])
@connect(
  state => (
    {
      scriptWeeklyTime: state.report.scriptWeeklyTime,
      scriptWeeklyCount: state.report.scriptWeeklyCount,
      failedData: state.report.failedData,
      skippedData: state.report.skippedData,
      barData: state.report.barData,
      barDataAndroidApp: state.report.barDataAndroidApp,
      barDataAndroidWeb: state.report.barDataAndroidWeb,
      barDataPC: state.report.barDataPC,
      totalWeeklyData: state.report.totalWeeklyData,
      pcWebWeeklyData: state.report.pcWebWeeklyData,
      androidAppWeeklyData: state.report.androidAppWeeklyData,
      androidWebWeeklyData: state.report.androidWebWeeklyData,
      resultTotalByDayData: state.report.resultTotalByDayData,
    }),
  { ...widgetActions })

export default class Report extends Component {
  static propTypes = {
    // isTotalWeeklyDataHasData: PropTypes.bool,
    barData: PropTypes.object,
    barDataAndroidApp: PropTypes.object,
    barDataAndroidWeb: PropTypes.object,
    barDataPC: PropTypes.object,
    scriptWeeklyTime: PropTypes.array,
    scriptWeeklyCount: PropTypes.array,
    skippedData: PropTypes.array,
    failedData: PropTypes.array,
    isStackedBarLoading: PropTypes.bool,
    resultTotalByDayData: PropTypes.object,
    // Tables
    totalWeeklyData: PropTypes.object,
    pcWebWeeklyData: PropTypes.object,
    androidAppWeeklyData: PropTypes.object,
    androidWebWeeklyData: PropTypes.object,
    // Actions
    loadTableData: PropTypes.func,
    loadBarHorizontalChart: PropTypes.func,
    loadWeeklyFailed: PropTypes.func,
    loadWeeklySkipped: PropTypes.func,
    loadWeeklyScripts: PropTypes.func,
    loadWeeklyExecution: PropTypes.func,
    loadAndroidAppTableData: PropTypes.func,
    loadAndroidWebTableData: PropTypes.func,
    loadPCWebTableData: PropTypes.func,
    loadResultTotalByDay: PropTypes.func
  };

  componentWillMount() {
    this.props.loadTableData('1');
    this.props.loadWeeklyExecution();
    this.props.loadBarHorizontalChart();
    this.props.loadAndroidAppTableData('1');
    this.props.loadAndroidWebTableData('1');
    this.props.loadPCWebTableData('1');
    this.props.loadResultTotalByDay('1');
    this.props.loadWeeklyScripts('1');
    this.props.loadWeeklySkipped('1');
    this.props.loadWeeklyFailed('1');
  }

  calDayOfWeek(weekNum, weekDay, locale) {
    /* eslint-disable */
    let resultDay = null;
    let today = new Date();
    let options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    let anchorDay = new Date(today.getFullYear(), today.getMonth(), (today.getDate() - today.getDay()) + weekDay);
    if (today <= anchorDay) {
      if (weekNum == 1){
        resultDay = today;
      } else {
        resultDay = new Date(today.getFullYear(), today.getMonth(), (today.getDate() - today.getDay()) + weekDay - 7 * (weekNum-1));
      }
    } else {
      resultDay = new Date(today.getFullYear(), today.getMonth(), (today.getDate() - today.getDay()) + weekDay - 7 * (weekNum-1));
    }
    return resultDay.toLocaleString(locale || 'ko-KR', options);
    // return resultDay.toLocaleString('en-EN', options);
  }

  render() {
    const renderer = this;
    const {
      isStackedBarLoading
    } = this.props;

    const dataWeeklyCount = {
      x: 'x',
      columns: [
        ['x'].concat(this.props.scriptWeeklyTime),
        ['Total'].concat(this.props.scriptWeeklyCount),
      ],
      labels: {
        setTimeout: 3000
      },
      types: {
        Total: 'line',
      },
      colors: {
        Execution: '#009EBA',
      }
    };

    const lineCharOptions = (data) => ({
      x: 'x',
      columns: [
        ['x'].concat(data.stacked),
        ['PASS'].concat(data.pass),
        ['FAIL'].concat(data.fail),
        ['SKIP'].concat(data.skip),
      ],
      types: {
        PASS: 'line',
        FAIL: 'line',
        SKIP: 'line',
      },
      labels: true,
      colors: {
        PASS: '#009EBA',
        FAIL: '#F06449',
        SKIP: '#78B946'
      }
    });

    const stackedAxis = {
      x: {
        type: 'timeseries',
        tick: {
          format: (xTick) => { return (xTick.getMonth() + 1) + '/' + xTick.getDate() + '/' + xTick.getFullYear(); },
        }
      },
      y: {
        padding: { bottom: 0 },
        tick: {
          format: function formatTick(d11) { return d11 === Math.floor(d11) ? d11 : ''; }
        }
      }
    };

    const axis = {
      x: {
        type: 'timeseries',
        tick: {
          format: (xTick) => { return (xTick.getMonth() + 1) + '/' + xTick.getDate() + '/' + xTick.getFullYear(); },
          rotate: 0,
          culling: false
        }
      },
      y: {
        tick: {
          format: function formatTick(d11) { return d11 === Math.floor(d11) ? d11 : ''; }
        }
      },
      labels: {
        setTimeout: 3000
      }
    };

    const bar = {
      width: {
        ratio: 0.2
      }
    };

    function weekChange(val) {
      const week = val.target.value;
      renderer.props.loadTableData(week);
      renderer.props.loadAndroidAppTableData(week);
      renderer.props.loadAndroidWebTableData(week);
      renderer.props.loadPCWebTableData(week);
      renderer.props.loadResultTotalByDay(week);
      renderer.props.loadWeeklyScripts(week);
      renderer.props.loadWeeklySkipped(week);
      renderer.props.loadWeeklyFailed(week);
    }

    // console.log('Render got called');
    const styles = require('./Report.scss');

    // require the logo image both from client and server
    return (
      <section className="section section-content">
        <div className="container">
          { /* HEADER */
            <div className="row options" >
              <div className="col-lg-12">
                <div className="col-lg-6">
                  <h3 className={styles.textHead}>Automation Weekly Report</h3>
                </div>
                <div className={'col-lg-6 ' + styles.weekSelect}>
                  <select name="week-options" className="form-control" onChange={weekChange} >
                    <option value="1" key={'method_' + 1} title={this.calDayOfWeek(2, 5, 'en-EN') + ' ~ ' + this.calDayOfWeek(1, 4, 'en-EN')}>Week: {this.calDayOfWeek(2, 5) + ' ~ ' + this.calDayOfWeek(1, 4)}</option>
                    <option value="2" key={'method_' + 2} title={this.calDayOfWeek(3, 5, 'en-EN') + ' ~ ' + this.calDayOfWeek(2, 4, 'en-EN')}>Week: {this.calDayOfWeek(3, 5) + ' ~ ' + this.calDayOfWeek(2, 4)}</option>
                    <option value="3" key={'method_' + 3} title={this.calDayOfWeek(4, 5, 'en-EN') + ' ~ ' + this.calDayOfWeek(3, 4, 'en-EN')}>Week: {this.calDayOfWeek(4, 5) + ' ~ ' + this.calDayOfWeek(3, 4)}</option>
                    <option value="4" key={'method_' + 4} title={this.calDayOfWeek(5, 5, 'en-EN') + ' ~ ' + this.calDayOfWeek(4, 4, 'en-EN')}>Week: {this.calDayOfWeek(5, 5) + ' ~ ' + this.calDayOfWeek(4, 4)}</option>
                  </select>
                </div>
              </div>
            </div>
          }
          {
            this.props.totalWeeklyData && this.props.totalWeeklyData.rows.length > 0 ?
              <div>
                { /* LINE CHARTS */
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="col-lg-6">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <i className="fa fa-bar-chart-o fa-fw"></i>  All Execution status
                      </div>
                          {!isStackedBarLoading &&
                            <div className="panel-body">
                            {(this.props.barData && this.props.barData.pass && this.props.barData.pass.length) ?
                              <C3Chart data={lineCharOptions(this.props.barData)} axis={stackedAxis} bar={bar} />
                              :
                              <div>No data</div>
                            }
                            </div>
                          }
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <i className="fa fa-bar-chart-o fa-fw"></i>  Execution status  for PC Web
                      </div>
                          {!isStackedBarLoading &&
                            <div className="panel-body">
                            {(this.props.barDataPC && this.props.barDataPC.pass && this.props.barDataPC.pass.length) ?
                              <C3Chart data={lineCharOptions(this.props.barDataPC)} axis={stackedAxis} bar={bar} />
                              :
                              <div>No data</div>
                            }
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                }
                {
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="col-lg-6">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <i className="fa fa-bar-chart-o fa-fw"></i> Execution status  for Mobile App
                      </div>
                          {!isStackedBarLoading &&
                            <div className="panel-body">
                            {(this.props.barDataAndroidApp && this.props.barDataAndroidApp.pass && this.props.barDataAndroidApp.pass.length) ?
                              <C3Chart data={lineCharOptions(this.props.barDataAndroidApp)} axis={stackedAxis} bar={bar} />
                              :
                              <div>No data</div>
                            }
                            </div>
                          }
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            <i className="fa fa-bar-chart-o fa-fw"></i> Execution status for Mobile Web
                      </div>
                          {!isStackedBarLoading &&
                            <div className="panel-body">
                              {(this.props.barDataAndroidWeb && this.props.barDataAndroidWeb.pass && this.props.barDataAndroidWeb.pass.length) ?
                              <C3Chart data={lineCharOptions(this.props.barDataAndroidWeb)} axis={stackedAxis} bar={bar} />
                              :
                              <div>No data</div>
                              }
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                }
                { /* TABLES */
                  <div className="col-lg-12">
                    <div className="col-lg-6">
                      <ResultTable tableData={this.props.totalWeeklyData} title="Total scripts" />
                    </div>

                    <div className="col-lg-6">
                      <ResultTable tableData={this.props.pcWebWeeklyData} title="PC Web" />
                    </div>
                  </div>
                }
                {
                  <div className="col-lg-12">
                    <div className="col-lg-6">
                      <ResultTable tableData={this.props.androidAppWeeklyData} title="Android App" />
                    </div>

                    <div className="col-lg-6">
                      <ResultTable tableData={this.props.androidWebWeeklyData} title="Android Web" />
                    </div>
                  </div>
                }
                {
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <i className="fa fa-bar-chart-o fa-fw"></i> Auto Script  Implementation Status
                            </div>

                        <div className="panel-body">
                          {!isStackedBarLoading &&
                            <div className="col-lg-6">
                              <C3Chart data={dataWeeklyCount} axis={axis} bar={bar} />
                            </div>
                          }

                          <div className="col-lg-6">
                            <div className="panel panel-default">
                              <div className={styles.bodyWeeklyTestReport + " panel-body"}>
                                <table className={styles.tableWeeklyTestReport + " table table-hover"}>
                                  <thead>
                                    <tr>
                                      <th>No</th>
                                      <th>Date</th>
                                      <th>New Cases</th>
                                      <th>In total</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.props.resultTotalByDayData.rows.map(data =>
                                      <tr key={data.no}>
                                        <td>{data.no}</td>
                                        <td>{data.date}</td>
                                        <td>{data.totalByDay}</td>
                                        <td>{data.total}</td>
                                      </tr>
                                    )}
                                    <tr className={styles.subTotalRow}>
                                      <td></td>
                                      <td className={styles.subTotalLabel}>Sub total</td>
                                      <td>{this.props.resultTotalByDayData.total.totalByWeek}</td>
                                      <td>{this.props.resultTotalByDayData.total.totalEndByWeek}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                { /* FAILED DETAIL TABLES */
                  <div className="row chart-3">
                    <div className="col-lg-12">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <i className="fa fa-bar-chart-o fa-fw"></i>Failed test script history
                      </div>
                        <div className="panel-body">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th style={{ width: '30%' }}>Test case</th>
                                <th>Platform</th>
                                <th>Log</th>
                                <th>Execution date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.props.failedData && this.props.failedData.length ?
                                this.props.failedData.map((widget) =>
                                  <tr key={widget.id}>
                                    <td>{widget.id}</td>
                                    <td>{widget.testCaseName}</td>
                                    <td>{widget.platform}</td>
                                    <td><textarea rows="4" cols="50" defaultValue={widget.log}></textarea></td>
                                    <td>{widget.startTime}</td>
                                  </tr>) : ''
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                {
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <i className="fa fa-bar-chart-o fa-fw"></i>Skipped test script history
                        </div>
                        <div className="panel-body">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th style={{ width: '30%' }}>Test case</th>
                                <th>Platform</th>
                                <th>Log</th>
                                <th>Execution date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.props.skippedData && this.props.skippedData.length ?
                                this.props.skippedData.map((widget) =>
                                  <tr key={widget.id}>
                                    <td>{widget.id}</td>
                                    <td>{widget.testCaseName}</td>
                                    <td>{widget.platform}</td>
                                    <td><textarea rows="4" cols="50" defaultValue={widget.log}></textarea></td>
                                    <td>{widget.startTime}</td>
                                  </tr>) : ''
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                }
              </div>
              :
              <div className={styles.notificationLabel} className={styles.noEntry}>
                <span >No data to display</span>
              </div>
          }
        </div>
      </section>
    );
  }
}
