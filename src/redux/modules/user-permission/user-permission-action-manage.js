import * as _ from 'lodash';
import { getErrorMessage, extractError } from 'utils/errorParse';

const LOAD_ALL_USER_PERMISSION_ACTION = 'LOAD_ALL_USER_PERMISSION_ACTION';
const LOAD_ALL_USER_PERMISSION_ACTION_SUCCESS = 'LOAD_ALL_USER_PERMISSION_ACTION_SUCCESS';
const LOAD_ALL_USER_PERMISSION_ACTION_FAIL = 'LOAD_ALL_USER_PERMISSION_ACTION_FAIL';
const EDIT_USER_PERMISSION_ACTION_START = 'EDIT_USER_PERMISSION_ACTION_START';
const EDIT_USER_PERMISSION_ACTION_STOP = 'EDIT_USER_PERMISSION_ACTION_STOP';
const ADD_NEW_USER_PERMISSION_ACTION = 'ADD_NEW_USER_PERMISSION_ACTION';
const ADD_NEW_USER_PERMISSION_ACTION_SUCCESS = 'ADD_NEW_USER_PERMISSION_ACTION_SUCCESS';
const ADD_NEW_USER_PERMISSION_ACTION_FAIL = 'ADD_NEW_USER_PERMISSION_ACTION_FAIL';
const ADD_USER_PERMISSION_ACTION = 'ADD_USER_PERMISSION_ACTION';
const ADD_USER_PERMISSION_ACTION_SUCCESS = 'ADD_USER_PERMISSION_ACTION_SUCCESS';
const ADD_USER_PERMISSION_ACTION_FAIL = 'ADD_USER_PERMISSION_ACTION_FAIL';
const DELETE_USER_PERMISSION_ACTION = 'DELETE_USER_PERMISSION_ACTION';
const DELETE_USER_PERMISSION_ACTION_SUCCESS = 'DELETE_USER_PERMISSION_ACTION_SUCCESS';
const DELETE_USER_PERMISSION_ACTION_FAIL = 'DELETE_USER_PERMISSION_ACTION_FAIL';
const SAVE_USER_PERMISSION_ACTION = 'SAVE_USER_PERMISSION_ACTION';
const SAVE_USER_PERMISSION_ACTION_SUCCESS = 'SAVE_USER_PERMISSION_ACTION_SUCCESS';
const SAVE_USER_PERMISSION_ACTION_FAIL = 'SAVE_USER_PERMISSION_ACTION_FAIL';
const CLEAR_ERROR = 'CLEAR_ERROR';
const LOAD_PAGE_USER_PERMISSION_ACTION = 'LOAD_PAGE_USER_PERMISSION_ACTION';
const LOAD_PAGE_USER_PERMISSION_ACTION_SUCCESS = 'LOAD_PAGE_USER_PERMISSION_ACTION_SUCCESS';
const LOAD_PAGE_USER_PERMISSION_ACTION_FAIL = 'LOAD_PAGE_USER_PERMISSION_ACTION_FAIL';

const LOAD_USER_PERMISSION_ACTION = 'LOAD_USER_PERMISSION_ACTION';
const LOAD_USER_PERMISSION_ACTION_SUCCESS = 'LOAD_USER_PERMISSION_ACTION_SUCCESS';
const LOAD_USER_PERMISSION_ACTION_FAIL = 'LOAD_USER_PERMISSION_ACTION_FAIL';

const MOCK_USER_PERMISSION_ACTIONS = [
  // {
  //   id: 1,
  //   name: 'View',
  //   status: 'Approved',
  //   description: 'Admin',
  //   enable: true,
  //   // userNum: 1,
  //   // groupNum: 1
  // },
  // {
  //   id: 2,
  //   name: 'Edit',
  //   status: 'Approved',
  //   description: 'User',
  //   enable: true,
  //   // userNum: 2,
  //   // groupNum: 1
  // }
];
const initialState = {
  loaded: false,
  editing: {},
  data: null,
  list: MOCK_USER_PERMISSION_ACTIONS,
  listAll: MOCK_USER_PERMISSION_ACTIONS,
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
    case LOAD_ALL_USER_PERMISSION_ACTION:
      return {
        ...state,
        loading: true
      };
    case LOAD_ALL_USER_PERMISSION_ACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        listAll: action.result
      };
    case LOAD_ALL_USER_PERMISSION_ACTION_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        listAll: []
      };

    case DELETE_USER_PERMISSION_ACTION:
      return { ...state };
    case DELETE_USER_PERMISSION_ACTION_SUCCESS:
      return {
        ...state
      };
    case DELETE_USER_PERMISSION_ACTION_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case ADD_NEW_USER_PERMISSION_ACTION:
      return {
        ...state,
      };
    case ADD_NEW_USER_PERMISSION_ACTION_SUCCESS:
      return {
        ...state
      };
    case ADD_NEW_USER_PERMISSION_ACTION_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case EDIT_USER_PERMISSION_ACTION_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_USER_PERMISSION_ACTION_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case ADD_USER_PERMISSION_ACTION:
      return { ...state };
    case ADD_USER_PERMISSION_ACTION_SUCCESS:
      return {
        ...state
      };
    case ADD_USER_PERMISSION_ACTION_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case SAVE_USER_PERMISSION_ACTION:
      return {
        ...state
      };
    case SAVE_USER_PERMISSION_ACTION_SUCCESS:
      return {
        ...state
      };
    case SAVE_USER_PERMISSION_ACTION_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case LOAD_USER_PERMISSION_ACTION:
      return {
        ...state,
        loading: true
      };
    case LOAD_USER_PERMISSION_ACTION_SUCCESS:
      return {
        ...state,
        entry: action.result
      };
    case LOAD_USER_PERMISSION_ACTION_FAIL:
      extractError(state, action);
      return {
        ...state,
        entry: null
      };
    case LOAD_PAGE_USER_PERMISSION_ACTION:
      return {
        ...state,
        loading: true
      };
    case LOAD_PAGE_USER_PERMISSION_ACTION_SUCCESS:
      // action.result = {
      //   content: MOCK_USER_PERMISSION_ACTIONS,
      //   totalElements: MOCK_USER_PERMISSION_ACTIONS.length,
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
    case LOAD_PAGE_USER_PERMISSION_ACTION_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        list: MOCK_USER_PERMISSION_ACTIONS // []
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
    types: [LOAD_ALL_USER_PERMISSION_ACTION, LOAD_ALL_USER_PERMISSION_ACTION_SUCCESS, LOAD_ALL_USER_PERMISSION_ACTION_FAIL],
    promise: (client) => client.get('/api/permission-action/getAll')
  };
}
export function loadById(id) {
  return {
    types: [LOAD_USER_PERMISSION_ACTION, LOAD_USER_PERMISSION_ACTION_SUCCESS, LOAD_USER_PERMISSION_ACTION_FAIL],
    promise: (client) => client.get('/api/permission-action/get/' + id)
  };
}
export function loadPage(page, pageSize, platformId = 0, title = '') {
  return {
    types: [LOAD_PAGE_USER_PERMISSION_ACTION, LOAD_PAGE_USER_PERMISSION_ACTION_SUCCESS, LOAD_PAGE_USER_PERMISSION_ACTION_FAIL],
    promise: (client) => client.get('/api/permission-action/getPage/?page=' + page + '&pageSize=' + pageSize)
  };
}

export function save(data) {
  return {
    types: [SAVE_USER_PERMISSION_ACTION, SAVE_USER_PERMISSION_ACTION_SUCCESS, SAVE_USER_PERMISSION_ACTION_FAIL],
    promise: (client) => client.put('/api/permission-action/update', {
      data: data
    })
  };
}


export function clearError() {
  return { type: CLEAR_ERROR };
}

export function addNew(data) {
  return {
    types: [ADD_NEW_USER_PERMISSION_ACTION, ADD_NEW_USER_PERMISSION_ACTION_SUCCESS, ADD_NEW_USER_PERMISSION_ACTION_FAIL],
    promise: (client) => client.post('/api/permission-action/create', {
      data: data
    })
  };
}

export function editItemStart(id) {
  return { type: EDIT_USER_PERMISSION_ACTION_START, id };
}

export function editItemStop(id) {
  return { type: EDIT_USER_PERMISSION_ACTION_STOP, id };
}

export function deleteItem(id) {
  return {
    types: [DELETE_USER_PERMISSION_ACTION, DELETE_USER_PERMISSION_ACTION_SUCCESS, DELETE_USER_PERMISSION_ACTION_FAIL],
    promise: (client) => client.del('/api/permission-action/delete/' + id)
  };
}
