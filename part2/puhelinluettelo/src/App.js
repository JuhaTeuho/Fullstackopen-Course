import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ errorNotification, setErrorNotification ] = useState(null)

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)) {
      const p = persons.filter(per => per.name === newName)[0]
      console.log(p)
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)){
        const changedPerson = {...p, number: newNumber}
        personService
          .update(p.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== p.id ? person : returnedPerson))
          })
          .catch(error => {
            setPersons(persons.filter(p => p.id !== changedPerson.id))
            setErrorNotification(
              `the person '${newName}' was already deleted from server`
            )
            setTimeout(() => {
              setErrorNotification(null)
            }, 5000)
            return
          })
        setNewName('')
        setNewNumber('')
        setNotification(
          `Updated ${newName}`
          )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    personService
      .create(personObject)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
        setNotification(
          `Added ${newName}`
          )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const handleDeleteButtonClick = (person) => {
    if(window.confirm(`Delete ${person.name}?`)){
      personService
      .remove(person.id)
      .then(()=>{
        setPersons(persons.filter(p => p.id !== person.id))
        setNotification(
          `Deleted ${person.name}`
          )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setPersons(persons.filter(p => p.id !== person.id))
        setErrorNotification(
          `the person '${person.name}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorNotification(null)
        }, 5000)
        return
      })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification}/>
      <ErrorNotification message={errorNotification}/>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      
      <h3>Add new person</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} deleteHandler={handleDeleteButtonClick}/>
    </div>
  )
}

export default App