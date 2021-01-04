import React from 'react';
import classes from './BurgerIngredient.module.css';

export default props => {
  switch (props.type) {
    case ('bread-top'):
      return (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
    case ('bread-bottom'): return <div className={classes.BreadBottom}></div>;
    case ('meat'): return <div className={classes.Meat}></div>;
    case ('cheese'): return <div className={classes.Cheese}></div>;
    case ('bacon'): return <div className={classes.Bacon}></div>;
    case ('salad'): return <div className={classes.Salad}></div>;
    default: return null;
  }
};