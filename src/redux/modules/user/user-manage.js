import * as _ from 'lodash';
import { getErrorMessage, extractError } from 'utils/errorParse';

const LOAD_USER = 'LOAD_USER';
const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
const LOAD_USER_FAIL = 'LOAD_USER_FAIL';
const LOAD_USER_ALL = 'LOAD_USER_ALL';
const LOAD_USER_ALL_SUCCESS = 'LOAD_USER_ALL_SUCCESS';
const LOAD_USER_ALL_FAIL = 'LOAD_USER_ALL_FAIL';
const EDIT_USER_START = 'EDIT_USER_START';
const EDIT_USER_STOP = 'EDIT_USER_STOP';
const ADD_NEW_USER = 'ADD_NEW_USER';
const ADD_NEW_USER_SUCCESS = 'ADD_NEW_USER_SUCCESS';
const ADD_NEW_USER_FAIL = 'ADD_NEW_USER_FAIL';
const ADD_USER = 'ADD_USER';
const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
const ADD_USER_FAIL = 'ADD_USER_FAIL';
const DELETE_USER = 'DELETE_USER';
const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
const DELETE_USER_FAIL = 'DELETE_USER_FAIL';
const SAVE_USER = 'SAVE_USER';
const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS';
const SAVE_USER_FAIL = 'SAVE_USER_FAIL';
const CLEAR_ERROR = 'CLEAR_ERROR';
const LOAD_PAGE_USER = 'LOAD_PAGE_USER';
const LOAD_PAGE_USER_SUCCESS = 'LOAD_PAGE_USER_SUCCESS';
const LOAD_PAGE_USER_FAIL = 'LOAD_PAGE_USER_FAIL';
const LOAD_USER_STATISTIC = 'LOAD_USER_STATISTIC';
const LOAD_USER_STATISTIC_SUCCESS = 'LOAD_USER_STATISTIC_SUCCESS';
const LOAD_USER_STATISTIC_FAIL = 'LOAD_USER_STATISTIC_FAIL';

const MOCK_USERS = [
  // {
  //   id: 1,
  //   username: 'User1',
  //   email: 'email@g.com',
  //   role: 'admin'
  // },
  // {
  //   id: 2,
  //   username: 'User2',
  //   email: 'email@g.com',
  //   role: 'user'
  // }
];
const initialState = {
  loaded: false,
  editing: {},
  list: [],
  listPage: [],
  error: null,
  isError: false,
  errorMessage: null,
  saveError: null,
  userStatistic: {}
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
    case LOAD_USER:
      return {
        ...state,
        loading: true
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_USER_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null
      };
    case LOAD_USER_ALL:
      return {
        ...state,
        loading: true
      };
    case LOAD_USER_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        listAll: action.result
      };
    case LOAD_USER_ALL_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        listAll: null
      };
    case DELETE_USER:
      return { ...state };
    case DELETE_USER_SUCCESS:
      return {
        ...state
      };
    case DELETE_USER_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case ADD_NEW_USER:
      return {
        ...state,
      };
    case ADD_NEW_USER_SUCCESS:
      return {
        ...state
      };
    case ADD_NEW_USER_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case EDIT_USER_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_USER_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case ADD_USER:
      return { ...state };
    case ADD_USER_SUCCESS:
      return {
        ...state
      };
    case ADD_USER_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case SAVE_USER:
      return {
        ...state
      };
    case SAVE_USER_SUCCESS:
      return {
        ...state
      };
    case SAVE_USER_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case LOAD_PAGE_USER:
      return {
        ...state,
        loading: true
      };
    case LOAD_PAGE_USER_SUCCESS:
      // action.result = {
      //   content: MOCK_USERS,
      //   totalElements: MOCK_USERS.length,
      //   number: 1
      // };
      return {
        ...state,
        loading: false,
        loaded: true,
        listPage: action.result.docs,
        paginationUser: {
          total: action.result.total
        }
      };
    case LOAD_PAGE_USER_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        listPage: MOCK_USERS // []
      };
    case LOAD_USER_STATISTIC:
      return {
        ...state
      };
    case LOAD_USER_STATISTIC_SUCCESS:
      return {
        ...state,
        userStatistic: action.result
      };
    case LOAD_USER_STATISTIC_FAIL:
      extractError(state, action);
      return {
        ...state,
        userStatistic: {}
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
    types: [LOAD_USER_ALL, LOAD_USER_ALL_SUCCESS, LOAD_USER_ALL_FAIL],
    promise: (client) => client.get('/api/user/')
  };
}
export function loadById(id) {
  // console.log('user loadById', id);
  return {
    types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAIL],
    promise: (client) => client.get('/api/user/' + id)
  };
}
export function loadPage(page, pageSize, roleId = 0, username = '') {
  return {
    types: [LOAD_PAGE_USER, LOAD_PAGE_USER_SUCCESS, LOAD_PAGE_USER_FAIL],
    promise: (client) => client.get('/api/user/list/page?page=' + page + '&pageSize=' + pageSize + '&roleId=' + roleId + '&username=' + username + '')
  };
}

export function save(data, id) {
  return {
    types: [SAVE_USER, SAVE_USER_SUCCESS, SAVE_USER_FAIL],
    promise: (client) => client.put('/api/user/' + id, {
      data: data
    })
  };
}


export function clearError() {
  return { type: CLEAR_ERROR };
}

export function createNew(data) {
  return {
    types: [ADD_NEW_USER, ADD_NEW_USER_SUCCESS, ADD_NEW_USER_FAIL],
    promise: (client) => client.post('/api/user/', {
      data: data
    })
  };
}

export function deleteItem(id) {
  return {
    types: [DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAIL],
    promise: (client) => client.del('/api/user/delete/' + id)
  };
}
export function loadUserStatistic() {
  return {
    types: [LOAD_USER_STATISTIC, LOAD_USER_STATISTIC_SUCCESS, LOAD_USER_STATISTIC_FAIL],
    promise: (client) => client.get('/api/user/statistic/')
  };
}
