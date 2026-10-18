import axios from "axios";
const baseUrl = "http://localhost:3000/persons"

const getAll = () => {
    return axios.get(baseUrl)
}
const create = (newObj) => {
    return axios.post(baseUrl, newObj)
}
const delPerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}
const update = (id,newObj) => {
    return axios.put(`${baseUrl}/${id}`,newObj)
}
export default { getAll, create, delPerson ,update}