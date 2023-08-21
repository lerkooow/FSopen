import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  console.log("🚀 ~ file: App.js:7 ~ App ~ persons:", persons)
  const [newName, setNewName] = useState('')

  const addName = (e) => {
    const nameObject = {
      name: newName,
    }
    e.preventDefault()
    console.log('button clicked', e.target)
    setPersons(persons.concat(nameObject))
  }

  const handleNameChange = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person => <p>{person.name}</p>)}</div>
    </div>
  )
}

export default App