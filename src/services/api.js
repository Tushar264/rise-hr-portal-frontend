import axios from 'axios'

const api = axios.create({
  baseURL: 'https://rise-hr-portal-backend.onrender.com/api',
})

export default api