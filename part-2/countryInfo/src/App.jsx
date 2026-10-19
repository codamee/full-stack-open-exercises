import { useState, useEffect } from "react"
import axios from 'axios'

const CountryDetails = ({ coun }) => {
  return <div>
    <h1>{coun.name.common}</h1>
    <div>
      <p>Capital : {coun.capital[0]}</p>
      <p>Area : {coun.area}</p>
      <p>Currency:{coun.currencies[0]}</p>
    </div>
    <div>
      <h2>Languages</h2>
      <ul>
        {Object.values(coun.languages).map((item, index) => {
          return <li key={item}>{item}</li>
        })}
      </ul>
    </div>
    <div>
      <h2>Flag</h2>
      <img src={`${coun.flags.png}`} alt="" />
    </div>
  </div>
}

const Filter = ({ filteredList, input, handleShowDetails }) => {
  if (input.length === 0) {
    return <div>Specify a country name</div>
  }
  else if (filteredList.length === 1) {
    return <CountryDetails coun={filteredList[0]} />
  }
  else if (filteredList.length > 1 && filteredList.length <= 10) {
    return (filteredList.map((item, index) => {
      return <div key={item.cca2}>
        <span>{item.name.common}</span> :
        : <button onClick={() => handleShowDetails(item.cca2)}>Show Details</button>
      </div>
    }))
  }
  else if (filteredList.length > 10) {
    return <div>Too many requests , specify another filter </div>
  }
  else {
    return <div>Country Not Found</div>
  }
}

const App = () => {
  const [input, setInput] = useState('')
  const [country, setCountry] = useState(null)
  const [countriesList, setCountriesList] = useState([])
  const [showDetails, setShowDetals] = useState(false)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        setCountriesList(res.data)
      })
  }, [])

  const handleInput = (event) => {
    setInput(event.target.value)
  }
  const handleSubmit = () => {
    setCountry(input)
  }

  const handleShowDetails = (cca2) => {
    const coun = countriesList.find((item) => item.cca2 === cca2)
    setShowDetals(true)
    setCountry(coun)
  }
  const filteredList = countriesList.filter((item) => item.name.common.toLowerCase().includes(input.toLocaleLowerCase()))

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="country">Find countries : </label>
        <input type="text" id="country" value={input} onChange={handleInput} />
      </form><hr />

      {showDetails ? (
        <div>
          <button onClick={() => setShowDetals(null)}>Back to list</button>
          <CountryDetails coun={country} />
        </div>
      ) : (
        <Filter
          filteredList={filteredList}
          handleShowDetails={handleShowDetails}
          input={input}
        />
      )}
    </div>
  )
}

export default App