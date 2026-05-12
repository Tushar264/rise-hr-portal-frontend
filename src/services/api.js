import axios from 'axios'

const api = axios.create({
  baseURL: 'https://rise-hr-portal-backend.onrender.com/api'                //'http://localhost:5000/api'  
})

export default api