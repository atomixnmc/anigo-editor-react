import * as _ from 'lodash';
import { getErrorMessage, extractError } from 'utils/errorParse';

const LOAD_ALL_GLOBAL_PERMISSION = 'LOAD_ALL_GLOBAL_PERMISSION';
const LOAD_ALL_GLOBAL_PERMISSION_SUCCESS = 'LOAD_ALL_GLOBAL_PERMISSION_SUCCESS';
const LOAD_ALL_GLOBAL_PERMISSION_FAIL = 'LOAD_ALL_GLOBAL_PERMISSION_FAIL';
const EDIT_GLOBAL_PERMISSION_START = 'EDIT_GLOBAL_PERMISSION_START';
const EDIT_GLOBAL_PERMISSION_STOP = 'EDIT_GLOBAL_PERMISSION_STOP';
const ADD_NEW_GLOBAL_PERMISSION = 'ADD_NEW_GLOBAL_PERMISSION';
const ADD_NEW_GLOBAL_PERMISSION_SUCCESS = 'ADD_NEW_GLOBAL_PERMISSION_SUCCESS';
const ADD_NEW_GLOBAL_PERMISSION_FAIL = 'ADD_NEW_GLOBAL_PERMISSION_FAIL';
const ADD_GLOBAL_PERMISSION = 'ADD_GLOBAL_PERMISSION';
const ADD_GLOBAL_PERMISSION_SUCCESS = 'ADD_GLOBAL_PERMISSION_SUCCESS';
const ADD_GLOBAL_PERMISSION_FAIL = 'ADD_GLOBAL_PERMISSION_FAIL';
const DELETE_GLOBAL_PERMISSION = 'DELETE_GLOBAL_PERMISSION';
const DELETE_GLOBAL_PERMISSION_SUCCESS = 'DELETE_GLOBAL_PERMISSION_SUCCESS';
const DELETE_GLOBAL_PERMISSION_FAIL = 'DELETE_GLOBAL_PERMISSION_FAIL';
const SAVE_GLOBAL_PERMISSION = 'SAVE_GLOBAL_PERMISSION';
const SAVE_GLOBAL_PERMISSION_SUCCESS = 'SAVE_GLOBAL_PERMISSION_SUCCESS';
const SAVE_GLOBAL_PERMISSION_FAIL = 'SAVE_GLOBAL_PERMISSION_FAIL';
const SAVE_GLOBAL_PERMISSION_MATRIX = 'SAVE_GLOBAL_PERMISSION_MATRIX';
const SAVE_GLOBAL_PERMISSION_MATRIX_SUCCESS = 'SAVE_GLOBAL_PERMISSION_MATRIX_SUCCESS';
const SAVE_GLOBAL_PERMISSION_MATRIX_FAIL = 'SAVE_GLOBAL_PERMISSION_MATRIX_FAIL';
const CLEAR_ERROR = 'CLEAR_ERROR';
const LOAD_PAGE_GLOBAL_PERMISSION = 'LOAD_PAGE_GLOBAL_PERMISSION';
const LOAD_PAGE_GLOBAL_PERMISSION_SUCCESS = 'LOAD_PAGE_GLOBAL_PERMISSION_SUCCESS';
const LOAD_PAGE_GLOBAL_PERMISSION_FAIL = 'LOAD_PAGE_GLOBAL_PERMISSION_FAIL';
const LOAD_GLOBAL_PERMISSION = 'LOAD_GLOBAL_PERMISSION';
const LOAD_GLOBAL_PERMISSION_SUCCESS = 'LOAD_GLOBAL_PERMISSION_SUCCESS';
const LOAD_GLOBAL_PERMISSION_FAIL = 'LOAD_GLOBAL_PERMISSION_FAIL';

