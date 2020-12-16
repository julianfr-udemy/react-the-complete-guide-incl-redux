import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axiosOrders from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { setAuthRedirectPath } from '../../store/actions/auth';
import { addIngredient, initIngredients, removeIngredient } from '../../store/actions/burgerBuilder';
import { purchaseInit } from '../../store/actions/order';

class BurgerBuilder extends Component {
  state = { purchasing: false };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurcharseState(ingredients) {
    const sum = Object
      .keys(ingredients)
      .map(ingredient => ingredients[ingredient])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push("/auth");
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  }

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };

    for (let key in disabledInfo) { disabledInfo[key] = disabledInfo[key] <= 0; }

    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />;
          <BuildControls
            disabled={disabledInfo}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            ordered={this.purchaseHandler}
            price={this.props.totalPrice}
            purchasable={this.updatePurcharseState(this.props.ingredients)}
            isAuth={this.props.isAuthenticated} />
        </Fragment>);

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />;
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}

      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingredient => dispatch(addIngredient(ingredient)),
  onIngredientRemoved: ingredient => dispatch(removeIngredient(ingredient)),
  onInitIngredients: () => dispatch(initIngredients()),
  onInitPurchase: () => dispatch(purchaseInit),
  onSetAuthRedirectPath: path => dispatch(setAuthRedirectPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrders));