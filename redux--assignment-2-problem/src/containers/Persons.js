import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddPerson from '../components/AddPerson/AddPerson';
import Person from '../components/Person/Person';
import { ADD, REMOVE } from '../store/actions';

class Persons extends Component {
  render() {
    return (
      <div>
        <AddPerson personAdded={this.props.onPersonAdd} />
        {this.props.persons.map(person => (
          <Person
            key={person.id}
            name={person.name}
            age={person.age}
            clicked={() => this.props.onPersonDelete(person.id)} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({ persons: state.persons });
const mapDispatchToProps = dispatch => ({
  onPersonAdd: (name, age) => dispatch({ type: ADD, name, age }),
  onPersonDelete: id => dispatch({ type: REMOVE, id })
});

export default connect(mapStateToProps, mapDispatchToProps)(Persons);