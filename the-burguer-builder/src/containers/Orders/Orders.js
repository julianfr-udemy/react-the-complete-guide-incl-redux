import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions/order';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />

    if (!this.props.loading) {
      orders = this.props.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={+order.price} />);
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => ({ orders: state.order.orders, loading: state.order.loading });
const mapDispatchToProps = dispatch => ({ onFetchOrders: () => dispatch(fetchOrders()) });

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));