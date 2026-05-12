import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api'         //'https://rise-hr-portal-backend.onrender.com/api'                
})

export default api