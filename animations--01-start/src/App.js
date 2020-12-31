import React, { Component } from "react";
import { Transition } from "react-transition-group";
import "./App.css";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";
import Modal from "./components/Modal/Modal";

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false
  }

  showModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button className="Button" onClick={() => !this.setState(prevState => ({ showBlock: !this.state.showBlock }))}>Toggle</button>
        <br></br>
        <Transition
          in={this.state.showBlock}
          timeout={300}
          mountOnEnter
          unmountOnExit
          onEnter={() => console.log("onEnter")}
          onEntering={() => console.log("onEntering")}
          onEntered={() => console.log("onEntered")}
          onExit={() => console.log("onExit")}
          onExiting={() => console.log("onExiting")}
          onExited={() => console.log("onExited")}
        >
          {state => <div style={{
            backgroundColor: "red",
            width: 100,
            height: 100,
            margin: "auto",
            transition: "opacity 1000ms ease-out",
            opacity: state === 'exiting' ? 0 : 1
          }}></div>}
        </Transition>
        <Modal show={this.state.modalIsOpen} closed={this.closeModal} />
        <Transition timeout={300}>
          {state => <Backdrop show={this.state.modalIsOpen} />}
        </Transition>
        <button className="Button" onClick={this.showModal}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;