import React from 'react'

const Person = ({ person }) => {
  return (
    <><b>{person.name}</b> {person.number}</>
  )
}

export default Person