import axios from 'axios'
import dbURL from './database.config'

export default axios.create({
  baseURL: dbURL
})
