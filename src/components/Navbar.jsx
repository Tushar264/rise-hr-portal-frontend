import {
  Link,
  useNavigate,
} from 'react-router-dom'

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

    <nav className='bg-black text-white'>

      <div className='max-w-7xl mx-auto px-4 py-3'>

        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

          {/* LOGO + TITLE */}

          <div className='flex items-center gap-3'>

            <img
              src='/rise-logo.png'
              alt='RISE'
              className='w-10 h-10 md:w-12 md:h-12 object-contain bg-white rounded p-1'
            />

            <h1 className='text-2xl font-bold'>
              RISE HR Portal
            </h1>

          </div>


          {/* NAV LINKS */}

          <div className='flex flex-wrap items-center gap-4 text-sm md:text-base'>

            <Link
              to='/'
              className='hover:text-yellow-400'
            >
              Dashboard
            </Link>


            <Link
              to='/announcements'
              className='hover:text-yellow-400'
            >
              Announcements
            </Link>


            {
              user?.role === 'ADMIN' && (
                <>
                  <Link
                    to='/admin'
                    className='hover:text-yellow-400'
                  >
                    Admin
                  </Link>


                  <Link
                    to='/audit-logs'
                    className='hover:text-yellow-400'
                  >
                    Audit Logs
                  </Link>
                </>
              )
            }


            <button
              onClick={logout}
              className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded'
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </nav>
  )
}