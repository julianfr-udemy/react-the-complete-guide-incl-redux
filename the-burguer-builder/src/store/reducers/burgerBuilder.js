import { ADD, ERROR, REMOVE, SET } from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = { salad: .5, bacon: .7, cheese: .4, meat: 1.3 };

export default (state = { ingredients: null, totalPrice: 4, error: false, building: false }, action) => {
  switch (action.type) {
    case ADD:
      const ingredients = updateObject(state.ingredients, { [action.ingredient]: state.ingredients[action.ingredient] + 1 });
      return updateObject(state, { totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient], ingredients, building: true });
    case REMOVE:
      const amount = state.ingredients[action.ingredient] && 1;
      const cost = amount && INGREDIENT_PRICES[action.ingredient];

      return {
        ...state,
        totalPrice: state.totalPrice - cost,
        building: true,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - amount
        }
      };
    case SET:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        building: false,
        totalPrice: 5.3,
        error: false
      };
    case ERROR:
      return {
        ...state,
        error: true
      };

    default: return state;
  }
}