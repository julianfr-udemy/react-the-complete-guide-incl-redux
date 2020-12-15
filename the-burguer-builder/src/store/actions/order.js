import axiosOrders from "../../axios-orders";
import { FETCH_ORDERS_FAIL, FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS, PURCHASE_BURGUER_FAIL, PURCHASE_BURGUER_INIT, PURCHASE_BURGUER_START, PURCHASE_BURGUER_SUCCESS } from "./actionTypes";

export const purchaseBurger = order => dispatch => {
  dispatch((() => ({ type: PURCHASE_BURGUER_START }))());
  axiosOrders
    .post('orders.json', order)
    .then(response => dispatch(((id, order) => ({ type: PURCHASE_BURGUER_SUCCESS, id, order }))(response.data.name, order)))
    .catch(error => dispatch((error => ({ type: PURCHASE_BURGUER_FAIL, error }))(error)));
}

export const purchaseInit = () => ({ type: PURCHASE_BURGUER_INIT });

export const fetchOrders = () => dispatch => {
  dispatch({ type: FETCH_ORDERS_START });
  axiosOrders.get('/orders.json')
    .then(res => {
      const fetchedOrders = [];

      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch({ type: FETCH_ORDERS_SUCCESS, orders: fetchedOrders });
    })
    .catch(error => dispatch({ type: FETCH_ORDERS_FAIL, error }));
}