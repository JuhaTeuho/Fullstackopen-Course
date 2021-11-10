import React from 'react'
import Country from './Country'
import FullCountryDisplay from './FullCountryDisplay'

const Countries = (props) => {
    const countries = props.countries

    if (countries.length === 1) {
        return <FullCountryDisplay country={countries[0]} info="full" weatherData={props.weatherData} />
    } else if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else {
        return countries.map((country) => <Country country={country} info="less" setFilter={props.setFilter}/>)
    }

}

export default Countries