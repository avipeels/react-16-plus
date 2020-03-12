import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';
import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {

  state = {
    persons: [
      { id: 'abc123', name: 'Avinash', age: 29 },
      { id: 'def234', name: 'Bhanu', age: 25 },
      { id: 'ghi345', name: 'Manoj', age: 26 },
    ],
    displayPersons: false,
    userInput: '',
  }

  changeNameHandler = (event, id) => {
    const { persons } = this.state;
    //get the person
    const personIndex = persons.findIndex(p => {
      return p.id === id
    });
    console.log(personIndex);
    const person = { ...persons[personIndex] }; // make a copy of person Object because objects have reference to orginal value which changes the source object.
    console.log(person);
    //update the person name immutably
    person.name = event.target.value;
    const personsNew = [...persons]; // make a copy of persons Array because arrays have reference to orginal value which changes the source array.
    personsNew[personIndex] = person;
    console.log(personsNew);
    //update the state
    this.setState({ persons: personsNew });
  }

  toggleNameDisplayHandler = () => {
    this.setState({ displayPersons: !this.state.displayPersons });
  }

  deletePersonsHandler = (personId) => {
    // const newPersons = this.state.persons.slice();
    const newPersons = [...this.state.persons];
    newPersons.splice(personId, 1);
    this.setState({ persons: newPersons })
  }

  changeTextInputHandler = (event) => {
    const userInput = event.target.value;
    this.setState({ userInput: userInput });
  }

  deleteCharHandler = (index) => {
    
    const textArray = this.state.userInput.split('');
    textArray.splice(index, 1);
    const updatedText = textArray.join('');
    this.setState({
      userInput: updatedText
    });
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }
    const { displayPersons, persons, userInput } = this.state;
    let personsList = null;
    if (displayPersons) {
      personsList = (
        <div>
          {persons.map((person, index) => {
            return <Person
              key={person.id}
              click={() => this.deletePersonsHandler(index)}
              name={person.name}
              age={person.age}
              changed={(event) => this.changeNameHandler(event, person.id)}
            />
          })}
        </div>
      )
    }

    const charList = userInput.split('').map((ch, index) => {
      return <Char
        character={ch}
        key={index}
        clicked={() => this.deleteCharHandler(index)}
      />
    })
    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <button
          style={style}
          // onClick={this.switchNameHandler.bind(this, 'Avinash Peelu')}>Switch Name
          onClick={this.toggleNameDisplayHandler}>Toggle Persons
        </button>
        {personsList}

        {/* { Assignment} */}

        <input
          className="text"
          type="text"
          onChange={(event) => this.changeTextInputHandler(event)}
        />
        {(userInput.length > 0) && <p>{userInput}</p>}
        {(userInput.length > 0) && <Validation textLength={userInput.length} />}
        {charList}
      </div>
    );
  }
}

export default App;
