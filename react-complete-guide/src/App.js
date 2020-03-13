import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {

  state = {
    persons: [
      { id: 'abc123', name: 'Avinash', age: 29 },
      { id: 'def234', name: 'Bhanu', age: 25 },
      { id: 'ghi345', name: 'Manoj', age: 26 },
    ],
    displayPersons: false
  }

  changeNameHandler = (event, id) => {
    const { persons } = this.state;
    //get the person
    const personIndex = persons.findIndex(p => {
      return p.id === id
    });
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
    const newPersons = [...this.state.persons];
    newPersons.splice(personId, 1);
    this.setState({ persons: newPersons })
  }

  render() {

    const { displayPersons, persons } = this.state;
    let personsList = null;
    let buttonClass = [styles.Button];
    if (displayPersons) {
      personsList = (
        <div>
          {persons.map((person, index) => {
            return <ErrorBoundary>
              <Person
                key={person.id}
                click={() => this.deletePersonsHandler(index)}
                name={person.name}
                age={person.age}
                changed={(event) => this.changeNameHandler(event, person.id)}
              />
            </ErrorBoundary>
          })}
        </div>
      )
      buttonClass.push(styles.Red)
    }
    return (
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <img src={logo} className={styles.AppLogo} alt="logo" />
          <h1 className={styles.AppTitle}>Welcome to React</h1>
        </header>

        <button
          className={buttonClass.join(' ')}
          alt={this.state.displayPersons}
          onClick={this.toggleNameDisplayHandler}>Toggle Persons
        </button>
        {personsList}
      </div>
    );
  }
}

export default App;
