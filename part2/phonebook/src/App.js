import { useState, useEffect } from 'react';
import personService from './services/persons'

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

const Persons = ({ filteredPersons, detelePerson }) => {
  return (
    <div>
      {filteredPersons.map(person => (
        <div className="persons" key={person.id}>
          <p>{person.name} {person.number}</p>
          <button onClick={() => detelePerson(person)}>delete</button>
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
  const [goodMessage, setGoodMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

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
    } else if (newName.length < 3) {
      setErrorMessage(`Person validation failed: name: Path "name" ("${newName}") is shorter than the minimum allowed length (3)`);
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
            setGoodMessage(`Update number ${newName}`)
            setTimeout(() => {
              setGoodMessage(null)
            }, 5000);
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000);
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
          setGoodMessage(`Added ${newName}`)
          setTimeout(() => {
            setGoodMessage(null)
          }, 5000);
        })
        .catch(error => {
          setErrorMessage("Error creating person")
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
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
          setErrorMessage(
            `"${person.name}" was already deleted from server`
          );
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
          setPersons(prevState => prevState.filter(el => el.id !== person.id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {goodMessage ? <div className="good">{goodMessage}</div> : errorMessage ? <div className="error">{errorMessage}</div> : null}
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