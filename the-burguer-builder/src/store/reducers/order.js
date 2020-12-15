import { FETCH_ORDERS_FAIL, FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS, PURCHASE_BURGUER_FAIL, PURCHASE_BURGUER_INIT, PURCHASE_BURGUER_START, PURCHASE_BURGUER_SUCCESS } from "../actions/actionTypes";

export default (state = { orders: [], loading: false, purchased: false }, action) => {
  switch (action.type) {
    case PURCHASE_BURGUER_INIT:
      return {
        ...state,
        purchased: false
      };
    case PURCHASE_BURGUER_START:
      return {
        ...state,
        loading: true
      };
    case PURCHASE_BURGUER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat({ id: action.id, ...action.order })
      };
    case PURCHASE_BURGUER_FAIL:
      return {
        ...state,
        loading: false
      };
    case FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      }
    case FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      };
    default: return state;
  }
}