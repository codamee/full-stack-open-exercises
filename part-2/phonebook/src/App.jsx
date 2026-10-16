import { useState } from 'react'
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

const Persons = ({ persons, filteredNames }) => {
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
                                <td>{item.phoneNum}</td>
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const exitstedItem = persons.find(item => item.name.toLowerCase() === newName.toLowerCase())
        if (exitstedItem) {
            alert(`${newName} already exists`)
            return
        }
        const newObj = {
            id: crypto.randomUUID(),
            name: newName,
            phoneNum: phoneNum
        }
        setPersons([...persons, newObj])
        setNewName('')
        setPhoneNum('')
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

    const filteredNames = persons.filter(item => item.name.toLowerCase().includes(filterName.toLowerCase()))
    return (
        <div>
            <h2>Phonebook :</h2>
            <Filter filterName={filterName} handleFilterName={handleFilterName} />

            <h2>Add a new name :</h2>
            <PersonForm handleSubmit={handleSubmit} newName={newName} handleName={handleName} phoneNum={phoneNum} handlePhoneNum={handlePhoneNum} />

            <h2>Numbers</h2>
            <Persons filteredNames={filteredNames} persons={persons} />

        </div>
    )
}

export default App