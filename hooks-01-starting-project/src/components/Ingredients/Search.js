import React, { useEffect, useRef, useState } from 'react';
import Card from '../UI/Card';
import './Search.css';


const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [filter, setFilter] = useState("");
  const inputRef = useRef();

  function onChangeFilter(event) {
    setFilter(event.target.value);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filter === inputRef.current.value) {
        const query = (filter.length === 0)
          ? ""
          : `?orderBy="title"&equalTo="${filter}"`;

        fetch("https://react-hooks-update-d3e6b-default-rtdb.firebaseio.com/ingredients.json" + query)
          .then(response => response
            .json()
            .then(body => {
              const ingredients = [];

              for (const key in body) {
                ingredients.push({
                  id: key,
                  title: body[key].title,
                  amount: body[key].amount
                });
              }

              onLoadIngredients(ingredients);
            })
          );
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    }
  }, [filter, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={filter} onChange={onChangeFilter} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
