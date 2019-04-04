const LOAD_BAR_HOME = 'LOAD_BAR_HOME';
const LOAD_BAR_HOME_SUCCESS = 'LOAD_BAR_HOME_SUCCESS';
const LOAD_BAR_HOME_FAIL = 'LOAD_BAR_HOME_FAIL';

const LOAD_BAR_HOME_COUNT = 'LOAD_BAR_HOME_COUNT';
const LOAD_BAR_HOME_COUNT_SUCCESS = 'LOAD_BAR_HOME_COUNT_SUCCESS';
const LOAD_BAR_HOME_COUNT_FAIL = 'LOAD_BAR_HOME_COUNT_FAIL';

const LOAD_STACK_BAR_HOME = 'LOAD_STACK_BAR_HOME';
const LOAD_STACK_BAR_HOME_SUCCESS = 'LOAD_STACK_BAR_HOME_SUCCESS';
const LOAD_STACK_BAR_HOME_FAIL = 'LOAD_STACK_BAR_HOME_FAIL';

const LOAD_TODAY = 'LOAD_TODAY';
const LOAD_TODAY_SUCCESS = 'LOAD_TODAY_SUCCESS';
const LOAD_TODAY_FAIL = 'LOAD_TODAY_FAIL';

const LOAD_WEEK = 'LOAD_WEEK';
const LOAD_WEEK_SUCCESS = 'LOAD_WEEK_SUCCESS';
const LOAD_WEEK_FAIL = 'LOAD_WEEK_FAIL';

const LOAD_STATS_BY_CATEGORIES = 'LOAD_STATS_BY_CATEGORIES';
const LOAD_STATS_BY_CATEGORIES_SUCCESS = 'LOAD_STATS_BY_CATEGORIES_SUCCESS';
const LOAD_STATS_BY_CATEGORIES_FAIL = 'LOAD_STATS_BY_CATEGORIES';

const LOAD_STATS_BY_PLATFORMS = 'LOAD_STATS_BY_PLATFORMS';
const LOAD_STATS_BY_PLATFORMS_SUCCESS = 'LOAD_STATS_BY_PLATFORMS_SUCCESS';
const LOAD_STATS_BY_PLATFORMS_FAIL = 'LOAD_STATS_BY_PLATFORMS_FAIL';

const LOAD_HISTORY_WEEKLY_BY_CATEGORIES = 'LOAD_HISTORY_WEEKLY_BY_CATEGORIES';
const LOAD_HISTORY_WEEKLY_BY_CATEGORIES_SUCCESS = 'LOAD_HISTORY_WEEKLY_BY_CATEGORIES_SUCCESS';
const LOAD_HISTORY_WEEKLY_BY_CATEGORIES_FAIL = 'LOAD_HISTORY_WEEKLY_BY_CATEGORIES_FAIL';

const LOAD_HISTORY_WEEKLY_BY_PLATFORM = 'LOAD_HISTORY_WEEKLY_BY_PLATFORM';
const LOAD_HISTORY_WEEKLY_BY_PLATFORM_SUCCESS = 'LOAD_HISTORY_WEEKLY_BY_PLATFORM_SUCCESS';
const LOAD_HISTORY_WEEKLY_BY_PLATFORM_FAIL = 'LOAD_HISTORY_WEEKLY_BY_PLATFORM_FAIL';

const LOAD_TESTCASES_BY_PLATFORM = 'LOAD_TESTCASES_BY_PLATFORM';
const LOAD_TESTCASES_BY_PLATFORM_SUCCESS = 'LOAD_TESTCASES_BY_PLATFORM_SUCCESS';
const LOAD_TESTCASES_BY_PLATFORM_FAIL = 'LOAD_TESTCASES_BY_PLATFORM_FAIL';

