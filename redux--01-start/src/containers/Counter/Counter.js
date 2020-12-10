import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import { ADD, DECREMENT, DELETE_RESULT, INCREMENT, STORE_RESULT, SUBTRACT } from '../../store/actions';

class Counter extends Component {
  render() {
    return (
      <div>
        <CounterOutput value={this.props.counter} />
        <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
        <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
        <CounterControl label="Add 10" clicked={this.props.onAddCounter} />
        <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter} />
        <hr />
        <button onClick={() => this.props.onStoreResult(this.props.counter)}>Store Result</button>
        <ul>
          {this.props.results.map(result => <li key={result.id} onClick={() => this.props.onDeleteResult(result.id)}>{result.value}</li>)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counter: state.counter.counter,
  results: state.results.results
});

const mapDispatchToProps = dispatch => ({
  onIncrementCounter: () => dispatch({ type: INCREMENT }),
  onDecrementCounter: () => dispatch({ type: DECREMENT }),
  onAddCounter: () => dispatch({ type: ADD, value: 10 }),
  onSubtractCounter: () => dispatch({ type: SUBTRACT, value: 15 }),
  onStoreResult: result => dispatch({ type: STORE_RESULT, result }),
  onDeleteResult: id => dispatch({ type: DELETE_RESULT, id })
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);