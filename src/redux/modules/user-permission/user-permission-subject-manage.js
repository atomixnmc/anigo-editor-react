import * as _ from 'lodash';
import { getErrorMessage, extractError } from 'utils/errorParse';

const LOAD_ALL_USER_PERMISSION_SUBJECT = 'LOAD_ALL_USER_PERMISSION_SUBJECT';
const LOAD_ALL_USER_PERMISSION_SUBJECT_SUCCESS = 'LOAD_ALL_USER_PERMISSION_SUBJECT_SUCCESS';
const LOAD_ALL_USER_PERMISSION_SUBJECT_FAIL = 'LOAD_ALL_USER_PERMISSION_SUBJECT_FAIL';
const EDIT_USER_PERMISSION_SUBJECT_START = 'EDIT_USER_PERMISSION_SUBJECT_START';
const EDIT_USER_PERMISSION_SUBJECT_STOP = 'EDIT_USER_PERMISSION_SUBJECT_STOP';
const ADD_NEW_USER_PERMISSION_SUBJECT = 'ADD_NEW_USER_PERMISSION_SUBJECT';
const ADD_NEW_USER_PERMISSION_SUBJECT_SUCCESS = 'ADD_NEW_USER_PERMISSION_SUBJECT_SUCCESS';
const ADD_NEW_USER_PERMISSION_SUBJECT_FAIL = 'ADD_NEW_USER_PERMISSION_SUBJECT_FAIL';
const ADD_USER_PERMISSION_SUBJECT = 'ADD_USER_PERMISSION_SUBJECT';
const ADD_USER_PERMISSION_SUBJECT_SUCCESS = 'ADD_USER_PERMISSION_SUBJECT_SUCCESS';
const ADD_USER_PERMISSION_SUBJECT_FAIL = 'ADD_USER_PERMISSION_SUBJECT_FAIL';
const DELETE_USER_PERMISSION_SUBJECT = 'DELETE_USER_PERMISSION_SUBJECT';
const DELETE_USER_PERMISSION_SUBJECT_SUCCESS = 'DELETE_USER_PERMISSION_SUBJECT_SUCCESS';
const DELETE_USER_PERMISSION_SUBJECT_FAIL = 'DELETE_USER_PERMISSION_SUBJECT_FAIL';
const SAVE_USER_PERMISSION_SUBJECT = 'SAVE_USER_PERMISSION_SUBJECT';
const SAVE_USER_PERMISSION_SUBJECT_SUCCESS = 'SAVE_USER_PERMISSION_SUBJECT_SUCCESS';
const SAVE_USER_PERMISSION_SUBJECT_FAIL = 'SAVE_USER_PERMISSION_SUBJECT_FAIL';
const CLEAR_ERROR = 'CLEAR_ERROR';
const LOAD_PAGE_USER_PERMISSION_SUBJECT = 'LOAD_PAGE_USER_PERMISSION_SUBJECT';
const LOAD_PAGE_USER_PERMISSION_SUBJECT_SUCCESS = 'LOAD_PAGE_USER_PERMISSION_SUBJECT_SUCCESS';
const LOAD_PAGE_USER_PERMISSION_SUBJECT_FAIL = 'LOAD_PAGE_USER_PERMISSION_SUBJECT_FAIL';

