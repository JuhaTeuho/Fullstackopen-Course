
const Country = (props) => {

    console.log(props)
    const country = props.country

    return (
        <div>
            {country.name.common} <button onClick={() => props.setFilter(country.name.common)}>show</button>
        </div>
    )
}

export default Country