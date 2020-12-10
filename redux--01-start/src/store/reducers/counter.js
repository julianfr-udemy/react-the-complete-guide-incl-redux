import { ADD, DECREMENT, INCREMENT, SUBTRACT } from "../actions";

export default (state = { counter: 0 }, action) => {
  switch (action.type) {
    case INCREMENT: return { ...state, counter: state.counter + 1 };
    case DECREMENT: return { ...state, counter: state.counter - 1 };
    case ADD: return { ...state, counter: state.counter + action.value };
    case SUBTRACT: return { ...state, counter: state.counter - action.value };
    default: return state;
  }
}