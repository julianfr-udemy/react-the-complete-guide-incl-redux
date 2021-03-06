import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

export default props => {
  let transformedIngredients = Object
    .keys(props.ingredients)
    .map(ingredient => [...Array(props.ingredients[ingredient])]
      .map((_, i) => <BurgerIngredient key={ingredient + i} type={ingredient} />)
    )
    .reduce((arr, el) => arr.concat(el), []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}