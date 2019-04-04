import lodash from 'lodash';

const LOAD_FAILED = 'LOAD_FAILED';
const LOAD_FAILED_SUCCESS = 'LOAD_FAILED_SUCCESS';
const LOAD_FAILED_FAIL = 'LOAD_FAILED_FAIL';
const LOAD_SKIPPED = 'LOAD_SKIPPED';
const LOAD_SKIPPED_SUCCESS = 'LOAD_SKIPPED_SUCCESS';
const LOAD_SKIPPED_FAIL = 'LOAD_SKIPPED_FAIL';
const LOAD_SCRIPTS_WEEKLY = 'LOAD_SCRIPTS_WEEKLY';
const LOAD_SCRIPTS_WEEKLY_SUCCESS = 'LOAD_SCRIPTS_WEEKLY_SUCCESS';
const LOAD_SCRIPTS_WEEKLY_FAIL = 'LOAD_SCRIPTS_WEEKLY_FAIL';
const LOAD_BAR_COUNT = 'LOAD_BAR_COUNT';
const LOAD_BAR_COUNT_SUCCESS = 'LOAD_BAR_COUNT_SUCCESS';
const LOAD_BAR_COUNT_FAIL = 'LOAD_BAR_COUNT_FAIL';
const LOAD_TABLE_DATA = 'LOAD_TABLE_DATA';
const LOAD_TABLE_DATA_SUCCESS = 'LOAD_TABLE_DATA_SUCCESS';
const LOAD_TABLE_DATA_FAIL = 'LOAD_TABLE_DATA_FAIL';
const LOAD_WEEK = 'LOAD_WEEK';
const LOAD_WEEK_SUCCESS = 'LOAD_WEEK_SUCCESS';
const LOAD_WEEK_FAIL = 'LOAD_WEEK_FAIL';
const LOAD_ANDROID_APP_TABLE_DATA = 'LOAD_ANDROID_APP_TABLE_DATA';
const LOAD_ANDROID_APP_TABLE_DATA_SUCCESS = 'LOAD_ANDROID_APP_TABLE_DATA_SUCCESS';
const LOAD_ANDROID_APP_TABLE_DATA_FAIL = 'LOAD_ANDROID_APP_TABLE_DATA_FAIL';
const LOAD_ANDROID_WEB_TABLE_DATA = 'LOAD_ANDROID_WEB_TABLE_DATA';
const LOAD_ANDROID_WEB_TABLE_DATA_SUCCESS = 'LOAD_ANDROID_WEB_TABLE_DATA_SUCCESS';
const LOAD_ANDROID_WEB_TABLE_DATA_FAIL = 'LOAD_ANDROID_WEB_TABLE_DATA_FAIL';
const LOAD_PC_WEB_TABLE_DATA = 'LOAD_PC_WEB_TABLE_DATA';
const LOAD_PC_WEB_TABLE_DATA_SUCCESS = 'LOAD_PC_WEB_TABLE_DATA_SUCCESS';
const LOAD_PC_WEB_TABLE_DATA_FAIL = 'LOAD_PC_WEB_TABLE_DATA_FAIL';
const LOAD_RESULT_TOTAL_BY_DAY = 'LOAD_RESULT_TOTAL_BY_DAY';
const LOAD_RESULT_TOTAL_BY_DAY_SUCCESS = 'LOAD_RESULT_TOTAL_BY_DAY_SUCCESS';
const LOAD_RESULT_TOTAL_BY_DAY_FAIL = 'LOAD_RESULT_TOTAL_BY_DAY_FAIL';

const PLATFORM_ANDROID_APP = 1;
const PLATFORM_ANDROID_WEB = 2;
const PLATFORM_PC_WEB = 3;

const barChartState = ()=>({ pass: [], stacked: [], fail: [], skip: [] });
const tableState = ()=>({
  rows: [],
  total: { passTotal: 0, failTotal: 0, skipTotal: 0, total: 0 },
  coverage: { passCoverage: 0, failCoverage: 0, skipCoverage: 0, totalCoverage: 0 },
});
const initialState = {
  loaded: false,
  failedData: [],
  skippedData: [],
  scriptWeeklyTime: [],
  scriptWeeklyCount: [],
  barTime: [],
  barMobilePlatformTimeStacked: [],
  barTotal: [],
  barName: [],
  barCount: [],
  isStackedBarLoading: false,
  todayTotal: {},
  weeklyTotal: {},
  barData: barChartState(),
  barDataAndroidApp: barChartState(),
  barDataAndroidWeb: barChartState(),
  barDataPC: barChartState(),
  resultTotalByDayData: { rows: [], total: {} },
  totalWeeklyData: tableState(),
  pcWebWeeklyData: tableState(),
  androidAppWeeklyData: tableState(),
  androidWebWeeklyData: tableState(),
  dates: []
};

