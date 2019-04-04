import * as _ from 'lodash';
import { getErrorMessage, extractError } from 'utils/errorParse';

const LOAD_ALL_USER_ROLE_PERMISSION = 'LOAD_ALL_USER_ROLE_PERMISSION';
const LOAD_ALL_USER_ROLE_PERMISSION_SUCCESS = 'LOAD_ALL_USER_ROLE_PERMISSION_SUCCESS';
const LOAD_ALL_USER_ROLE_PERMISSION_FAIL = 'LOAD_ALL_USER_ROLE_PERMISSION_FAIL';
const EDIT_USER_ROLE_PERMISSION_START = 'EDIT_USER_ROLE_PERMISSION_START';
const EDIT_USER_ROLE_PERMISSION_STOP = 'EDIT_USER_ROLE_PERMISSION_STOP';
const ADD_NEW_USER_ROLE_PERMISSION = 'ADD_NEW_USER_ROLE_PERMISSION';
const ADD_NEW_USER_ROLE_PERMISSION_SUCCESS = 'ADD_NEW_USER_ROLE_PERMISSION_SUCCESS';
const ADD_NEW_USER_ROLE_PERMISSION_FAIL = 'ADD_NEW_USER_ROLE_PERMISSION_FAIL';
const ADD_USER_ROLE_PERMISSION = 'ADD_USER_ROLE_PERMISSION';
const ADD_USER_ROLE_PERMISSION_SUCCESS = 'ADD_USER_ROLE_PERMISSION_SUCCESS';
const ADD_USER_ROLE_PERMISSION_FAIL = 'ADD_USER_ROLE_PERMISSION_FAIL';
const DELETE_USER_ROLE_PERMISSION = 'DELETE_USER_ROLE_PERMISSION';
const DELETE_USER_ROLE_PERMISSION_SUCCESS = 'DELETE_USER_ROLE_PERMISSION_SUCCESS';
const DELETE_USER_ROLE_PERMISSION_FAIL = 'DELETE_USER_ROLE_PERMISSION_FAIL';
const SAVE_USER_ROLE_PERMISSION = 'SAVE_USER_ROLE_PERMISSION';
const SAVE_USER_ROLE_PERMISSION_SUCCESS = 'SAVE_USER_ROLE_PERMISSION_SUCCESS';
const SAVE_USER_ROLE_PERMISSION_FAIL = 'SAVE_USER_ROLE_PERMISSION_FAIL';
const CLEAR_ERROR = 'CLEAR_ERROR';
const LOAD_PAGE_USER_ROLE_PERMISSION = 'LOAD_PAGE_USER_ROLE_PERMISSION';
const LOAD_PAGE_USER_ROLE_PERMISSION_SUCCESS = 'LOAD_PAGE_USER_ROLE_PERMISSION_SUCCESS';
const LOAD_PAGE_USER_ROLE_PERMISSION_FAIL = 'LOAD_PAGE_USER_ROLE_PERMISSION_FAIL';
const SAVE_USER_ROLE_PERMISSION_MATRIX = 'SAVE_USER_ROLE_PERMISSION_MATRIX';
const SAVE_USER_ROLE_PERMISSION_MATRIX_SUCCESS = 'SAVE_USER_ROLE_PERMISSION_MATRIX_SUCCESS';
const SAVE_USER_ROLE_PERMISSION_MATRIX_FAIL = 'SAVE_USER_ROLE_PERMISSION_MATRIX_FAIL';

