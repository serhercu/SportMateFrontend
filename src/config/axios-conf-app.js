import axios from 'axios'

const HTTP_APP = axios.create({
    baseURL: 'http://localhost:8082',
  })

  export default HTTP_APP