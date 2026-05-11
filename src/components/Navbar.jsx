import {
  Link,
  useNavigate,
} from 'react-router-dom'

import logo from '../assets/logo.png'

export default function Navbar() {

  const navigate = useNavigate()

  const user =
    JSON.parse(
      localStorage.getItem('user')
    )


  const logout = () => {

    localStorage.clear()

    navigate('/login')
  }


  return (

    <div className='bg-gray-400 text-black px-6 py-4 flex justify-between items-center shadow-md border-b'>

      <div className='flex items-center gap-3'>

        <img
          src={logo}
          alt='RISE Logo'
          className='h-10 w-auto'
        />

        <h1 className='text-2xl font-bold'>
          RISE HR Portal
        </h1>

      </div>


      <div className='flex gap-6 items-center'>

        <Link to='/'>
          Dashboard
        </Link>

        <Link to='/announcements'>
          Announcements
        </Link>


        {
          user?.role === 'ADMIN' && (
            <>
              <Link to='/admin'>
                Admin
              </Link>

              <Link to='/audit-logs'>
                Audit Logs
              </Link>
            </>
          )
        }


        <button
          onClick={logout}
          className='bg-black text-white px-4 py-1 rounded'
        >
          Logout
        </button>

      </div>

    </div>
  )
}