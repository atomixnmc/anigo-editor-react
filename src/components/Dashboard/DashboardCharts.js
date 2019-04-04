import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import lodash from 'lodash';
import * as notificationActions from 'redux/modules/notification';
import * as dashboardActions from 'redux/modules/dashboard';
import * as categoryActions from 'redux/modules/category/category-manage';
import * as tagActions from 'redux/modules/tag/tag-manage';
import C3Chart from 'react-c3js';
import { DashBoardButton, WidgetCategoryStats } from 'components';
import { ProgressBar } from 'react-bootstrap';
import { getErrorMessage, watchForError } from 'utils/errorParse';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    const promises = [
      dispatch(categoryActions.load()),
      dispatch(tagActions.load()),
    //   dispatch(dashboardActions.loadTotalCoverage())
    ];
    return Promise.all(promises);
  }
}])
@connect(
  state => (
    {
      user: state.auth.user,
      barDataPass: state.dashboard.barDataPass,
      barDataFail: state.dashboard.barDataFail,
      barDataSkip: state.dashboard.barDataSkip,
      barTime: state.dashboard.barTime,
      barTotal: state.dashboard.barTotal,
      barName: state.dashboard.barName,
      barCount: state.dashboard.barCount,
      barTimeStacked: state.dashboard.barTimeStacked,
      todayTotal: state.dashboard.todayTotal,
      weeklyTotal: state.dashboard.weeklyTotal,
      listPlatform: state.platformManage.listPlatform,
      listCategories: state.categoryManage.list,
      listTags: state.tagManage.list,
      listStatsByCategories: state.dashboard.listStatsByCategories,
      listHistoryWeeklyByPlatform: state.dashboard.listHistoryWeeklyByPlatform,
      listHistoryWeeklyByCategories: state.dashboard.listHistoryWeeklyByCategories,
      listStatsByPlatforms: state.dashboard.listStatsByPlatforms,
      listTestcasesByPlatform: state.dashboard.listTestcasesByPlatform,
      dashboardSetting: state.dashboard.dashboardSetting,
      totalCoverage: state.dashboard.totalCoverage,
      error: state.dashboard.error,
      errorMessage: state.dashboard.errorMessage,
      isError: state.dashboard.isError,
    }),
  {
    ...dashboardActions,
    ...notificationActions,
    loadCategories: categoryActions.load,
    // loadTags: tagActions.load,
    // loadPlatform: platformActions.loadPlatform,
    // loadTotalCoverage: dashboardActions.loadTotalCoverage
  })

export default class DashboardCharts extends Component {
  static propTypes = {
    user: PropTypes.object,
    loadBarChart: PropTypes.func,
    loadStackBarChartHome: PropTypes.func,
    loadBarHorizontalChart: PropTypes.func,
    loadWeeklyFailed: PropTypes.func,
    loadWeeklySkipped: PropTypes.func,
    loadTodayExecution: PropTypes.func,
    loadWeeklyExecution: PropTypes.func,
    barDataPass: PropTypes.array,
    barDataFail: PropTypes.array,
    barDataSkip: PropTypes.array,
    barTotal: PropTypes.array,
    barTime: PropTypes.array,
    barName: PropTypes.array,
    barTimeStacked: PropTypes.array,
    barCount: PropTypes.array,
    isStackedBarLoading: PropTypes.bool,
    todayTotal: PropTypes.object,
    weeklyTotal: PropTypes.object,
    loadCategories: PropTypes.func,
    loadTags: PropTypes.func,
    loadPlatform: PropTypes.func,
    loadStatsByCategories: PropTypes.func,
    loadStatsByPlatforms: PropTypes.func,
    loadHistoryWeeklyByCategories: PropTypes.func,
    loadTestcasesByPlatform: PropTypes.func,
    loadHistoryWeeklyByPlatform: PropTypes.func,
    loadTotalCoverage: PropTypes.func,
    listCategories: PropTypes.array,
    listTags: PropTypes.array,
    listPlatform: PropTypes.array,
    listStatsByCategories: PropTypes.array,
    listStatsByPlatforms: PropTypes.array,
    listHistoryWeeklyByPlatform: PropTypes.array,
    listHistoryWeeklyByCategories: PropTypes.array,
    listTestcasesByPlatform: PropTypes.array,
    dashboardSetting: PropTypes.object,
    totalCoverage: PropTypes.object,
    clearError: PropTypes.func,
  };

