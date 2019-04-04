import cookie from 'react-cookies';

const GEN_API_KEY = 'GEN_API_KEY';
const GEN_API_KEY_SUCCESS = 'GEN_API_KEY_SUCCESS';
const GEN_API_KEY_FAIL = 'GEN_API_KEY_FAIL';
const GET_API_KEY = 'GEN_API_KEY';
const GET_API_KEY_SUCCESS = 'GET_API_KEY_SUCCESS';
const GET_API_KEY_FAIL = 'GET_API_KEY_FAIL';

const GET_SYSTEM_CONFIG = 'GET_SYSTEM_CONFIG';
const GET_SYSTEM_CONFIG_SUCCESS = 'GET_SYSTEM_CONFIG_SUCCESS';
const GET_SYSTEM_CONFIG_FAIL = 'GET_SYSTEM_CONFIG_FAIL';

const initialState = {
  userKey: '',
  systemConfig: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GEN_API_KEY:
      return {
        ...state
      };
    case GEN_API_KEY_SUCCESS:
      cookie.save('api_key', action.result.Api_key, { path: '/' });
      return {
        ...state,
        userKey: action.result.Api_key
      };
    case GEN_API_KEY_FAIL:
      return {
        ...state,
        error: action.error
      };
    case GET_API_KEY:
      return {
        ...state
      };
    case GET_API_KEY_SUCCESS:
      return {
        ...state,
        userKey: action.result.Api_key
      };
    case GET_API_KEY_FAIL:
      return {
        ...state,
        error: action.error
      };
    case GET_SYSTEM_CONFIG:
      return {
        ...state
      };
    case GET_SYSTEM_CONFIG_SUCCESS:
      return {
        ...state,
        systemConfig: action.result
      };
    case GET_SYSTEM_CONFIG_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return { ...state };
  }
}

export function genAPIKey() {
  return {
    types: [GEN_API_KEY, GEN_API_KEY_SUCCESS, GEN_API_KEY_FAIL],
    promise: (client) => client.get('/api/user/genApiKey')
  };
}

export function getAPIKey() {
  return {
    types: [GET_API_KEY, GET_API_KEY_SUCCESS, GET_API_KEY_FAIL],
    promise: (client) => client.get('/api/user/getApiKey')
  };
}

export function getSystemConfig() {
  return {
    types: [GET_SYSTEM_CONFIG, GET_SYSTEM_CONFIG_SUCCESS, GET_SYSTEM_CONFIG_FAIL],
    promise: (client) => client.get('/api/admin/system')
  };
}
