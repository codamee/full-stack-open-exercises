import { useState, useEffect, act } from "react"
import axios from 'axios'

const CountryDetails = ({ coun, weather }) => {
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
    {weather && weather.main ? (
      <div>
        <h2>Weather</h2>
        <p>Temperature: {weather.main.temp} °C</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    ) : (
      <p>Loading weather...</p>
    )}
  </div>
}

const Filter = ({ filteredList, input, handleShowDetails, weather, activeCountry }) => {
  if (input.length === 0) {
    return <div>Specify a country name</div>
  }
  else if (filteredList.length === 1) {
    return <CountryDetails coun={activeCountry} weather={weather} />
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
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        setCountriesList(res.data)
      })
  }, [])

  useEffect(() => {
    const capital = activeCountry?.capital[0]
    if (!capital) return
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`).then(res => {
      setWeather(res.data)
    })
  }, [country])

  const handleInput = (event) => {
    setInput(event.target.value)
  }

  const handleShowDetails = (cca2) => {
    const coun = countriesList.find((item) => item.cca2 === cca2)
    setShowDetals(true)
    setCountry(coun)
  }
  const filteredList = countriesList.filter((item) => item.name.common.toLowerCase().includes(input.toLocaleLowerCase()))
  const activeCountry = showDetails ? country :  filteredList[0] 
  console.log(activeCountry)
  return (
    <div>
      <form >
        <label htmlFor="country">Find countries : </label>
        <input type="text" id="country" value={input} onChange={handleInput} />
      </form><hr />

      {showDetails ? (
        <div>
          <button onClick={() => setShowDetals(null)}>Back to list</button>
          <CountryDetails coun={activeCountry} weather={weather} />
        </div>
      ) : (
        <Filter
          filteredList={filteredList}
          handleShowDetails={handleShowDetails}
          input={input}
          weather={weather}
          activeCountry={activeCountry}
        />
      )}
    </div>
  )
}

export default App