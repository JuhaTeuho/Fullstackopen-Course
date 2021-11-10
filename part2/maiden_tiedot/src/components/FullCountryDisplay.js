import React, { useState, useEffect } from 'react'
import axios from 'axios'


const FullCountryDisplay = (props) => {
    const [weather, setWeather] = useState({})

    console.log(props)
    const country = props.country

    const hook = () => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital[0]}`)
          .then(response => {
            const resp = response.data
            console.log(resp)
            setWeather({
              temperature: resp.current.temperature,
              icon: resp.current.weather_icons[0],
              wind_speed: resp.current.wind_speed,
              wind_direction: resp.current.wind_dir
            }
            )
        })
      }
      useEffect(hook, [country])

    const langs = Object.keys(country.languages).map((key) => <li key={country.languages[key]}>{country.languages[key]}</li>)
    console.log(props.weather_data)
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>
                capital {country.capital[0]}
                <br></br>
                population {country.population}
            </div>
            <h2>languages</h2>
            <ul>
                {langs}
            </ul>
            <img src={country.flags["png"]} alt="" />
            <h2>Weather in {country.capital[0]}</h2>
            <div>
                <b>temperature: </b>
                {weather.temperature} Celsius
                <div><img src={weather.icon} alt="" /></div>
                <b>wind: </b>
                {weather.wind_speed} km/h direction {weather.wind_direction}
            </div>
        </div>
    )
}

export default FullCountryDisplay