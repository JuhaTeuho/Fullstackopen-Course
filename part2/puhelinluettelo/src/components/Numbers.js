import React from 'react'
import Person from './Person'

const Numbers = (props) => {
  const persons = props.persons
  const filter = props.filter

  return (
    <div>
      {filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map((person) => <div key={person.name}><Person person={person} /><button onClick={() => props.deleteHandler(person)}>delete</button><br></br></div>) : persons.map((person) => 
        <div key={person.name}><Person person={person} /><button onClick={() => props.deleteHandler(person)}>delete</button><br></br></div>
      )}
    </div>
  )
}

export default Numbers