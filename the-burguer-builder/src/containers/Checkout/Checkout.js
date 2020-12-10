import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const mapStateToProps = state => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice
});

export default connect(mapStateToProps)(class extends Component {
  checkoutCancelled = () => {
    this.props.history.goBack();
  }

  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinued={this.checkoutContinued}
        />
        <Route path={this.props.match.path + "/contact-data"} render={props => (<ContactData {...props} />)} />
      </div>
    );
  }
})