const MOCK_USER_PERMISSION_SUBJECTS = [
  // {
  //   id: 1,
  //   name: 'TestSuite',
  //   description: 'Admin',
  //   enable: true,
  //   userNum: 1,
  //   groupNum: 1
  // },
  // {
  //   id: 2,
  //   name: 'TestCase',
  //   description: 'TestCase',
  //   enable: true,
  //   userNum: 1,
  //   groupNum: 1
  // },
  // {
  //   id: 3,
  //   name: 'TestDetail',
  //   description: 'TestDetail',
  //   enable: true,
  //   userNum: 1,
  //   groupNum: 1
  // },
  // {
  //   id: 4,
  //   name: 'TestActivity',
  //   description: 'TestActivity',
  //   enable: true,
  //   userNum: 1,
  //   groupNum: 1
  // },
];
const initialState = {
  loaded: false,
  editing: {},
  data: null,
  list: MOCK_USER_PERMISSION_SUBJECTS,
  listAll: MOCK_USER_PERMISSION_SUBJECTS,
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
    case LOAD_ALL_USER_PERMISSION_SUBJECT:
      return {
        ...state,
        loading: true
      };
    case LOAD_ALL_USER_PERMISSION_SUBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        listAll: action.result
      };
    case LOAD_ALL_USER_PERMISSION_SUBJECT_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        listAll: []
      };

    case DELETE_USER_PERMISSION_SUBJECT:
      return { ...state };
    case DELETE_USER_PERMISSION_SUBJECT_SUCCESS:
      return {
        ...state
      };
    case DELETE_USER_PERMISSION_SUBJECT_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case ADD_NEW_USER_PERMISSION_SUBJECT:
      return {
        ...state,
      };
    case ADD_NEW_USER_PERMISSION_SUBJECT_SUCCESS:
      return {
        ...state
      };
    case ADD_NEW_USER_PERMISSION_SUBJECT_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case EDIT_USER_PERMISSION_SUBJECT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_USER_PERMISSION_SUBJECT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case ADD_USER_PERMISSION_SUBJECT:
      return { ...state };
    case ADD_USER_PERMISSION_SUBJECT_SUCCESS:
      return {
        ...state
      };
    case ADD_USER_PERMISSION_SUBJECT_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case SAVE_USER_PERMISSION_SUBJECT:
      return {
        ...state
      };
    case SAVE_USER_PERMISSION_SUBJECT_SUCCESS:
      return {
        ...state
      };
    case SAVE_USER_PERMISSION_SUBJECT_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case LOAD_PAGE_USER_PERMISSION_SUBJECT:
      return {
        ...state,
        loading: true
      };
    case LOAD_PAGE_USER_PERMISSION_SUBJECT_SUCCESS:
      // action.result = {
      //   content: MOCK_USER_PERMISSION_SUBJECTS,
      //   totalElements: MOCK_USER_PERMISSION_SUBJECTS.length,
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
    case LOAD_PAGE_USER_PERMISSION_SUBJECT_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        list: MOCK_USER_PERMISSION_SUBJECTS // []
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
    types: [LOAD_ALL_USER_PERMISSION_SUBJECT, LOAD_ALL_USER_PERMISSION_SUBJECT_SUCCESS, LOAD_ALL_USER_PERMISSION_SUBJECT_FAIL],
    promise: (client) => client.get('/api/permission-subject/getAll')
  };
}

export function loadPage(page, pageSize, platformId = 0, title = '') {
  return {
    types: [LOAD_PAGE_USER_PERMISSION_SUBJECT, LOAD_PAGE_USER_PERMISSION_SUBJECT_SUCCESS, LOAD_PAGE_USER_PERMISSION_SUBJECT_FAIL],
    promise: (client) => client.get('/api/permission-subject/getPage/?page=' + page + '&pageSize=' + pageSize)
  };
}

export function save(data) {
  return {
    types: [SAVE_USER_PERMISSION_SUBJECT, SAVE_USER_PERMISSION_SUBJECT_SUCCESS, SAVE_USER_PERMISSION_SUBJECT_FAIL],
    promise: (client) => client.put('/api/permission-subject/update', {
      data: data
    })
  };
}


export function clearError() {
  return { type: CLEAR_ERROR };
}

export function addNew(data) {
  return {
    types: [ADD_NEW_USER_PERMISSION_SUBJECT, ADD_NEW_USER_PERMISSION_SUBJECT_SUCCESS, ADD_NEW_USER_PERMISSION_SUBJECT_FAIL],
    promise: (client) => client.post('/api/permission-subject/create', {
      data: data
    })
  };
}

export function editItemStart(id) {
  return { type: EDIT_USER_PERMISSION_SUBJECT_START, id };
}

export function editItemStop(id) {
  return { type: EDIT_USER_PERMISSION_SUBJECT_STOP, id };
}

export function deleteItem(id) {
  return {
    types: [DELETE_USER_PERMISSION_SUBJECT, DELETE_USER_PERMISSION_SUBJECT_SUCCESS, DELETE_USER_PERMISSION_SUBJECT_FAIL],
    promise: (client) => client.del('/api/permission-subject/delete/' + id)
  };
}