function fillDates(dates, weeklyData) {
  // console.log(dates);
  // console.log(JSON.stringify(weeklyData));
  if (weeklyData[0] && (weeklyData[0].date === '0' || weeklyData[0].date === 0 || weeklyData[0].date === '')) {
    // console.log('Remove row at ', index, ' on date: ', thisDate);
    weeklyData.splice(0, 1);
  }

  for (let index = 0; index < dates.length; index++) {
    const thisDate = dates[index];
    const emptyRow = { no: (index + 1), date: thisDate, pass: 0, fail: 0, skip: 0, rowTotal: 0, perPassed: 0 };
    if ((index <= weeklyData.length)
    && weeklyData[index]
    && (weeklyData[index].date !== thisDate)) {
      // console.log('Insert empty row at ', index, ' on date: ', thisDate);
      weeklyData.splice(index, 0, emptyRow);
      // index = index + 1;
    } else if (index + 1 > weeklyData.length) {
      // console.log('Push empty row at ', index, ' on date: ', thisDate);
      weeklyData.push(emptyRow);
    } else if (weeklyData[index]) {
      weeklyData[index].no = (index + 1);
      // console.log('Existed Date :', index, ' on date: ', thisDate);
    }
  }

  // console.log('After : ', JSON.stringify(weeklyData));
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_FAILED:
      return {
        ...state,
      };
    case LOAD_FAILED_SUCCESS:
      return {
        ...state,
        failedData: action.result
      };
    case LOAD_FAILED_FAIL:
      return {
        ...state,
        todayTotal: {}
      };
    case LOAD_SKIPPED:
      return {
        ...state,
      };
    case LOAD_SKIPPED_SUCCESS:
      return {
        ...state,
        skippedData: action.result
      };
    case LOAD_SKIPPED_FAIL:
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
    case LOAD_SCRIPTS_WEEKLY:
      return {
        ...state,
      };
    case LOAD_SCRIPTS_WEEKLY_SUCCESS:
      const time1 = [];
      const total1 = [];
      action.result.map((res) => {
        const key1 = Object.keys(res);
        time1.push(key1[0]);
        total1.push(res[key1[0]].count);
      });

      return {
        ...state,
        scriptWeeklyTime: time1,
        scriptWeeklyCount: total1
      };
    case LOAD_SCRIPTS_WEEKLY_FAIL:
      return {
        ...state,
      };

    case LOAD_TABLE_DATA:
      return {
        ...state,
        isStackedBarLoading: true
      };
    case LOAD_TABLE_DATA_SUCCESS:
      state.barData = barChartState();

      action.result.rows.forEach(data => {
        state.barData.stacked.push(data.date);
        state.barData.pass.push(data.pass);
        state.barData.fail.push(data.fail);
        state.barData.skip.push(data.skip);
      });

      state.totalWeeklyData = action.result;
      state.dates = lodash.map(state.totalWeeklyData.rows, 'date');

      return {
        ...state,
        isStackedBarLoading: false
      };
    case LOAD_TABLE_DATA_FAIL:
      return {
        ...state
      };
    case LOAD_BAR_COUNT:
      return {
        ...state,
        isStackedBarLoading: true
      };
    case LOAD_BAR_COUNT_SUCCESS:
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
    case LOAD_BAR_COUNT_FAIL:
      return {
        ...state,
        barName: [],
        barCount: []
      };
    case LOAD_ANDROID_APP_TABLE_DATA:
      return {
        ...state,
        isStackedBarLoading: true
      };
    case LOAD_ANDROID_APP_TABLE_DATA_SUCCESS:
      state.barDataAndroidApp = barChartState();

      action.result.rows.forEach(data => {
        state.barDataAndroidApp.stacked.push(data.date);
        state.barDataAndroidApp.pass.push(data.pass);
        state.barDataAndroidApp.fail.push(data.fail);
        state.barDataAndroidApp.skip.push(data.skip);
      });

      state.androidAppWeeklyData = action.result;
      fillDates(state.dates, state.androidAppWeeklyData.rows);

      return {
        ...state,
        isStackedBarLoading: false
      };
    case LOAD_ANDROID_APP_TABLE_DATA_FAIL:
      state.androidAppWeeklyData = tableState();
      return {
        ...state
      };
    case LOAD_ANDROID_WEB_TABLE_DATA:
      return {
        ...state,
        isStackedBarLoading: true
      };
    case LOAD_ANDROID_WEB_TABLE_DATA_SUCCESS:
      state.barDataAndroidWeb = barChartState();

      action.result.rows.forEach(data => {
        state.barDataAndroidWeb.stacked.push(data.date);
        state.barDataAndroidWeb.pass.push(data.pass);
        state.barDataAndroidWeb.fail.push(data.fail);
        state.barDataAndroidWeb.skip.push(data.skip);
      });
      state.androidWebWeeklyData = action.result;
      fillDates(state.dates, state.androidWebWeeklyData.rows);

      return {
        ...state,
        isStackedBarLoading: false
      };
    case LOAD_ANDROID_WEB_TABLE_DATA_FAIL:
      state.androidWebWeeklyData = tableState();
      return {
        ...state
      };
    case LOAD_PC_WEB_TABLE_DATA:
      return {
        ...state,
        isStackedBarLoading: true
      };
    case LOAD_PC_WEB_TABLE_DATA_SUCCESS:
      state.barDataPC = barChartState();
      action.result.rows.forEach(data => {
        state.barDataPC.stacked.push(data.date);
        state.barDataPC.pass.push(data.pass);
        state.barDataPC.fail.push(data.fail);
        state.barDataPC.skip.push(data.skip);
      });

      state.pcWebWeeklyData = action.result;
      fillDates(state.dates, state.pcWebWeeklyData.rows);
      return {
        ...state,
        isStackedBarLoading: false
      };
    case LOAD_PC_WEB_TABLE_DATA_FAIL:
      state.pcWebWeeklyData = tableState();
      return {
        ...state
      };
    case LOAD_RESULT_TOTAL_BY_DAY:
      return {
        ...state,
        isStackedBarLoading: true
      };
    case LOAD_RESULT_TOTAL_BY_DAY_SUCCESS:
      state.resultTotalByDayData = action.result;

      return {
        ...state,
        isStackedBarLoading: false,
      };
    case LOAD_RESULT_TOTAL_BY_DAY_FAIL:
      return {
        ...state
      };
    default:
      return { ...state };
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function loadTableData(week) {
  return {
    types: [LOAD_TABLE_DATA, LOAD_TABLE_DATA_SUCCESS, LOAD_TABLE_DATA_FAIL],
    promise: (client) => client.get('/api/dashboard/getResultTotalByWeek/' + week)
  };
}

export function loadBarHorizontalChart() {
  return {
    types: [LOAD_BAR_COUNT, LOAD_BAR_COUNT_SUCCESS, LOAD_BAR_COUNT_FAIL],
    promise: (client) => client.get('/api/dashboard/getTestcaseRunByMon/1/15')
  };
}

export function loadWeeklyExecution() {
  return {
    types: [LOAD_WEEK, LOAD_WEEK_SUCCESS, LOAD_WEEK_FAIL],
    promise: (client) => client.get('/api/dashboard/getWeeklyTotalExecution')
  };
}

export function loadWeeklyFailed(week) {
  return {
    types: [LOAD_FAILED, LOAD_FAILED_SUCCESS, LOAD_FAILED_FAIL],
    promise: (client) => client.get('/api/dashboard/getWeeklyFailed/' + week)
  };
}


export function loadWeeklySkipped(week) {
  return {
    types: [LOAD_SKIPPED, LOAD_SKIPPED_SUCCESS, LOAD_SKIPPED_FAIL],
    promise: (client) => client.get('/api/dashboard/getWeeklySkipped/' + week)
  };
}

export function loadWeeklyScripts(week) {
  return {
    types: [LOAD_SCRIPTS_WEEKLY, LOAD_SCRIPTS_WEEKLY_SUCCESS, LOAD_SCRIPTS_WEEKLY_FAIL],
    promise: (client) => client.get('/api/dashboard/getTestScriptsWeekly/' + week)
  };
}

// Android App Platform
export function loadAndroidAppTableData(week) {
  return {
    types: [LOAD_ANDROID_APP_TABLE_DATA, LOAD_ANDROID_APP_TABLE_DATA_SUCCESS, LOAD_ANDROID_APP_TABLE_DATA_FAIL],
    promise: (client) => client.get('/api/dashboard/getResultOfPlatformByWeek/' + PLATFORM_ANDROID_APP + '/' + week)
  };
}

// Android Web Platform
export function loadAndroidWebTableData(week) {
  return {
    types: [LOAD_ANDROID_WEB_TABLE_DATA, LOAD_ANDROID_WEB_TABLE_DATA_SUCCESS, LOAD_ANDROID_WEB_TABLE_DATA_FAIL],
    promise: (client) => client.get('/api/dashboard/getResultOfPlatformByWeek/' + PLATFORM_ANDROID_WEB + '/' + week)
  };
}

// PC Web Platform
export function loadPCWebTableData(week) {
  return {
    types: [LOAD_PC_WEB_TABLE_DATA, LOAD_PC_WEB_TABLE_DATA_SUCCESS, LOAD_PC_WEB_TABLE_DATA_FAIL],
    promise: (client) => client.get('/api/dashboard/getResultOfPlatformByWeek/' + PLATFORM_PC_WEB + '/' + week)
  };
}

// Total by date and from first to current date of platform all
export function loadResultTotalByDay(week) {
  return {
    types: [LOAD_RESULT_TOTAL_BY_DAY, LOAD_RESULT_TOTAL_BY_DAY_SUCCESS, LOAD_RESULT_TOTAL_BY_DAY_FAIL],
    promise: (client) => client.get('/api/dashboard/getResultTotalByDay/' + week)
  };
}