const LOAD_DASHBOARD_SETTING = 'LOAD_DASHBOARD_SETTING';
const LOAD_DASHBOARD_SETTING_SUCCESS = 'LOAD_DASHBOARD_SETTING_SUCCESS';
const LOAD_DASHBOARD_SETTING_FAIL = 'LOAD_DASHBOARD_SETTING_FAIL';

const LOAD_TOTAL_COVERAGE = 'LOAD_TOTAL_COVERAGE';
const LOAD_TOTAL_COVERAGE_SUCCESS = 'LOAD_TOTAL_COVERAGE_SUCCESS';
const LOAD_TOTAL_COVERAGE_FAIL = 'LOAD_TOTAL_COVERAGE_FAIL';

const CLEAR_ERROR = 'CLEAR_ERROR';

const initialState = {
  loaded: false,
  isError: false,
  errorMessage: null,
  saveError: null,
  error: null,
  barDataPass: [],
  barDataFail: [],
  barDataSkip: [],
  barTime: [],
  barTimeStacked: [],
  barTotal: [],
  barName: [],
  barCount: [],
  failedData: [],
  skippedData: [],
  isStackedBarLoading: false,
  todayTotal: {},
  weeklyTotal: {},
  listStatsByCategories: [],
  listStatsByPlatforms: [],
  listHistoryWeeklyByCategories: [],
  listHistoryWeeklyByPlatform: [],
  listTestcasesByPlatform: [],
  dashboardSetting: {},
  totalCoverage: { percent: 0 }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_ERROR:
      return {
        ...state,
        isError: false,
        errorMessage: null,
        saveError: null,
        error: null,
      };
    case LOAD_TODAY:
      return {
        ...state,
      };
    case LOAD_TODAY_SUCCESS:
      return {
        ...state,
        todayTotal: action.result
      };
    case LOAD_TODAY_FAIL:
      return {
        ...state,
        todayTotal: {}
      };
    case LOAD_WEEK:
      return {
        ...state,
      };
    case LOAD_WEEK_SUCCESS:
      return {
        ...state,
        weeklyTotal: action.result
      };
    case LOAD_WEEK_FAIL:
      return {
        ...state,
        weeklyTotal: {}
      };
    case LOAD_STACK_BAR_HOME:
      return {
        ...state,
        isStackedBarLoading: true
      };
    case LOAD_STACK_BAR_HOME_SUCCESS:
      const pass = [];
      const timeStack = [];
      const fail = [];
      const skip = [];
      action.result.map((res) => {
        const key = Object.keys(res);
        timeStack.push(key[0]);
        pass.push(res[key[0]].pass);
        fail.push(res[key[0]].fail);
        skip.push(res[key[0]].skip);
      });
      return {
        ...state,
        isStackedBarLoading: false,
        barDataPass: pass,
        barDataFail: fail,
        barDataSkip: skip,
        barTimeStacked: timeStack,
      };
    case LOAD_STACK_BAR_HOME_FAIL:
      return {
        ...state,
        barDataPass: [],
        barDataFail: [],
        barDataSkip: [],
        barTimeStacked: []
      };
    case LOAD_BAR_HOME:
      return {
        ...state,
        isStackedBarLoading: true
      };
    case LOAD_BAR_HOME_SUCCESS:
      const time = [];
      const total = [];
      action.result.map((res) => {
        const key = Object.keys(res);
        time.push(key[0]);
        total.push(res[key[0]].total);
      });
      return {
        ...state,
        isStackedBarLoading: false,
        barTime: time,
        barTotal: total
      };
    case LOAD_BAR_HOME_FAIL:
      return {
        ...state,
      };
    case LOAD_BAR_HOME_COUNT:
      return {
        ...state,
        isStackedBarLoading: true
      };
    case LOAD_BAR_HOME_COUNT_SUCCESS:
      const name = [];
      const count = [];
      action.result.map((res) => {
        const key = Object.keys(res);
        name.push(key[0]);
        count.push(res[key[0]]);
      });
      return {
        ...state,
        isStackedBarLoading: false,
        barName: name,
        barCount: count,
      };
    case LOAD_BAR_HOME_COUNT_FAIL:
      return {
        ...state,
        barName: [],
        barCount: []
      };
    case LOAD_STATS_BY_CATEGORIES:
      return {
        ...state,
        listStatsByCategories: []
      };
    case LOAD_STATS_BY_CATEGORIES_SUCCESS:
      const listStatsByCategoriesData = action.result;
      return {
        ...state,
        listStatsByCategories: listStatsByCategoriesData
      };
    case LOAD_STATS_BY_CATEGORIES_FAIL:
      return {
        ...state,
        listStatsByCategories: []
      };
    case LOAD_STATS_BY_PLATFORMS:
      return {
        ...state,
        listStatsByPlatforms: []
      };
    case LOAD_STATS_BY_PLATFORMS_SUCCESS:
      const listStatsByPlatforms = action.result;
      return {
        ...state,
        listStatsByPlatforms: listStatsByPlatforms
      };
    case LOAD_STATS_BY_PLATFORMS_FAIL:
      return {
        ...state,
        listStatsByPlatforms: []
      };
    case LOAD_HISTORY_WEEKLY_BY_CATEGORIES:
      return {
        ...state,
        listHistoryWeeklyByCategories: []
      };
    case LOAD_HISTORY_WEEKLY_BY_CATEGORIES_SUCCESS:
      const historyWeeklyData = action.result;
      return {
        ...state,
        listHistoryWeeklyByCategories: historyWeeklyData
      };
    case LOAD_HISTORY_WEEKLY_BY_CATEGORIES_FAIL:
      return {
        ...state,
        listHistoryWeeklyByCategories: []
      };
    case LOAD_HISTORY_WEEKLY_BY_PLATFORM:
      return {
        ...state,
        listHistoryWeeklyByPlatform: []
      };
    case LOAD_HISTORY_WEEKLY_BY_PLATFORM_SUCCESS:
      const listHistoryWeeklyByPlatform = action.result;
      return {
        ...state,
        listHistoryWeeklyByPlatform: listHistoryWeeklyByPlatform
      };
    case LOAD_HISTORY_WEEKLY_BY_PLATFORM_FAIL:
      return {
        ...state,
        listHistoryWeeklyByPlatform: []
      };
    case LOAD_TESTCASES_BY_PLATFORM:
      return {
        ...state,
        listTestcasesByPlatform: []
      };
    case LOAD_TESTCASES_BY_PLATFORM_SUCCESS:
      const stats = [];
      let totalTC = 0;
      action.result.map((platform) => {
        stats.push(platform);
        totalTC += platform.testcases;
      });
      stats.unshift({
        id: -1,
        testcases: totalTC
      });
      stats.forEach((platform) => {
        platform.percent = platform.testcases / totalTC * 100;
      });
      // console.log(stats);
      return {
        ...state,
        listTestcasesByPlatform: stats
      };
    case LOAD_TESTCASES_BY_PLATFORM_FAIL:
      return {
        ...state,
        listTestcasesByPlatform: []
      };
    case LOAD_DASHBOARD_SETTING:
      return {
        ...state,
        dashboardSetting: {}
      };
    case LOAD_DASHBOARD_SETTING_SUCCESS:
      return {
        ...state,
        dashboardSetting: action.result
      };
    case LOAD_DASHBOARD_SETTING_FAIL:
      return {
        ...state,
        dashboardSetting: {}
      };
    case LOAD_TOTAL_COVERAGE:
      return {
        ...state,
        totalCoverage: { percent: 0 }
      };
    case LOAD_TOTAL_COVERAGE_SUCCESS:
      const result = { percent: action.result.autoCoverage };
      return {
        ...state,
        totalCoverage: result
      };
    case LOAD_TOTAL_COVERAGE_FAIL:
      return {
        ...state,
        totalCoverage: { percent: 0 }
      };
    default:
      return { ...state };
  }
}


