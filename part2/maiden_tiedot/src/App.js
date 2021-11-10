import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter ] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const filteredCountries = filter ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())): countries

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={filteredCountries} setFilter={setFilter}/>
    </div>
  );
}

export default App;
