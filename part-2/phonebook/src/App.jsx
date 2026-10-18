import axiosService from './services/notes'
import { useEffect, useState } from 'react'

const Filter = (props) => {
  return <div>
    Filter by name : <input type="text" value={props.filterName} onChange={props.handleFilterName} />
  </div>
}

const PersonForm = ({ handleSubmit, newName, handleName, phoneNum, handlePhoneNum }) => {
  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="name">name : </label>
      <input type='text' value={newName} onChange={handleName} id='name' required />
    </div>
    <div>
      <label htmlFor="phno">PhNo : </label>
      <input type='number' value={phoneNum} onChange={handlePhoneNum} id='phno' required />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
}

const Persons = ({ persons, filteredNames, handleDelete }) => {
  return (
    <>
      {persons.length <= 0 && <div>No Numbers yet</div>}
      {
        persons.length > 0 && <table>
          <tbody>
            {filteredNames.map((item, index) => {
              return <tr key={item.id}>
                <td>{index + 1}.</td>
                <td>{item.name}</td>
                <td>{item.number}</td>
                <td><button onClick={() => handleDelete(item.id)}>Delete</button></td>
              </tr>
            })}
          </tbody>
        </table>
      }
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    axiosService.getAll().then(response => { setPersons(response.data) })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const existedPerson = persons.find(item => item.name.toLowerCase() === newName.toLowerCase())
    if (existedPerson) {
      const newNumObj = { ...existedPerson, number: phoneNum }
      const check = window.confirm(`${existedPerson.name} already exist in phonebook.replace the old number with new number`)
      if (check) {
        axiosService.update(existedPerson.id, newNumObj).then((res) => {
          setPersons(prev => prev.map(person => person.id === existedPerson.id ? res.data : person))
        })
      }
      return
    }
    const newObj = {
      name: newName,
      number: phoneNum
    }
    axiosService.create(newObj).then(res => {
      setPersons([...persons, res.data])
      setNewName('')
      setPhoneNum('')
    })
  }

  const handleDelete = (id) => {
    const person = persons.find(item => item.id === id)
    const check = window.confirm(`Delete ${person.name}`)
    if (check) {
      axiosService.delPerson(id).then(res => {
        setPersons(persons.filter(item => item.id !== id))
      })
    }
  }

  const handleName = (e) => {
    setNewName(e.target.value)
  }
  const handlePhoneNum = (e) => {
    setPhoneNum(e.target.value)
  }
  const handleFilterName = (e) => {
    setFilterName(e.target.value)
  }

  const filteredNames = persons.length > 0 ? persons.filter(item => item.name.toLowerCase().includes(filterName.toLowerCase())) : []
  return (
    <div>
      <h2>Phonebook :</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName} />

      <h2>Add a new name :</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleName={handleName} phoneNum={phoneNum} handlePhoneNum={handlePhoneNum} />

      <h2>Numbers</h2>
      <Persons filteredNames={filteredNames} persons={persons} handleDelete={handleDelete} />

    </div>
  )
}

export default App