export function loadBarChart() {
  return {
    types: [LOAD_BAR_HOME, LOAD_BAR_HOME_SUCCESS, LOAD_BAR_HOME_FAIL],
    promise: (client) => client.get('/api/dashboard/getResultByWeekTotal/8')
  };
}

export function loadStackBarChartHome() {
  return {
    types: [LOAD_STACK_BAR_HOME, LOAD_STACK_BAR_HOME_SUCCESS, LOAD_STACK_BAR_HOME_FAIL],
    promise: (client) => client.get('/api/dashboard/getResultByWeekHome/1')
  };
}

export function loadBarHorizontalChart() {
  return {
    types: [LOAD_BAR_HOME_COUNT, LOAD_BAR_HOME_COUNT_SUCCESS, LOAD_BAR_HOME_COUNT_FAIL],
    promise: (client) => client.get('/api/dashboard/getTestcaseRunByMon/1/15')
  };
}

export function loadTodayExecution() {
  return {
    types: [LOAD_TODAY, LOAD_TODAY_SUCCESS, LOAD_TODAY_FAIL],
    promise: (client) => client.get('/api/dashboard/getTodayTotalExecution')
  };
}

export function loadWeeklyExecution() {
  return {
    types: [LOAD_WEEK, LOAD_WEEK_SUCCESS, LOAD_WEEK_FAIL],
    promise: (client) => client.get('/api/dashboard/getWeeklyTotalExecution')
  };
}

