import * as lodash from 'lodash';

const LOAD_USER_SEARCH = 'LOAD_USER_SEARCH';
const LOAD_USER_SEARCH_SUCCESS = 'LOAD_USER_SEARCH_SUCCESS';
const LOAD_USER_SEARCH_FAIL = 'LOAD_USER_SEARCH_FAIL';
const PAGE_USER_SEARCH = 'PAGE_USER_SEARCH';
const PAGE_USER_SEARCH_SUCCESS = 'PAGE_USER_SEARCH_SUCCESS';
const PAGE_USER_SEARCH_FAIL = 'PAGE_USER_SEARCH_FAIL';
const CHANGE_SELECT_ALL = 'CHANGE_SELECT_ALL';
const CLEAR_ERROR = 'CLEAR_ERROR';
const CLEAR_USER_SEARCH_DATA = 'CLEAR_USER_SEARCH_DATA';

const initialState = {
  loaded: false,
  editing: {},
  data: [],
  list: [],
  newId: 0,
  suiteId: 0,
  ipAddress: {},
  successId: false,
  successSuiteId: 0,
  isError: false,
  error: null,
  saveError: null,
  errorMessage: null,
  total: 0,
  currentPage: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_ERROR:
      return {
        ...state,
        isError: false,
        error: null,
        saveError: null,
        errorMessage: null
      };
    case LOAD_USER_SEARCH:
      return {
        ...state,
        loading: true
      };
    case LOAD_USER_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        list: action.result,
        error: null
      };
    case LOAD_USER_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        list: [],
        error: action.error
      };
    case PAGE_USER_SEARCH:
      return {
        ...state,
        loading: true
      };
    case PAGE_USER_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.content,
        total: action.result.totalElements,
        currentPage: action.result.number,
        error: null
      };
    case PAGE_USER_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: [],
        error: action.error
      };
    case CHANGE_SELECT_ALL:
      // console.log(CHANGE_SELECT_ALL, action);
      const newData = lodash.cloneDeep(state.data);
      // newData.forEach(tc => tc.selected = action.isSelect);
      return {
        ...state,
        data: newData
      };
    case CLEAR_USER_SEARCH_DATA:
      return {
        ...state,
        data: []
      };
    default:
      return { ...state };
  }
}

export function isLoaded(globalState) {
  return globalState.widgets && globalState.widgets.loaded;
}

// export function load() {
//   return {
//     types: [LOAD_USER_SEARCH, LOAD_USER_SEARCH_SUCCESS, LOAD_USER_SEARCH_FAIL],
//     promise: (client) => client.get('/key/user/getAll')
//   };
// }
export function clearUserSearchData() {
  return {
    type: CLEAR_USER_SEARCH_DATA
  };
}
export function loadPage(page, pageSize, platformId = 0, title = '', method = 'NONE', tagIds = '', categoryId = 0) {
  return {
    types: [PAGE_USER_SEARCH, PAGE_USER_SEARCH_SUCCESS, PAGE_USER_SEARCH_FAIL],
    promise: (client) => client.get('/key/user/search/?page=' + page + '&pageSize=' + pageSize + '&platformId=' + platformId + '&description=' + title + '&method=' + method + '&tagIds=' + tagIds + '&categoryId=' + categoryId)
  };
}

export function changeSelectAll(isSelect) {
  return {
    type: CHANGE_SELECT_ALL, isSelect
  };
}
// export function clearError() {
//   return { type: CLEAR_ERROR };
// }
