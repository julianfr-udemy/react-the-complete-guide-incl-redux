import { DELETE_RESULT, STORE_RESULT } from './actionTypes';

export const storeResult = result => {
  return (dispatch, getState) => {
    setTimeout(() => {
      const oldCounter = getState().counter.counter;

      console.log(oldCounter);

      dispatch((result => ({ type: STORE_RESULT, result }))(result))
    }, 2000);
  }
};

export const deleteResult = id => ({ type: DELETE_RESULT, id });