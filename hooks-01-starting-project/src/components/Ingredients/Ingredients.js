import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import useHttp from '../../hooks/http';
import ErrorModal from '../UI/ErrorModal';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const ingredientsReducer = (ingredients, action) => {
  switch (action.type) {
    case "SET": return action.ingredients;
    case "ADD": return [...ingredients, action.ingredient];
    case "DELETE": return ingredients.filter(ingredient => ingredient.id !== action.id);
    default: throw new Error("Should not get there!");
  }
};

function Ingredients() {
  const [ingredients, ingredientsDispatch] = useReducer(ingredientsReducer, []);
  const { isLoading, error, data, sendRequest, extra, id } = useHttp();

  useEffect(() => {
    if (!isLoading && id === "DELETE") {
      ingredientsDispatch({ type: "DELETE", id: extra });
    } else if (!isLoading && !error && data && id === "ADD") {
      ingredientsDispatch({ type: "ADD", ingredient: { id: data.name, ...extra } });
    }
  }, [data, error, extra, id, isLoading]);

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(
      "https://react-hooks-update-d3e6b-default-rtdb.firebaseio.com/ingredients.json",
      "POST",
      JSON.stringify(ingredient),
      null,
      "ADD"
    );
  }, [sendRequest]);

  const clearError = useCallback(() => {
    //httpDispatch({ type: "CLEAR" });
  }, []);

  const onLoadIngredientsHandler = useCallback(ingredients => {
    ingredientsDispatch({ type: "SET", ingredients });
  }, []);

  const onRemoveItemHanlder = useCallback(id => {
    sendRequest(
      `https://react-hooks-update-d3e6b-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      "DELETE",
      null,
      id,
      "DELETE"
    );
  }, [sendRequest]);

  function onCloseHandler() {
    clearError();
  }

  const ingredientList = useMemo(() => {
    return (
      <IngredientList {...{ ingredients }} onRemoveItem={onRemoveItemHanlder} />
    );
  }, [ingredients, onRemoveItemHanlder]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={onCloseHandler}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={onLoadIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;