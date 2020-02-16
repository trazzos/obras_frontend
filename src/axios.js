import axios from 'axios'

const base = axios.create({
  baseURL: 'http://obras.test/api',
})

export default base
