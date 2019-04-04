import cookie from 'react-cookies';
import { getErrorMessage, extractError } from 'utils/errorParse';
import { dispatch } from 'redux';
// import { add as addPermission, remove as removePermission, clear as clearPermissions } from 'react-redux-permissions';
import lodash from 'lodash';

const FETCH_AUTH = 'FETCH_AUTH';
const FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS';
const FETCH_AUTH_FAIL = 'FETCH_AUTH_FAIL';
const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGOUT = 'LOGOUT';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'LOGOUT_FAIL';
const CHANGEPW = 'CHANGEPW';
const CHANGEPW_SUCCESS = 'CHANGEPW_SUCCESS';
const CHANGEPW_FAIL = 'CHANGEPW_FAIL';
const REGISTER = 'REGISTER';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAIL = 'REGISTER_FAIL';
const CLEAR_USER = 'CLEAR_USER';
const CLEAR_ERROR = 'CLEAR_ERROR';

export function extractPermissions(userInfo, {addPermission, removePermission, clearPermissions }) {
  clearPermissions();
  if (userInfo && userInfo.rolePermissions) {
    lodash.each(userInfo.rolePermissions, (p)=>{
      if (p.enable && p.config_enable) {
        // console.log('add Permission', p);
        addPermission(p.name);
      }
    });
  }
}

const initialState = {
  loaded: false,
  isChangePassword: false,
  isRegisterSuccess: false,
  isError: false,
  error: null,
  saveError: null,
  errorMessage: null,
  userInitialValues: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_ERROR:
      return {
        ...state,
        isError: false,
        error: null,
        saveError: null,
        errorMessage: null
      };
    case FETCH_AUTH:
      return {
        ...state,
        loading: true
      };
    case FETCH_AUTH_SUCCESS:
      let userInfoFetched = action.result;
      // if (action.afterFetchCallback) {
      //   action.afterFetchCallback(userInfoFetched);
      // }
      return {
        ...state,
        loading: false,
        loaded: true,
        user: userInfoFetched
      };
    case FETCH_AUTH_FAIL:
      extractError(state, action);
      return {
        ...state,
        loading: false,
        loaded: false
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      let userInfo = action.result;
      cookie.save('username', userInfo.username, { path: '/' });
      cookie.save('userToken', userInfo.userToken, { path: '/' });
      // cookie.save('api_key', userInfo.api_key, { path: '/' });

      return {
        ...state,
        loggingIn: false,
        user: userInfo
      };
    case LOGIN_FAIL:
      extractError(state, action);
      return {
        ...state,
        loggingIn: false,
        user: null
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      extractError(state, action);
      return {
        ...state,
        user: null,
        loggingOut: false
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null
      };
    case CHANGEPW:
      return {
        ...state,
        isChangePassword: false
      };
    case CHANGEPW_SUCCESS:
      cookie.save('username', action.result.username, { path: '/' });
      cookie.save('userToken', action.result.userToken, { path: '/' });
      // cookie.save('api_key', action.result.api_key, { path: '/' });
      return {
        ...state,
        isChangePassword: true
      };
    case CHANGEPW_FAIL:
      extractError(state, action);
      return {
        ...state,
        isChangePassword: false
      };
    case REGISTER:
      return {
        ...state,
        isRegisterSuccess: false
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegisterSuccess: true
      };
    case REGISTER_FAIL:
      extractError(state, action);
      // console.log(state);
      return {
        ...state,
        isRegisterSuccess: false
      };
    default:
      return { ...state };
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function fetchUser(afterFetchCallback) {
  let existedUsername = cookie.load('username', { path: '/' });
  let userToken = cookie.load('userToken', { path: '/' });
  if (!userToken) {
    return {
      type: CLEAR_USER
    };
  }
  return {
    types: [FETCH_AUTH, FETCH_AUTH_SUCCESS, FETCH_AUTH_FAIL],
    promise: (client) => client.post('/api/auth/fetch', {
      data: {
        username: existedUsername,
        userToken: userToken
      }
    }),
    afterFetchCallback
  };
}

export function login(username, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/api/auth/login', {
      data: {
        username: username,
        password: password
      }
    })
  };
}

export function changePassword(username, oldPassword, newPassword, confirmPassword) {
  return {
    types: [CHANGEPW, CHANGEPW_SUCCESS, CHANGEPW_FAIL],
    promise: (client) => client.put('/api/auth/password/change', {
      data: {
        username: username,
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      }
    })
  };
}

export function register(username, password, email) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.post('/api/auth/register', {
      data: {
        username: username,
        password: password,
        email: email
      }
    })
  };
}

export function logout() {
  cookie.remove('username', { path: '/' });
  cookie.remove('userToken', { path: '/' });
  cookie.remove('api_key', { path: '/' });
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/api/auth/logout')
  };
}

export function resetchangePWState() {
  return {
    type: CHANGEPW,
    changePasswordError: undefined,
    isChangePassword: false
  };
}
export function resetRegisterState() {
  return {
    type: REGISTER,
    registerError: undefined,
    isRegisterSuccess: false
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR
  };
}
