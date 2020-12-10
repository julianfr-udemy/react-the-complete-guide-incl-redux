import { ADD, REMOVE } from "./actions";

const INGREDIENT_PRICES = {
  salad: .5,
  bacon: .7,
  cheese: .4,
  meat: 1.3
}

export default (state = { ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 }, totalPrice: 4 }, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1
        }
      };
    case REMOVE:
      const amount = state.ingredients[action.ingredient] && 1;
      const cost = amount && INGREDIENT_PRICES[action.ingredient];

      return {
        ...state,
        totalPrice: state.totalPrice - cost,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - amount
        }
      };
    default: return state;
  }
}