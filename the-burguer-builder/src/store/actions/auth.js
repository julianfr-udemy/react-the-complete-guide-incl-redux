import Axios from "axios";
import { AUTH_FAIL, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS, SET_AUTH_REDIRECT_PATH } from "./actionTypes";
import { googleApiKey } from './auth.json';

export const auth = (email, password, isSignup) => dispatch => {
  dispatch({ type: AUTH_START });

  const url = `https://identitytoolkit.googleapis.com/v1/accounts:sign${isSignup ? 'Up' : 'InWithPassword'}?key=` + googleApiKey;

  Axios
    .post(url, { email, password, returnSecureToken: true })
    .then(response => {
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', new Date(new Date().getTime() + response.data.expiresIn * 1000));
      localStorage.setItem('userId', response.data.localId);
      dispatch({ type: AUTH_SUCCESS, token: response.data.idToken, userId: response.data.localId })
      checkAuthTimeout(+response.data.expiresIn * 1000);
    })
    .catch(error => {
      dispatch({ type: AUTH_FAIL, error: error.response.data.error })
    })
}

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  dispatch({ type: AUTH_LOGOUT });
};

export const checkAuthTimeout = expiresIn => dispatch => setTimeout(() => dispatch(logout()), expiresIn);

export const setAuthRedirectPath = path => ({ type: SET_AUTH_REDIRECT_PATH, path });
export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch({ type: AUTH_SUCCESS, token, userId: localStorage.getItem('userId') });
      dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
    }
  }
};