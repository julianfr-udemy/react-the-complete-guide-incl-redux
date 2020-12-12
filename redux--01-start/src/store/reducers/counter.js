import { ADD, DECREMENT, INCREMENT, SUBTRACT } from "../actions/actionTypes";
import { updateObject } from '../utility';

export default (state = { counter: 0 }, action) => {
  switch (action.type) {
    case INCREMENT: return updateObject(state, { counter: state.counter + 1 });
    case DECREMENT: return updateObject(state, { counter: state.counter - 1 });
    case ADD: return updateObject(state, { counter: state.counter + action.value });
    case SUBTRACT: return updateObject(state, { counter: state.counter - action.value });
    default: return state;
  }
}