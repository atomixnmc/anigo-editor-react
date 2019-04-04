import * as _ from 'lodash';
import { getErrorMessage, extractError } from 'utils/errorParse';


const CLEAR_ERROR = 'CLEAR_ERROR';
const LOAD_PAGE_JOB_DESCRIPTION = 'LOAD_PAGE_JOB_DESCRIPTION';
const LOAD_PAGE_JOB_DESCRIPTION_SUCCESS = 'LOAD_PAGE_JOB_DESCRIPTION_SUCCESS';
const LOAD_PAGE_JOB_DESCRIPTION_FAIL = 'LOAD_PAGE_JOB_DESCRIPTION_FAIL';

const LOAD_JOB_DESCRIPTION_ALL = 'LOAD_JOB_DESCRIPTION_ALL';
const LOAD_JOB_DESCRIPTION_ALL_SUCCESS = 'LOAD_JOB_DESCRIPTION_ALL_SUCCESS';
const LOAD_JOB_DESCRIPTION_ALL_FAIL = 'LOAD_JOB_DESCRIPTION_ALL_FAIL';

const LOAD_JOB_DESCRIPTION = 'LOAD_JOB_DESCRIPTION';
const LOAD_JOB_DESCRIPTION_SUCCESS = 'LOAD_JOB_DESCRIPTION_SUCCESS';
const LOAD_JOB_DESCRIPTION_FAIL = 'LOAD_JOB_DESCRIPTION_FAIL';

const CREATE_NEW_JOB_DESCRIPTION = 'CREATE_NEW_JOB_DESCRIPTION';
const CREATE_NEW_JOB_DESCRIPTION_SUCCESS = 'CREATE_NEW_JOB_DESCRIPTION_SUCCESS';
const CREATE_NEW_JOB_DESCRIPTION_FAIL = 'CREATE_NEW_JOB_DESCRIPTION_FAIL';

const UPDATE_JOB_DESCRIPTION = 'UPDATE_JOB_DESCRIPTION';
const UPDATE_JOB_DESCRIPTION_SUCCESS = 'UPDATE_JOB_DESCRIPTION_SUCCESS';
const UPDATE_JOB_DESCRIPTION_FAIL = 'UPDATE_JOB_DESCRIPTION_FAIL';

const DELETE_JOB_DESCRIPTION = 'DELETE_JOB_DESCRIPTION';
const DELETE_JOB_DESCRIPTION_SUCCESS = 'DELETE_JOB_DESCRIPTION_SUCCESS';
const DELETE_JOB_DESCRIPTION_FAIL = 'DELETE_JOB_DESCRIPTION_FAIL';

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
const SCALES = [
  'BELOW AVERAGE',
  'AVERAGE',
  'GOOD',
  'EXELLENT'
];
const SKILLS = [
  {
    name: 'Java',
    description: 'Java',
    icon: 'fab fa-java'
  },
  {
    name: 'React',
    description: 'React',
    icon: 'fab fa-react'
  },
  {
    name: 'AcademicBackground',
    description: 'Academic Background'
  },
  {
    name: 'ArtisticSkill',
    description: 'Artistic Skill'
  },
  {
    name: 'Character',
    description: 'Character'
  },
  {
    name: 'Ambition',
    description: 'Ambition'
  },
  {
    name: 'EmotionalStability',
    description: 'Emotional Stability'
  },
  {
    name: 'WorkWithOthers',
    description: 'Ability To work with Others'
  },
  {
    name: 'CommunicationSkills',
    description: 'Communication Skills'
  }
];

const initialState = {
  loaded: false,
  editing: {},
  list: [],
  listPage: {},
  listAll: [],
  currentEntry: null,
  error: null,
  isError: false,
  errorMessage: null,
  skills: SKILLS,
  scales: SCALES
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
    case CREATE_NEW_JOB_DESCRIPTION:
      return {
        ...state
      };
    case CREATE_NEW_JOB_DESCRIPTION_SUCCESS:
      return {
        ...state
      };
    case CREATE_NEW_JOB_DESCRIPTION_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case LOAD_JOB_DESCRIPTION:
      return {
        ...state,
        loading: true
      };
    case LOAD_JOB_DESCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        currentEntry: action.result
      };
    case LOAD_JOB_DESCRIPTION_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        currentEntry: null
      };
    case UPDATE_JOB_DESCRIPTION:
      return {
        ...state
      };
    case UPDATE_JOB_DESCRIPTION_SUCCESS:
      return {
        ...state
      };
    case UPDATE_JOB_DESCRIPTION_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case DELETE_JOB_DESCRIPTION:
      return {
        ...state
      };
    case DELETE_JOB_DESCRIPTION_SUCCESS:
      return {
        ...state
      };
    case DELETE_JOB_DESCRIPTION_FAIL:
      extractError(state, action);
      return {
        ...state
      };
    case LOAD_PAGE_JOB_DESCRIPTION:
      return {
        ...state,
        loading: true
      };
    case LOAD_PAGE_JOB_DESCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        listPage: action.result.docs,
        pagination: {
          total: action.result.total
        }
      };
    case LOAD_PAGE_JOB_DESCRIPTION_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false,
        list: []
      };
    case LOAD_JOB_DESCRIPTION_ALL:
      return {
        ...state,
        loading: true
      };
    case LOAD_JOB_DESCRIPTION_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        listAll: action.result
      };
    case LOAD_JOB_DESCRIPTION_ALL_FAIL:
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
    types: [LOAD_JOB_DESCRIPTION_ALL, LOAD_JOB_DESCRIPTION_ALL_SUCCESS, LOAD_JOB_DESCRIPTION_ALL_FAIL],
    promise: (client) => client.get('/api/jobdesc/')
  };
}

export function loadById(id) {
  return {
    types: [LOAD_JOB_DESCRIPTION, LOAD_JOB_DESCRIPTION_SUCCESS, LOAD_JOB_DESCRIPTION_FAIL],
    promise: (client) => client.get('/api/jobdesc/' + id)
  };
}

export function loadPage(page, pageSize, roleId = 0, username = '') {
  return {
    types: [LOAD_PAGE_JOB_DESCRIPTION, LOAD_PAGE_JOB_DESCRIPTION_SUCCESS, LOAD_PAGE_JOB_DESCRIPTION_FAIL],
    promise: (client) => client.get('/api/jobdesc/list/page/?page=' + page + '&pageSize=' + pageSize + '&roleId=' + roleId + '&username=' + username + '')
  };
}


export function createNew(data) {
  return {
    types: [CREATE_NEW_JOB_DESCRIPTION, CREATE_NEW_JOB_DESCRIPTION_SUCCESS, CREATE_NEW_JOB_DESCRIPTION_FAIL],
    promise: (client) => client.post('/api/jobdesc', {
      data: data
    })
  };
}

export function updateById(data, id) {
  return {
    types: [UPDATE_JOB_DESCRIPTION, UPDATE_JOB_DESCRIPTION_SUCCESS, UPDATE_JOB_DESCRIPTION_FAIL],
    promise: (client) => client.put('/api/jobdesc' + id, {
      data: data
    })
  };
}

export function deleteById(id) {
  return {
    types: [DELETE_JOB_DESCRIPTION, DELETE_JOB_DESCRIPTION_SUCCESS, DELETE_JOB_DESCRIPTION_FAIL],
    promise: (client) => client.del('/api/jobdesc/' + id)
  };
}
