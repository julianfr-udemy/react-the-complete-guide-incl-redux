import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axiosOrders from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { ADD, REMOVE } from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // axiosOrders
    //   .get("https://react-my-burger-21168.firebaseio.com/ingredients.json")
    //   .then(response => this.setState({ ingredients: response.data }))
    //   .catch(error => this.setState({ error: true }));
  }

  updatePurcharseState(ingredients) {
    const sum = Object
      .keys(ingredients)
      .map(ingredient => ingredients[ingredient])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  }

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };

    for (let key in disabledInfo) { disabledInfo[key] = disabledInfo[key] <= 0; }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

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
            purchasable={this.updatePurcharseState(this.props.ingredients)} />
        </Fragment>);

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />;

      if (this.state.loading) { orderSummary = <Spinner />; }
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
  ingredients: state.ingredients,
  totalPrice: state.totalPrice
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingredient => { dispatch({ type: ADD, ingredient }) },
  onIngredientRemoved: ingredient => { dispatch({ type: REMOVE, ingredient }) }
})


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrders));