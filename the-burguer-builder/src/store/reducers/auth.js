import { AUTH_FAIL, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS, SET_AUTH_REDIRECT_PATH } from "../actions/actionTypes";

export default (state = { token: null, userId: null, error: null, loading: false, authRedirectPath: '/' }, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
      };
    case AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      };
    case SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path
      }
    default: return state;
  }
};