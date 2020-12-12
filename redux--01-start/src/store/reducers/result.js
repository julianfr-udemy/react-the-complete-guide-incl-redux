import { DELETE_RESULT, STORE_RESULT } from "../actions/actionTypes";
import { updateObject } from "../utility";

export default (state = { results: [] }, action) => {
  switch (action.type) {
    case STORE_RESULT: return storeResult(state, action.result)
    case DELETE_RESULT: return deleteResult(state, action.id);
    default: return state;
  }
}

const storeResult = (state, result) => updateObject(state, { results: state.results.concat({ id: new Date(), value: result }) });
const deleteResult = (state, id) => updateObject(state, { results: state.results.filter(result => result.id !== id) });