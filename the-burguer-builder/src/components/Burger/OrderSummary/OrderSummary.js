import React, { Component, Fragment } from 'react';
import Button from '../../UI/Button/Button';

export default class extends Component {
  // This could be a functional component
  componentWillUpdate() {
    console.log('[OrderSummary] Will Update');
  }

  render() {
    const ingredientSummary = Object
      .keys(this.props.ingredients)
      .map(ingredient => <li key={ingredient} ><span style={{ textTransform: "capitalize" }}>{ingredient}</span>: {this.props.ingredients[ingredient]}</li>);

    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Fragment>
    );
  }
};