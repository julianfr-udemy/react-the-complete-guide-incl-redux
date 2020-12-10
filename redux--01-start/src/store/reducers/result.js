import { DELETE_RESULT, STORE_RESULT } from "../actions";

export default (state = { results: [] }, action) => {
  console.log("dasfa")
  switch (action.type) {
    case STORE_RESULT: return { ...state, results: state.results.concat({ id: new Date(), value: action.result }) }
    case DELETE_RESULT: return { ...state, results: state.results.filter(result => result.id !== action.id) }
    default: return state;
  }
}