export function loadStatsByPlatforms() {
  return {
    types: [LOAD_STATS_BY_PLATFORMS, LOAD_STATS_BY_PLATFORMS_SUCCESS, LOAD_STATS_BY_PLATFORMS_FAIL],
    promise: (client) => client.get('/key/stat/platformsCoverage')
  };
}

export function loadStatsByCategories() {
  return {
    types: [LOAD_STATS_BY_CATEGORIES, LOAD_STATS_BY_CATEGORIES_SUCCESS, LOAD_STATS_BY_CATEGORIES_FAIL],
    promise: (client) => client.get('/key/stat/catsCoverage')
  };
}

export function loadHistoryWeeklyByCategories() {
  return {
    types: [LOAD_HISTORY_WEEKLY_BY_CATEGORIES, LOAD_HISTORY_WEEKLY_BY_CATEGORIES_SUCCESS, LOAD_HISTORY_WEEKLY_BY_CATEGORIES_FAIL],
    promise: (client) => client.get('/api/dashboard/getHistoryWeeklyAllCategory')
  };
}

export function loadHistoryWeeklyByPlatform() {
  return {
    types: [LOAD_HISTORY_WEEKLY_BY_PLATFORM, LOAD_HISTORY_WEEKLY_BY_PLATFORM_SUCCESS, LOAD_HISTORY_WEEKLY_BY_PLATFORM_FAIL],
    promise: (client) => client.get('/api/dashboard/getHistoryWeeklyAllPlatform')
  };
}

export function loadTestcasesByPlatform() {
  return {
    types: [LOAD_TESTCASES_BY_PLATFORM, LOAD_TESTCASES_BY_PLATFORM_SUCCESS, LOAD_TESTCASES_BY_PLATFORM_FAIL],
    promise: (client) => client.get('/key/testcase/countAllPlatformTestcase')
  };
}
export function loadDashboardSetting(userId) {
  return {
    types: [LOAD_DASHBOARD_SETTING, LOAD_DASHBOARD_SETTING_SUCCESS, LOAD_DASHBOARD_SETTING_FAIL],
    promise: (client) => client.get('/key/setting/getByUsername/?=' + userId)
  };
}
export function loadTotalCoverage() {
  return {
    types: [LOAD_TOTAL_COVERAGE, LOAD_TOTAL_COVERAGE_SUCCESS, LOAD_TOTAL_COVERAGE_FAIL],
    promise: (client) => client.get('/api/dashboard/autocoverage/')
  };
}


