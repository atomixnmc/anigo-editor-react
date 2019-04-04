import * as lodash from 'lodash';

function errorMessageCombine(errorObj) {
  return (errorObj.status ? errorObj.status + '.' : '') +
  (errorObj.error ? errorObj.error + '.' : '') +
  (errorObj.exception ? errorObj.exception + '.' : '') +
  (errorObj.message ? errorObj.message : '' );
}

function extractMessage(errorObj, defaultMessage) {
  let errorMessage = null;
  if (lodash.isArray(errorObj) && errorObj.length > 0) {
    // console.log('errorObj isArray', errorObj);
    if (lodash.isString(errorObj[0])) {
      errorMessage = lodash.join(errorObj, ', ');
    } else if (lodash.isObject(errorObj[0])) {
      let errorMessageCombined = '';
      lodash.each(errorObj, (errorSubObj)=>{
        if (errorSubObj.field && errorSubObj.defaultMessage) {
          errorMessageCombined = (errorMessageCombined !== '' ? errorMessageCombined + '.' : '') + (errorSubObj.field + ' ' + errorSubObj.defaultMessage);
        }
      });
      errorMessage = errorMessageCombined;
    }
    // console.log('extractMessage', errorMessage);
  } else if (lodash.isObject(errorObj)) {
    return errorMessageCombine(errorObj);
  } else if (lodash.isString(errorObj)) {
    errorMessage = errorObj.message || errorObj.status;
  }
  errorMessage = errorMessage || defaultMessage || 'Unknown Error';
  // console.log('extractMessage return', errorMessage);
  return errorMessage;
}

function extractErrorFromObject(state, errorObj) {
  if (errorObj.errors && lodash.isArray(errorObj.errors)) {
    // console.log('action.error String JSON -> Array', errorObj);
    state.errorMessage = extractMessage(errorObj.errors);
  } else {
    // console.log('action.error String JSON -> Object', errorObj);
    state.errorMessage = extractMessage(errorObj);
  }
}

export function extractError(state, action) {
  // console.log('extractError: ', action.error, typeof action.error);
  if (action.error) {
    state.isError = true;
    if (lodash.isString(action.error)) {
      // console.log('action.error isString');
      try {
        const errorObj = JSON.parse(action.error);
        state.error = errorObj;
        extractErrorFromObject(state, errorObj);
      } catch (ex) {
        // console.log(ex);
        state.error = { message: action.error };
        state.errorMessage = action.error;
        // console.log('action.error String', action.error, state);
      }
    } else {
      const errorObj = action.error;
      extractErrorFromObject(state, errorObj);
    }
  } else {
    state.error = null;
    state.errorMessage = null;
    state.isError = false;
    // console.log('action.error Null', action.error, state);
  }
  // if (state.error) {
  //   console.log('Extract error', state.error, state.errorMessage, state.isError);
  // }
}

export function watchForError(props, nextProps, componentName, isClearErrorNext = true) {
  if (nextProps.isError || nextProps.errorMessage || nextProps.error || nextProps.errorObj ) {
    const errorMessage = nextProps.errorMessage || extractMessage(nextProps.error, nextProps.errorMessage) || 'Unknown error';
    // console.log('watchForError', errorMessage);
    if (props.addNotification) {
      props.addNotification(errorMessage, 'error');
    }
    if (isClearErrorNext && props.clearError) {
      props.clearError();
    }
    // console.log(errorMessage, 'at', componentName);
    // this.props.clearNotification();
  }
}
