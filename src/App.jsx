import {
  Routes,
  Route,
} from 'react-router-dom'

import Dashboard from './pages/Dashboard'

import Login from './pages/Login'

import AdminDashboard from './pages/AdminDashboard'

import Announcements from './pages/Announcements'

import AuditLogs from './pages/AuditLogs'


function App() {

  return (

    <Routes>

      <Route
        path='/login'
        element={<Login />}
      />

      <Route
        path='/'
        element={<Dashboard />}
      />

      <Route
        path='/admin'
        element={<AdminDashboard />}
      />

      <Route
        path='/announcements'
        element={<Announcements />}
      />

      <Route
        path='/audit-logs'
        element={<AuditLogs />}
      />

    </Routes>
  )
}

export default App