const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
const TURN_OFF_NOTIFICATION = 'TURN_OFF_NOTIFICATION';
const CLEAR_ERROR = 'CLEAR_ERROR';

const initialState = {
  notification: '',
  notificationId: 0,
  notificationType: 'success',
};


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_ERROR:
      return {
        ...state,
        isError: false,
        error: null,
        errorMessage: null
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        notification: action.data,
        notificationId: state.notificationId + 1,
        notificationType: action.notificationType
      };
    case CLOSE_NOTIFICATION:
      return {
        ...state,
        notificationId: 0
      };
    default:
      return { ...state };
  }
}


export function turnOffNotificationMessage() {
  return {
    type: TURN_OFF_NOTIFICATION
  };
}

export function addNotification(data, notificationType) {
  return {
    type: ADD_NOTIFICATION,
    data: data,
    notificationType: notificationType
  };
}

export function closeNotification() {
  return {
    type: CLOSE_NOTIFICATION
  };
}

export function clearError() {
  return { type: CLEAR_ERROR };
}
