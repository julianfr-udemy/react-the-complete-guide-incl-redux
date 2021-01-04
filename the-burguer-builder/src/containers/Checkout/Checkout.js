import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const mapStateToProps = state => ({ ingredients: state.burgerBuilder.ingredients, purchased: state.order.purchased });

export default connect(mapStateToProps)(props => {
  const checkoutCancelled = () => props.history.goBack();
  const checkoutContinued = () => props.history.replace("/checkout/contact-data");

  return (props.ingredients)
    ? (props.purchased)
      ? <Redirect to="/" />
      : (
        <div>
          <CheckoutSummary
            ingredients={props.ingredients}
            checkoutCancelled={checkoutCancelled}
            checkoutContinued={checkoutContinued}
          />
          <Route path={props.match.path + "/contact-data"} render={props => (<ContactData {...props} />)} />
        </div>
      )
    : <Redirect to="/" />;
})