  componentWillMount() {
    this.props.loadBarChart();
    this.props.loadStackBarChartHome();
    this.props.loadTodayExecution();
    this.props.loadWeeklyExecution();
    this.props.loadBarHorizontalChart();
    this.props.loadStatsByCategories();
    this.props.loadStatsByPlatforms();
    this.props.loadHistoryWeeklyByPlatform();
    this.props.loadHistoryWeeklyByCategories();
    this.props.loadTestcasesByPlatform();
    this.props.loadTotalCoverage();
  }
  componentWillReceiveProps(nextProps) {
    watchForError(this.props, nextProps, 'DashboardCharts');
    this.props.clearError();
  }

  render() {
    const { barDataPass, barDataFail, barDataSkip, barTime, barTotal, isStackedBarLoading, barName, barCount, barTimeStacked, todayTotal, weeklyTotal } = this.props;
    const { listStatsByCategories, listHistoryWeeklyByCategories, listTestcasesByPlatform, listStatsByPlatforms, totalCoverage } = this.props;
    const dataBar2 = {
      x: 'x',
      columns:
        [
          ['x'].concat(barName),
          ['Execution'].concat(barCount)
        ],

      type: 'bar',
      colors: {
        Execution: '#009EBA',
      },
    };

    const axisHor = {
      rotated: true,
      x: {
        type: 'category',
        tick: {
          multiline: false
        },
      }
    };

    const dataBar = {
      x: 'x',
      columns: [
        ['x'].concat(barTime),
        ['Execution'].concat(barTotal),
      ],
      types: {
        Execution: 'bar',
      },
      colors: {
        Execution: '#009EBA',
      },
    };


    const data = {
      x: 'x',
      columns: [
        ['x'].concat(barTimeStacked),
        ['PASS'].concat(barDataPass),
        ['FAIL'].concat(barDataFail),
        ['SKIP'].concat(barDataSkip),
      ],
      types: {
        PASS: 'bar',
        FAIL: 'bar',
        SKIP: 'bar',
      },
      groups: [
        ['PASS', 'FAIL', 'SKIP']
      ],
      colors: {
        PASS: '#009EBA',
        FAIL: '#F06449',
        SKIP: '#78B946'
      },
    };

    const stackedAxis = {
      x: {
        type: 'timeseries',
        tick: {
          format: (xTick) => { return (xTick.getMonth() + 1) + '/' + xTick.getDate() + '/' + xTick.getFullYear(); },
        }
      }
    };

    const axis = {
      x: {
        type: 'timeseries',
        tick: {
          format: (xTick) => { return (xTick.getMonth() + 1) + '/' + xTick.getDate() + '/' + xTick.getFullYear(); },
          rotate: 65,
          culling: false
        }
      }
    };

    const bar = {
      width: {
        ratio: 0.2
      }
    };

    const gaugeData = {
      columns: [
        ['Auto Coverage', totalCoverage.percent]
      ],
      type: 'gauge',
    };
    // const gauge = {

    // };
    const gaugeColor = {
      pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
      threshold: {
//            unit: 'value', // percentage is default
//            max: 200, // 100 is default
        values: [30, 50, 70, 100]
      }
    };

    const getCategoryById = (catId) => {
      let result = null;
      result = lodash.find(this.props.listCategories, (cat) => { return cat.id === catId; });
      if (!result) {
        result = {
          id: -1,
          description: 'None'
        };
      }
      return result;
    };

    const getPlatformById = (platformId) => {
      let result = null;
      if (platformId !== -1) {
        result = lodash.find(this.props.listPlatform, (platform) => { return platform.id === platformId; });
      } else {
        result = {
          id: -1,
          description: 'All'
        };
      }
      return result;
    };

    const handleProgressStyle = (percent) => {
      if (percent === 100) {
        return 'success';
      }
      return 'info';
      // if (percent > 80) {
      //   return 'success';
      // }
      // if (percent > 60) {
      //   return 'info';
      // }
      // if (percent >= 40) {
      //   return 'warning';
      // }
      // if (percent < 40) {
      //   return 'danger';
      // }
    };
    const findCategoryHistory = (categoryName) => {
      return lodash.find(this.props.listHistoryWeeklyByCategories, (historyData) => historyData.categoryName.toLowerCase() == categoryName.toLowerCase());
    };
    const findPlatformHistory = (platformName) => {
      return lodash.find(this.props.listHistoryWeeklyByPlatform, (historyData) => historyData.categoryName.toLowerCase() == platformName.toLowerCase());
    };

    require('./DashboardCharts.scss');

    const { user } = this.props;
    // require the logo image both from client and server
    return (
      <section className="section section-content">
          <div>
            <div className="container">
              <div className="row">
                <h3>Total <small>Coverage and testcases</small></h3>
                <div className="col-lg-4">
                  <div className="panel panel-default">
                    <div className="panel-body">
                      <C3Chart data={gaugeData} color={gaugeColor} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="panel panel-default">
                    <div className="panel-body">
                    {listTestcasesByPlatform && listTestcasesByPlatform.length &&
                    listTestcasesByPlatform.map((stat) =>
                      <div className="row" key={stat.id}>
                        <div className="col-md-2">
                          <span>{(getPlatformById(stat.id)).description}</span>
                        </div>
                        <div className="col-md-2">
                          <span className="label label-info">{stat.testcases}</span> TC
                          {/* <span className="label label-default">{stat.percent.toFixed(2)}% </span> */}
                        </div>
                        <div className="col-md-8">
                          <ProgressBar bsStyle={handleProgressStyle(stat.percent)} now={stat.percent} label={`${stat.percent.toFixed(2)}%`} />
                        </div>
                      </div>
                    )}
                    </div>
                  </div>
                  {/* <div className="panel panel-default">
                    <div className="panel-body">
                    {listStatsByCategories && listStatsByCategories.length &&
                    listStatsByCategories.map((stat) =>
                      <div className="row" key={stat.categoryId}>
                        <div className="col-md-2">
                          <span>{(getCategoryById(stat.categoryId)).description}</span>
                        </div>
                        <div className="col-md-2" title={stat.percent + '%'}>
                          <span className="label label-info">{stat.value}</span>
                        </div>
                        <div className="col-md-8">
                          <ProgressBar bsStyle={handleProgressStyle(stat.percent.toFixed(2))} now={stat.percent} label={`${stat.percent.toFixed(2)}%`} />
                        </div>
                      </div>
                    )}
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="row stats">
              <h3>This week <small>Coverage by category and History</small></h3>
              {listHistoryWeeklyByCategories && listHistoryWeeklyByCategories.length &&
                    listHistoryWeeklyByCategories.map((stat) =>
                <div className="col-lg-3" key={stat.categoryId} title={stat.categoryName}>
                  <WidgetCategoryStats text={stat.categoryName} value={'' + stat.coverage} stats={ stat } />
                </div>
                )}
              <h3>This week <small>Coverage by platforms and History</small></h3>
              {listStatsByPlatforms && listStatsByPlatforms.length &&
                    listStatsByPlatforms.map((stat) =>
                <div className="col-lg-3" key={stat.name} title={stat.name}>
                  <WidgetCategoryStats text={stat.name} value={'' + stat.coverage} stats={ findPlatformHistory(stat.name) } />
                </div>
                )}
                {/* <div className="col-lg-3 widgetAdd">
                  <div className="btn btn-default" >
                    <span className="glyphicon glyphicon-plus"></span> Add more widgets
                  </div>
                </div> */}
              </div>
            </div>
            <div className="container">
              <div className="row">
                {todayTotal &&
                  <DashBoardButton value={todayTotal.total} col={6} text="Today's execution" icon="fa fa-gear" />
                }
                {weeklyTotal &&
                  <DashBoardButton value={weeklyTotal.total} col={6} text="Weekly of execution" icon="fa fa-gears" />
                }
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <i className="fa fa-bar-chart-o fa-fw"></i> PASS - FAIL Trend (by week)
                    </div>
                    {!isStackedBarLoading &&
                      <div className="panel-body">
                        <C3Chart data={data} axis={stackedAxis} bar={bar} />
                      </div>
                    }
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <i className="fa fa-bar-chart-o fa-fw"></i> Test Execution (latest two months)
            </div>
                {!isStackedBarLoading &&
                  <div className="panel-body">
                    <C3Chart data={dataBar} axis={axis} bar={bar} />
                  </div>
                }
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <i className="fa fa-bar-chart-o fa-fw"></i>Top executed module (by month)
              </div>
                <div className="panel-body">
                  <C3Chart data={dataBar2} axis={axisHor} />
                </div>
              </div>
            </div>
          </div>
      </section>
    );
  }
}
