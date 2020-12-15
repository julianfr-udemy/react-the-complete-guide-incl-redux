import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const mapStateToProps = state => ({ ingredients: state.burgerBuilder.ingredients, purchased: state.order.purchased });

export default connect(mapStateToProps)(class extends Component {

  checkoutCancelled = () => {
    this.props.history.goBack();
  }

  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  }

  render() {
    return (this.props.ingredients)
      ? (this.props.purchased)
        ? <Redirect to="/" />
        : (
          <div>
            <CheckoutSummary
              ingredients={this.props.ingredients}
              checkoutCancelled={this.checkoutCancelled}
              checkoutContinued={this.checkoutContinued}
            />
            <Route path={this.props.match.path + "/contact-data"} render={props => (<ContactData {...props} />)} />
          </div>
        )
      : <Redirect to="/" />;
  }
})