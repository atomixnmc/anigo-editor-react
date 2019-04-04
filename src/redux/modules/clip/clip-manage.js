import * as _ from 'lodash';
import { getErrorMessage, extractError } from 'utils/errorParse';


const CLEAR_ERROR = 'CLEAR_ERROR';
const LOAD_PAGE_CLIP = 'LOAD_PAGE_CLIP';
const LOAD_PAGE_CLIP_SUCCESS = 'LOAD_PAGE_CLIP_SUCCESS';
const LOAD_PAGE_CLIP_FAIL = 'LOAD_PAGE_CLIP_FAIL';

const LOAD_CLIP_ALL = 'LOAD_CLIP_ALL';
const LOAD_CLIP_ALL_SUCCESS = 'LOAD_CLIP_ALL_SUCCESS';
const LOAD_CLIP_ALL_FAIL = 'LOAD_CLIP_ALL_FAIL';

const LOAD_CLIP = 'LOAD_CLIP';
const LOAD_CLIP_SUCCESS = 'LOAD_CLIP_SUCCESS';
const LOAD_CLIP_FAIL = 'LOAD_CLIP_FAIL';

const CREATE_NEW_CLIP = 'CREATE_NEW_CLIP';
const CREATE_NEW_CLIP_SUCCESS = 'CREATE_NEW_CLIP_SUCCESS';
const CREATE_NEW_CLIP_FAIL = 'CREATE_NEW_CLIP_FAIL';

const UPDATE_CLIP = 'UPDATE_CLIP';
const UPDATE_CLIP_SUCCESS = 'UPDATE_CLIP_SUCCESS';
const UPDATE_CLIP_FAIL = 'UPDATE_CLIP_FAIL';

const DELETE_CLIP = 'DELETE_CLIP';
const DELETE_CLIP_SUCCESS = 'DELETE_CLIP_SUCCESS';
const DELETE_CLIP_FAIL = 'DELETE_CLIP_FAIL';

const LOAD_PAGE_CLIP_BY_PROJECT_ID = 'LOAD_PAGE_CLIP_BY_PROJECT_ID';
const LOAD_PAGE_CLIP_BY_PROJECT_ID_SUCCESS = 'LOAD_PAGE_CLIP_BY_PROJECT_ID_SUCCESS';
const LOAD_PAGE_CLIP_BY_PROJECT_ID_FAIL = 'LOAD_PAGE_CLIP_BY_PROJECT_ID_FAIL';

const MOCK_JOBS = [
  // {
  //   id: 1,
  //   name: 'Job 1',
  //   username: 'User1',
  //   email: 'email@g.com',
  //   role: 'admin'
  // },
  // {
  //   id: 2,
  //   name: 'Job 2',
  //   username: 'User2',
  //   email: 'email@g.com',
  //   role: 'user'
  // }
];
const initialState = {
  loaded: false,
  editing: {},
  list: [],
  listPage: {},
  listAll: [],
  listByJobId: [],
  currentEntry: null,
  error: null,
  isError: false,
  errorMessage: null
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
    case CREATE_NEW_CLIP:
      return {
        ...state
      };
    case CREATE_NEW_CLIP_SUCCESS:
      return {
        ...state
      };
    case CREATE_NEW_CLIP_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case LOAD_CLIP:
      return {
        ...state,
        loading: true
      };
    case LOAD_CLIP_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        currentEntry: action.result
      };
    case LOAD_CLIP_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        currentEntry: null
      };
    case UPDATE_CLIP:
      return {
        ...state
      };
    case UPDATE_CLIP_SUCCESS:
      return {
        ...state
      };
    case UPDATE_CLIP_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case DELETE_CLIP:
      return {
        ...state
      };
    case DELETE_CLIP_SUCCESS:
      return {
        ...state
      };
    case DELETE_CLIP_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case LOAD_PAGE_CLIP_BY_PROJECT_ID:
      return {
        ...state,
        loading: true
      };
    case LOAD_PAGE_CLIP_BY_PROJECT_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        listByJobId: action.result,
        pagination: {
          total: action.result.total
        }
      };
    case LOAD_PAGE_CLIP_BY_PROJECT_ID_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        listByJobId: []
      };
    case LOAD_PAGE_CLIP:
      return {
        ...state,
        loading: true
      };
    case LOAD_PAGE_CLIP_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        listPage: action.result.docs,
        pagination: {
          total: action.result.total
        }
      };
    case LOAD_PAGE_CLIP_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        listPage: []
      };
    case LOAD_CLIP_ALL:
      return {
        ...state,
        loading: true
      };
    case LOAD_CLIP_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        listAll: action.result
      };
    case LOAD_CLIP_ALL_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        listAll: MOCK_JOBS
      };
    default:
      return { ...state };
  }
}


export function loadAll() {
  return {
    types: [LOAD_CLIP_ALL, LOAD_CLIP_ALL_SUCCESS, LOAD_CLIP_ALL_FAIL],
    promise: async (client) => client.get('/api/clip/'),
  };
}

export function loadById(id) {
  return {
    types: [LOAD_CLIP, LOAD_CLIP_SUCCESS, LOAD_CLIP_FAIL],
    promise: (client) => client.get('/api/clip/' + id)
  };
}

export function loadPage(page, pageSize, roleId = 0, username = '') {
  return {
    types: [LOAD_PAGE_CLIP, LOAD_PAGE_CLIP_SUCCESS, LOAD_PAGE_CLIP_FAIL],
    promise: (client) => client.get('/api/clip/list/page/?page=' + page + '&pageSize=' + pageSize + '&roleId=' + roleId + '&username=' + username + '')
  };
}
export function loadByJobId(projectId) {
  return {
    types: [LOAD_PAGE_CLIP_BY_PROJECT_ID, LOAD_PAGE_CLIP_BY_PROJECT_ID_SUCCESS, LOAD_PAGE_CLIP_BY_PROJECT_ID_FAIL],
    promise: (client) => client.get('/api/clip/find/by/project?projectId=' + projectId)
  };
}


export function createNew(data) {
  return {
    types: [CREATE_NEW_CLIP, CREATE_NEW_CLIP_SUCCESS, CREATE_NEW_CLIP_FAIL],
    promise: (client) => client.post('/api/clip', {
      data: data
    })
  };
}

export function updateById(data, id) {
  return {
    types: [UPDATE_CLIP, UPDATE_CLIP_SUCCESS, UPDATE_CLIP_FAIL],
    promise: (client) => client.put('/api/clip' + id, {
      data: data
    })
  };
}

export function deleteById(id) {
  return {
    types: [DELETE_CLIP, DELETE_CLIP_SUCCESS, DELETE_CLIP_FAIL],
    promise: (client) => client.del('/api/clip/' + id)
  };
}
