import {
  Link,
  useNavigate,
} from 'react-router-dom'

import logo
  from '../assets/rise-logo.png'

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

    <div className='bg-[var(--rise-primary)] text-[var(--rise-white)] px-6 py-4 flex justify-between items-center shadow-md'>

      <div className='flex items-center gap-3'>

        <img
          src={logo}
          alt='RISE'
          className='h-10'
        />

        <h1 className='text-2xl font-bold tracking-wide'>

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
          className='bg-[var(--rise-black)] text-[var(--rise-white)] px-4 py-2 rounded-lg hover:opacity-90 transition'
        >
          Logout
        </button>

      </div>

    </div>
  )
}