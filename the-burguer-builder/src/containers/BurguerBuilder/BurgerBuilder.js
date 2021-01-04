import React, { Fragment, useEffect, useState } from 'react';
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

const BurgerBuilder = props => {
  const { onInitIngredients } = props;
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => onInitIngredients(), [onInitIngredients]);

  const updatePurcharseState = ingredients => {
    const sum = Object
      .keys(ingredients)
      .map(ingredient => ingredients[ingredient])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  }

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push("/auth");
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  }

  const disabledInfo = {
    ...props.ingredients
  };

  for (let key in disabledInfo) { disabledInfo[key] = disabledInfo[key] <= 0; }

  let orderSummary = null;
  let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (props.ingredients) {
    burger = (
      <Fragment>
        <Burger ingredients={props.ingredients} />;
        <BuildControls
          disabled={disabledInfo}
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          ordered={purchaseHandler}
          price={props.totalPrice}
          purchasable={updatePurcharseState(props.ingredients)}
          isAuth={props.isAuthenticated} />
      </Fragment>);

    orderSummary = <OrderSummary
      ingredients={props.ingredients}
      price={props.totalPrice}
      purchaseCanceled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
    />;
  }

  return (
    <Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}

    </Fragment>
  );
};

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