const PRIVACY_LEVELS = [{value: 'PUBLIC', label: 'PUBLIC'}, {value: 'PRIVATE', label: 'PRIVATE'}, {value: 'SHARED', label: 'SHARED'}];
const MOCK_GLOBAL_PERMISSIONS = [
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
  list: MOCK_GLOBAL_PERMISSIONS,
  listAll: MOCK_GLOBAL_PERMISSIONS,
  error: null,
  isError: false,
  errorMessage: null,
  saveError: null,
  total: 0,
  currentPage: 0,
  entry: null,
  listPrivacyLevel: PRIVACY_LEVELS
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
    case LOAD_GLOBAL_PERMISSION:
      return {
        ...state,
        loading: true
      };
    case LOAD_GLOBAL_PERMISSION_SUCCESS:
      return {
        ...state,
        entry: action.result
      };
    case LOAD_GLOBAL_PERMISSION_FAIL:
      extractError(state, action);
      return {
        ...state,
        entry: null
      };
    case LOAD_ALL_GLOBAL_PERMISSION:
      return {
        ...state,
        loading: true
      };
    case LOAD_ALL_GLOBAL_PERMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        listAll: action.result
      };
    case LOAD_ALL_GLOBAL_PERMISSION_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        listAll: []
      };

    case DELETE_GLOBAL_PERMISSION:
      return { ...state };
    case DELETE_GLOBAL_PERMISSION_SUCCESS:
      return {
        ...state
      };
    case DELETE_GLOBAL_PERMISSION_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case ADD_NEW_GLOBAL_PERMISSION:
      return {
        ...state,
      };
    case ADD_NEW_GLOBAL_PERMISSION_SUCCESS:
      return {
        ...state
      };
    case ADD_NEW_GLOBAL_PERMISSION_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case EDIT_GLOBAL_PERMISSION_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_GLOBAL_PERMISSION_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case ADD_GLOBAL_PERMISSION:
      return { ...state };
    case ADD_GLOBAL_PERMISSION_SUCCESS:
      return {
        ...state
      };
    case ADD_GLOBAL_PERMISSION_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case SAVE_GLOBAL_PERMISSION_MATRIX:
      return {
        ...state
      };
    case SAVE_GLOBAL_PERMISSION_MATRIX_SUCCESS:
      return {
        ...state
      };
    case SAVE_GLOBAL_PERMISSION_MATRIX_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case SAVE_GLOBAL_PERMISSION:
      return {
        ...state
      };
    case SAVE_GLOBAL_PERMISSION_SUCCESS:
      return {
        ...state
      };
    case SAVE_GLOBAL_PERMISSION_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case LOAD_PAGE_GLOBAL_PERMISSION:
      return {
        ...state,
        loading: true
      };
    case LOAD_PAGE_GLOBAL_PERMISSION_SUCCESS:
      // action.result = {
      //   content: MOCK_GLOBAL_PERMISSIONS,
      //   totalElements: MOCK_GLOBAL_PERMISSIONS.length,
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
    case LOAD_PAGE_GLOBAL_PERMISSION_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        list: MOCK_GLOBAL_PERMISSIONS // []
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
    types: [LOAD_ALL_GLOBAL_PERMISSION, LOAD_ALL_GLOBAL_PERMISSION_SUCCESS, LOAD_ALL_GLOBAL_PERMISSION_FAIL],
    promise: (client) => client.get('/api/global-permission/getAll')
  };
}
export function loadById(id) {
  return {
    types: [LOAD_GLOBAL_PERMISSION, LOAD_GLOBAL_PERMISSION_SUCCESS, LOAD_GLOBAL_PERMISSION_FAIL],
    promise: (client) => client.get('/api/global-permission/get/' + id)
  };
}

export function loadPage(page, pageSize, platformId = 0, title = '') {
  return {
    types: [LOAD_PAGE_GLOBAL_PERMISSION, LOAD_PAGE_GLOBAL_PERMISSION_SUCCESS, LOAD_PAGE_GLOBAL_PERMISSION_FAIL],
    promise: (client) => client.get('/api/global-permission/getPage/?page=' + page + '&pageSize=' + pageSize)
  };
}

export function save(data) {
  return {
    types: [SAVE_GLOBAL_PERMISSION, SAVE_GLOBAL_PERMISSION_SUCCESS, SAVE_GLOBAL_PERMISSION_FAIL],
    promise: (client) => client.put('/api/global-permission/update', {
      data: data
    })
  };
}

export function saveMatrix(data, scope = 'global') {
  return {
    types: [SAVE_GLOBAL_PERMISSION_MATRIX, SAVE_GLOBAL_PERMISSION_MATRIX_SUCCESS, SAVE_GLOBAL_PERMISSION_MATRIX_FAIL],
    promise: (client) => client.put('/api/global-permission/saveMatrix?scope=' + scope, {
      data: data
    })
  };
}


export function clearError() {
  return { type: CLEAR_ERROR };
}

export function addNew(data) {
  return {
    types: [ADD_NEW_GLOBAL_PERMISSION, ADD_NEW_GLOBAL_PERMISSION_SUCCESS, ADD_NEW_GLOBAL_PERMISSION_FAIL],
    promise: (client) => client.post('/api/global-permission/create', {
      data: data
    })
  };
}

export function editItemStart(id) {
  return { type: EDIT_GLOBAL_PERMISSION_START, id };
}

export function editItemStop(id) {
  return { type: EDIT_GLOBAL_PERMISSION_STOP, id };
}

export function deleteItem(id) {
  return {
    types: [DELETE_GLOBAL_PERMISSION, DELETE_GLOBAL_PERMISSION_SUCCESS, DELETE_GLOBAL_PERMISSION_FAIL],
    promise: (client) => client.del('/api/global-permission/delete/' + id)
  };
}
