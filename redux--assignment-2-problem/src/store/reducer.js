import { ADD, REMOVE } from "./actions";

export default (state = { persons: [] }, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, persons: state.persons.concat({ id: Math.random(), name: action.name, age: action.age }) };
    case REMOVE:
      return { ...state, persons: state.persons.filter(person => person.id !== action.id) }
    default: return state;
  }
}