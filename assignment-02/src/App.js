import React, { Component } from 'react';
import './App.css';
import CharComponent from './CharComponent/CharComponent';
import ValidationComponent from './ValidationComponent/ValidationComponent';

class App extends Component {
  state = {
    text: '',
    length: 0
  };

  inputChangedHandler(event) {
    this.setState({
      text: event.target.value,
      length: event.target.value.length
    });
  }

  removeCharacterHanlder(index) {
    const text = this.state.text.slice(0, index) + this.state.text.slice(index + 1);

    this.setState({
      text,
      length: text.length
    });
  }

  renderCharacters() {
    if (this.state.length === 0) return null;

    return this.state.text
      .split('')
      .map((c, i) => <CharComponent key={i} character={c} onRemove={this.removeCharacterHanlder.bind(this, i)} />);
  }

  render() {
    return (
      <div className="App">
        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <hr />
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
        <input onChange={this.inputChangedHandler.bind(this)} value={this.state.text} />
        <p>{this.state.length}</p>
        <ValidationComponent length={+this.state.length} />
        {this.renderCharacters()}
      </div>
    );
  }
}

export default App;
