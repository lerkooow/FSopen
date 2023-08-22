import { useState, useEffect } from 'react';
import personService from './services/persons'
import "./App.css"


const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>filter shown with <input value={filter} onChange={handleFilterChange} /></div>
  );
};

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <div>
      name: <input value={newName} onChange={handleNameChange} /><br />
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
  )
}

const Persons = ({ filteredPersons, removePerson }) => {
  return (
    <div>
      {filteredPersons.map(person => (
        <div className="persons" key={person.id}>
          <p>{person.name} {person.number}</p>
          <button onClick={() => removePerson(person)}>detele</button>
        </div>
      ))}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  // Server data
  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  // Name

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  // Number

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  // Add Name and Number
  const addNameNumber = (e) => {
    e.preventDefault();

    if (!newName || !newNumber) {
      alert("Please enter both name and number");
      return;
    }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('');
        setNewNumber('');
      })
  };

  // Filter

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const removePerson = (person) => {
    const shouldDelete = window.confirm(`Delete ${person.name}?`);
    if (shouldDelete) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(prevState => prevState.filter(el => el.id !== person.id));
        })
    }
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <form onSubmit={addNameNumber}>
        <div>
          <h3>Add a new</h3>
          <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;