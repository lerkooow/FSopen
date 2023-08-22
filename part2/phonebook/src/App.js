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

  //  Get Server Data
  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
      .catch(error => {
        console.log('fail', error)
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

    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) { // Если человек уже существует в базе:
      const numberReplace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      // Ели пользователь согласен заменить номер существующего в базе данных человека, то:
      if (numberReplace) {
        const changedPerson = { ...existingPerson, number: newNumber }; // Мы копируем исходный массив с изменением номера телефона
        personService
          // Replace Server Data
          .replace(existingPerson.id, changedPerson) // Отправляем изменения на сервер, проверяя при этом совпадает ли id и сбрасываем поля ввода
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            alert(
              `'${persons.name}' was already deleted from server`
            )
            setPersons(persons.filter(person => person.name === newName), error)
          })
      }
    } else { // Если такого человека не существует в базе, то мы
      const newPerson = { // Создане объект с новым человеком, куда записываем имя и номер телефона
        name: newName,
        number: newNumber
      };
      // Create Server Data
      personService // Отправляем данные на сервер изменяя уже существующий массив объектов
        .create(newPerson)
        .then(returnedPerson => {
          setPersons([...persons, returnedPerson]);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          alert('Error creating person:', error);
        });
    }
  };

  // Filter

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Delete persons

  const detelePerson = (person) => {
    const shouldDelete = window.confirm(`Delete ${person.name}?`);
    if (shouldDelete) {
      personService
        // Delete Server Data
        .remove(person.id)
        .then(() => {
          setPersons(prevState => prevState.filter(el => el.id !== person.id));
        })
        .catch(error => {
          alert('Error deleting person:', error);
        });
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
      <Persons filteredPersons={filteredPersons} detelePerson={detelePerson} />
    </div>
  );
};

export default App;