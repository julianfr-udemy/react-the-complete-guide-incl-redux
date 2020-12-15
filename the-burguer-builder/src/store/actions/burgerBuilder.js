import axiosOrders from "../../axios-orders";
import { ADD, ERROR, REMOVE, SET } from "./actionTypes";

export const addIngredient = ingredient => ({ type: ADD, ingredient });
export const removeIngredient = ingredient => ({ type: REMOVE, ingredient });
export const initIngredients = () => dispatch => {
  axiosOrders
    .get("https://react-my-burger-21168.firebaseio.com/ingredients.json")
    .then(response => dispatch((ingredients => ({ type: SET, ingredients }))(response.data)))
    .catch(error => dispatch((() => ({ type: ERROR }))()))
};