import axios from 'axios'

const noteApi = axios.create({
    baseURL: 'http://localhost:8000/'
})

export default noteApi;