const PRIVACY_LEVELS = [{value: 'PUBLIC', label: 'PUBLIC'}, {value: 'PRIVATE', label: 'PRIVATE'}, {value: 'SHARED', label: 'SHARED'}];
const MOCK_USER_ROLE_PERMISSIONS = [
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
  list: MOCK_USER_ROLE_PERMISSIONS,
  listAll: MOCK_USER_ROLE_PERMISSIONS,
  error: null,
  isError: false,
  errorMessage: null,
  saveError: null,
  total: 0,
  currentPage: 0,
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
    case LOAD_ALL_USER_ROLE_PERMISSION:
      return {
        ...state,
        loading: true
      };
    case LOAD_ALL_USER_ROLE_PERMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        listAll: action.result
      };
    case LOAD_ALL_USER_ROLE_PERMISSION_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        listAll: []
      };

    case DELETE_USER_ROLE_PERMISSION:
      return { ...state };
    case DELETE_USER_ROLE_PERMISSION_SUCCESS:
      return {
        ...state
      };
    case DELETE_USER_ROLE_PERMISSION_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case ADD_NEW_USER_ROLE_PERMISSION:
      return {
        ...state,
      };
    case ADD_NEW_USER_ROLE_PERMISSION_SUCCESS:
      return {
        ...state
      };
    case ADD_NEW_USER_ROLE_PERMISSION_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case EDIT_USER_ROLE_PERMISSION_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_USER_ROLE_PERMISSION_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case ADD_USER_ROLE_PERMISSION:
      return { ...state };
    case ADD_USER_ROLE_PERMISSION_SUCCESS:
      return {
        ...state
      };
    case ADD_USER_ROLE_PERMISSION_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case SAVE_USER_ROLE_PERMISSION:
      return {
        ...state
      };
    case SAVE_USER_ROLE_PERMISSION_SUCCESS:
      return {
        ...state
      };
    case SAVE_USER_ROLE_PERMISSION_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case LOAD_PAGE_USER_ROLE_PERMISSION:
      return {
        ...state,
        loading: true
      };
    case LOAD_PAGE_USER_ROLE_PERMISSION_SUCCESS:
      // action.result = {
      //   content: MOCK_USER_ROLE_PERMISSIONS,
      //   totalElements: MOCK_USER_ROLE_PERMISSIONS.length,
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
    case LOAD_PAGE_USER_ROLE_PERMISSION_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        list: MOCK_USER_ROLE_PERMISSIONS // []
      };

    default:
      return { ...state };
  }
}

export function isLoaded(globalState) {
  return globalState.widgets && globalState.widgets.loaded;
}

export function loadAll(userRoleId) {
  return {
    types: [LOAD_ALL_USER_ROLE_PERMISSION, LOAD_ALL_USER_ROLE_PERMISSION_SUCCESS, LOAD_ALL_USER_ROLE_PERMISSION_FAIL],
    promise: (client) => client.get('/api/user-role/' + userRoleId + '/permissions/getAll')
  };
}

export function loadPage(page, pageSize, platformId = 0, title = '', userRoleId) {
  return {
    types: [LOAD_PAGE_USER_ROLE_PERMISSION, LOAD_PAGE_USER_ROLE_PERMISSION_SUCCESS, LOAD_PAGE_USER_ROLE_PERMISSION_FAIL],
    promise: (client) => client.get('/api/user-role/' + userRoleId + '/permissions/getPage/?page=' + page + '&pageSize=' + pageSize)
  };
}

export function save(data, userRoleId) {
  return {
    types: [SAVE_USER_ROLE_PERMISSION, SAVE_USER_ROLE_PERMISSION_SUCCESS, SAVE_USER_ROLE_PERMISSION_FAIL],
    promise: (client) => client.put('/api/user-role/' + userRoleId + '/permissions/update', {
      data: data
    })
  };
}

export function saveMatrix(data, userRoleId) {
  return {
    types: [SAVE_USER_ROLE_PERMISSION_MATRIX, SAVE_USER_ROLE_PERMISSION_MATRIX_SUCCESS, SAVE_USER_ROLE_PERMISSION_MATRIX_FAIL],
    promise: (client) => client.put('/api/user-role/' + userRoleId + '/permissions/saveMatrix', {
      data: data
    })
  };
}

export function clearError() {
  return { type: CLEAR_ERROR };
}

export function addNew(data, userRoleId) {
  return {
    types: [ADD_NEW_USER_ROLE_PERMISSION, ADD_NEW_USER_ROLE_PERMISSION_SUCCESS, ADD_NEW_USER_ROLE_PERMISSION_FAIL],
    promise: (client) => client.post('/api/user-role/' + userRoleId + '/permissions/create', {
      data: data
    })
  };
}

export function editItemStart(id) {
  return { type: EDIT_USER_ROLE_PERMISSION_START, id };
}

export function editItemStop(id) {
  return { type: EDIT_USER_ROLE_PERMISSION_STOP, id };
}

export function deleteItem(id, userRoleId) {
  return {
    types: [DELETE_USER_ROLE_PERMISSION, DELETE_USER_ROLE_PERMISSION_SUCCESS, DELETE_USER_ROLE_PERMISSION_FAIL],
    promise: (client) => client.del('/api/user-role/' + userRoleId + '/permissions/delete/' + id)
  };
}
