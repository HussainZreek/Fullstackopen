import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Form from './components/Form'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
      
  
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
   
  const hook = () => {
  console.log('effect')
  personsService
    .getAll()
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
}

useEffect(hook, [])
console.log('render', persons.length, 'persons')


  const addPerson = (event) => {
    event.preventDefault()
    const newObject = {
      name: newPerson,
      number: newNumber
    }
    if (persons.some(p => p.name === newObject.name)) {
      alert(`${newPerson} is already added to phonebook`)
    } else if (persons.some(p => p.number === newObject.number)) {
      alert(`${newNumber} is already added to phonebook`)
    } else {
       personsService
     .create(newObject)
     .then (response => {
      setPersons(persons.concat(response.data))
      setNewPerson('')
      setNewNumber('')
     })
      setNotificationMessage(`Added ${newPerson}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const deletePerson = (id) => {
     const person = persons.find(p => p.id === id)
      if (window.confirm(`Delete ${person.name} ?`)) {
        personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
      }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter filter={filter} setFilter={setFilter} />
      <Form addPerson={addPerson} PersonChange={handlePersonChange} NumberChange={handleNumberChange} newNumber={newNumber} newPerson={newPerson}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App