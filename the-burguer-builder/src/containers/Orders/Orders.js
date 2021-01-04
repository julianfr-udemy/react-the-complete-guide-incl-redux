import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions/order';

export default connect(
  state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }),
  dispatch => ({
    onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
  }))(WithErrorHandler(props => {
    const { token, userId, onFetchOrders } = props;

    useEffect(() => {
      onFetchOrders(token, userId);
    }, [token, userId, onFetchOrders]);

    let orders = <Spinner />

    if (!props.loading) {
      orders = props.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={+order.price} />);
    }

    return <div>{orders}</div>;
  }, axios));