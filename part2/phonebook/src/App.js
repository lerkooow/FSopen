import { useState } from 'react';

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

const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map(person => (
        <p key={person.id}>{person.name} {person.number}</p>
      ))}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

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

    setPersons(persons.concat(nameObject));
    setNewName('');
    setNewNumber('');
  };

  // Filter

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

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
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;