import * as _ from 'lodash';
import { getErrorMessage, extractError } from 'utils/errorParse';

const LOAD_ALL_USER_GROUP = 'LOAD_ALL_USER_GROUP';
const LOAD_ALL_USER_GROUP_SUCCESS = 'LOAD_ALL_USER_GROUP_SUCCESS';
const LOAD_ALL_USER_GROUP_FAIL = 'LOAD_ALL_USER_GROUP_FAIL';
const EDIT_USER_GROUP_START = 'EDIT_USER_GROUP_START';
const EDIT_USER_GROUP_STOP = 'EDIT_USER_GROUP_STOP';
const ADD_NEW_USER_GROUP = 'ADD_NEW_USER_GROUP';
const ADD_NEW_USER_GROUP_SUCCESS = 'ADD_NEW_USER_GROUP_SUCCESS';
const ADD_NEW_USER_GROUP_FAIL = 'ADD_NEW_USER_GROUP_FAIL';
const ADD_USER_GROUP = 'ADD_USER_GROUP';
const ADD_USER_GROUP_SUCCESS = 'ADD_USER_GROUP_SUCCESS';
const ADD_USER_GROUP_FAIL = 'ADD_USER_GROUP_FAIL';
const DELETE_USER_GROUP = 'DELETE_USER_GROUP';
const DELETE_USER_GROUP_SUCCESS = 'DELETE_USER_GROUP_SUCCESS';
const DELETE_USER_GROUP_FAIL = 'DELETE_USER_GROUP_FAIL';
const SAVE_USER_GROUP = 'SAVE_USER_GROUP';
const SAVE_USER_GROUP_SUCCESS = 'SAVE_USER_GROUP_SUCCESS';
const SAVE_USER_GROUP_FAIL = 'SAVE_USER_GROUP_FAIL';
const CLEAR_ERROR = 'CLEAR_ERROR';
const LOAD_PAGE_USER_GROUP = 'LOAD_PAGE_USER_GROUP';
const LOAD_PAGE_USER_GROUP_SUCCESS = 'LOAD_PAGE_USER_GROUP_SUCCESS';
const LOAD_PAGE_USER_GROUP_FAIL = 'LOAD_PAGE_USER_GROUP_FAIL';
const LOAD_USER_GROUP = 'LOAD_USER_GROUP';
const LOAD_USER_GROUP_SUCCESS = 'LOAD_USER_GROUP_SUCCESS';
const LOAD_USER_GROUP_FAIL = 'LOAD_USER_GROUP_FAIL';

const MOCK_USER_GROUPS = [
  // {
  //   id: 1,
  //   roleName: 'admin',
  //   status: 'Approved',
  //   description: 'Admin',
  //   enable: true,
  //   userNum: 1,
  //   groupNum: 1
  // },
  // {
  //   id: 2,
  //   roleName: 'user',
  //   status: 'Approved',
  //   description: 'User',
  //   enable: true,
  //   userNum: 2,
  //   groupNum: 1
  // }
];
const initialState = {
  loaded: false,
  editing: {},
  data: null,
  list: MOCK_USER_GROUPS,
  listAll: MOCK_USER_GROUPS,
  error: null,
  isError: false,
  errorMessage: null,
  saveError: null,
  total: 0,
  currentPage: 0,
  platformId: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
        isError: false,
        errorMessage: null,
        saveError: null
      };
    case LOAD_ALL_USER_GROUP:
      return {
        ...state,
        loading: true
      };
    case LOAD_ALL_USER_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        listAll: action.result
      };
    case LOAD_ALL_USER_GROUP_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        listAll: []
      };

    case DELETE_USER_GROUP:
      return { ...state };
    case DELETE_USER_GROUP_SUCCESS:
      return {
        ...state
      };
    case DELETE_USER_GROUP_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case ADD_NEW_USER_GROUP:
      return {
        ...state,
      };
    case ADD_NEW_USER_GROUP_SUCCESS:
      return {
        ...state
      };
    case ADD_NEW_USER_GROUP_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case EDIT_USER_GROUP_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_USER_GROUP_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case ADD_USER_GROUP:
      return { ...state };
    case ADD_USER_GROUP_SUCCESS:
      return {
        ...state
      };
    case ADD_USER_GROUP_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case SAVE_USER_GROUP:
      return {
        ...state
      };
    case SAVE_USER_GROUP_SUCCESS:
      return {
        ...state
      };
    case SAVE_USER_GROUP_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case LOAD_PAGE_USER_GROUP:
      return {
        ...state,
        loading: true
      };
    case LOAD_PAGE_USER_GROUP_SUCCESS:
      // action.result = {
      //   content: MOCK_USER_GROUPS,
      //   totalElements: MOCK_USER_GROUPS.length,
      //   number: 1
      // };
      return {
        ...state,
        loading: false,
        loaded: true,
        list: action.result.content,
        total: action.result.totalElements,
        currentPage: action.result.number
      };
    case LOAD_PAGE_USER_GROUP_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        list: MOCK_USER_GROUPS // []
      };

    default:
      return { ...state };
  }
}

export function isLoaded(globalState) {
  return globalState.widgets && globalState.widgets.loaded;
}

export function loadAll() {
  return {
    types: [LOAD_ALL_USER_GROUP, LOAD_ALL_USER_GROUP_SUCCESS, LOAD_ALL_USER_GROUP_FAIL],
    promise: (client) => client.get('/api/user-group/getAll')
  };
}

export function loadPage(page, pageSize, platformId = 0, title = '') {
  return {
    types: [LOAD_PAGE_USER_GROUP, LOAD_PAGE_USER_GROUP_SUCCESS, LOAD_PAGE_USER_GROUP_FAIL],
    promise: (client) => client.get('/api/user-group/getPage/?page=' + page + '&pageSize=' + pageSize)
  };
}

export function save(data, testSessionId) {
  return {
    types: [SAVE_USER_GROUP, SAVE_USER_GROUP_SUCCESS, SAVE_USER_GROUP_FAIL],
    promise: (client) => client.put('/api/user-group/update', {
      data: data
    })
  };
}


export function clearError() {
  return { type: CLEAR_ERROR };
}

export function addNew(data) {
  return {
    types: [ADD_NEW_USER_GROUP, ADD_NEW_USER_GROUP_SUCCESS, ADD_NEW_USER_GROUP_FAIL],
    promise: (client) => client.get('/api/user-group/addNew', {
      data: data
    })
  };
}

export function editItemStart(id) {
  return { type: EDIT_USER_GROUP_START, id };
}

export function editItemStop(id) {
  return { type: EDIT_USER_GROUP_STOP, id };
}

export function deleteItem(id) {
  return {
    types: [DELETE_USER_GROUP, DELETE_USER_GROUP_SUCCESS, DELETE_USER_GROUP_FAIL],
    promise: (client) => client.del('/api/user-group/delete/' + id)
  };
}
