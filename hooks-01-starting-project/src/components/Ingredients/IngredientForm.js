import React, { useState } from 'react';
import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './IngredientForm.css';


const IngredientForm = React.memo(props => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({ title, amount });
  };

  const onChangeTitle = event => {
    setTitle(event.target.value);
  };

  const onChangeAmount = event => {
    setAmount(event.target.value);
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={title} onChange={onChangeTitle} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={amount} onChange={onChangeAmount} />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
