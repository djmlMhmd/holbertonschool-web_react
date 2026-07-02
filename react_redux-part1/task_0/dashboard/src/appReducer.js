const APP_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  TOGGLE_DRAWER: 'TOGGLE_DRAWER',
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  SET_COURSES: 'SET_COURSES'
};

const initialState = {
  displayDrawer: false,
  user: { email: '', password: '', isLoggedIn: false },
  notifications: [],
  courses: []
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: { email: action.payload.email, password: action.payload.password, isLoggedIn: true }};
    case 'LOGOUT':
      return { ...state, user: { email: '', password: '', isLoggedIn: false }, courses: []};
    case 'TOGGLE_DRAWER':
      return { ...state, displayDrawer: !state.displayDrawer };
    case 'MARK_NOTIFICATION_READ':
      return { ...state, notifications: state.notifications.filter(item => item.id !== action.payload)};
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'SET_COURSES':
      return { ...state, courses: action.payload };
    default:
      return state;
  }
}

export { APP_ACTIONS, initialState, appReducer };
