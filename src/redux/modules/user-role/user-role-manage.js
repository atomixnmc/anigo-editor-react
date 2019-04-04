import * as _ from 'lodash';
import { getErrorMessage, extractError } from 'utils/errorParse';

const LOAD_ALL_USER_ROLE = 'LOAD_ALL_USER_ROLE';
const LOAD_ALL_USER_ROLE_SUCCESS = 'LOAD_ALL_USER_ROLE_SUCCESS';
const LOAD_ALL_USER_ROLE_FAIL = 'LOAD_ALL_USER_ROLE_FAIL';
const EDIT_USER_ROLE_START = 'EDIT_USER_ROLE_START';
const EDIT_USER_ROLE_STOP = 'EDIT_USER_ROLE_STOP';
const ADD_NEW_USER_ROLE = 'ADD_NEW_USER_ROLE';
const ADD_NEW_USER_ROLE_SUCCESS = 'ADD_NEW_USER_ROLE_SUCCESS';
const ADD_NEW_USER_ROLE_FAIL = 'ADD_NEW_USER_ROLE_FAIL';
const ADD_USER_ROLE = 'ADD_USER_ROLE';
const ADD_USER_ROLE_SUCCESS = 'ADD_USER_ROLE_SUCCESS';
const ADD_USER_ROLE_FAIL = 'ADD_USER_ROLE_FAIL';
const DELETE_USER_ROLE = 'DELETE_USER_ROLE';
const DELETE_USER_ROLE_SUCCESS = 'DELETE_USER_ROLE_SUCCESS';
const DELETE_USER_ROLE_FAIL = 'DELETE_USER_ROLE_FAIL';
const SAVE_USER_ROLE = 'SAVE_USER_ROLE';
const SAVE_USER_ROLE_SUCCESS = 'SAVE_USER_ROLE_SUCCESS';
const SAVE_USER_ROLE_FAIL = 'SAVE_USER_ROLE_FAIL';
const CLEAR_ERROR = 'CLEAR_ERROR';
const LOAD_PAGE_USER_ROLE = 'LOAD_PAGE_USER_ROLE';
const LOAD_PAGE_USER_ROLE_SUCCESS = 'LOAD_PAGE_USER_ROLE_SUCCESS';
const LOAD_PAGE_USER_ROLE_FAIL = 'LOAD_PAGE_USER_ROLE_FAIL';
const LOAD_USER_ROLE = 'LOAD_USER_ROLE';
const LOAD_USER_ROLE_SUCCESS = 'LOAD_USER_ROLE_SUCCESS';
const LOAD_USER_ROLE_FAIL = 'LOAD_USER_ROLE_FAIL';

const MOCK_USER_ROLES = [
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
  list: MOCK_USER_ROLES,
  listAll: MOCK_USER_ROLES,
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
    case LOAD_ALL_USER_ROLE:
      return {
        ...state,
        loading: true
      };
    case LOAD_ALL_USER_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        listAll: action.result
      };
    case LOAD_ALL_USER_ROLE_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        listAll: []
      };

    case DELETE_USER_ROLE:
      return { ...state };
    case DELETE_USER_ROLE_SUCCESS:
      return {
        ...state
      };
    case DELETE_USER_ROLE_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case ADD_NEW_USER_ROLE:
      return {
        ...state,
      };
    case ADD_NEW_USER_ROLE_SUCCESS:
      return {
        ...state
      };
    case ADD_NEW_USER_ROLE_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case EDIT_USER_ROLE_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_USER_ROLE_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case ADD_USER_ROLE:
      return { ...state };
    case ADD_USER_ROLE_SUCCESS:
      return {
        ...state
      };
    case ADD_USER_ROLE_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case SAVE_USER_ROLE:
      return {
        ...state
      };
    case SAVE_USER_ROLE_SUCCESS:
      return {
        ...state
      };
    case SAVE_USER_ROLE_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case LOAD_USER_ROLE:
      return {
        ...state,
        loading: true
      };
    case LOAD_USER_ROLE_SUCCESS:
      return {
        ...state,
        entry: action.result
      };
    case LOAD_USER_ROLE_FAIL:
      extractError(state, action);
      return {
        ...state,
        entry: null
      };
    case LOAD_PAGE_USER_ROLE_SUCCESS:
      // action.result = {
      //   content: MOCK_USER_ROLES,
      //   totalElements: MOCK_USER_ROLES.length,
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
    case LOAD_PAGE_USER_ROLE_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        list: []
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
    types: [LOAD_ALL_USER_ROLE, LOAD_ALL_USER_ROLE_SUCCESS, LOAD_ALL_USER_ROLE_FAIL],
    promise: (client) => client.get('/api/user-role/')
  };
}
export function loadById(id) {
  // console.log('user role loadById');
  return {
    types: [LOAD_USER_ROLE, LOAD_USER_ROLE_SUCCESS, LOAD_USER_ROLE_FAIL],
    promise: (client) => client.get('/api/user-role/' + id)
  };
}

export function loadPage(page, pageSize) {
  return {
    types: [LOAD_PAGE_USER_ROLE, LOAD_PAGE_USER_ROLE_SUCCESS, LOAD_PAGE_USER_ROLE_FAIL],
    promise: (client) => client.get('/api/user-role/list/page/?page=' + page + '&pageSize=' + pageSize)
  };
}

export function save(data) {
  return {
    types: [SAVE_USER_ROLE, SAVE_USER_ROLE_SUCCESS, SAVE_USER_ROLE_FAIL],
    promise: (client) => client.put('/api/user-role/update', {
      data: data
    })
  };
}


export function clearError() {
  return { type: CLEAR_ERROR };
}

export function addNew(data) {
  return {
    types: [ADD_NEW_USER_ROLE, ADD_NEW_USER_ROLE_SUCCESS, ADD_NEW_USER_ROLE_FAIL],
    promise: (client) => client.post('/api/user-role/create', {
      data: data
    })
  };
}

export function editItemStart(id) {
  return { type: EDIT_USER_ROLE_START, id };
}

export function editItemStop(id) {
  return { type: EDIT_USER_ROLE_STOP, id };
}

export function deleteItem(id) {
  return {
    types: [DELETE_USER_ROLE, DELETE_USER_ROLE_SUCCESS, DELETE_USER_ROLE_FAIL],
    promise: (client) => client.del('/api/user-role/delete/' + id)
  };
}
