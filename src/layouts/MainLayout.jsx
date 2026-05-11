import {
  Link,
  useNavigate,
} from 'react-router-dom'

export default function MainLayout({
  children,
}) {

  const navigate = useNavigate()

  const user = JSON.parse(
    localStorage.getItem('user')
  )


  const logout = () => {

    localStorage.clear()

    navigate('/login')
  }


  return (

    <div className='flex min-h-screen'>

      {/* SIDEBAR */}

      <div className='w-64 bg-black text-white p-6'>

        <h1 className='text-2xl font-bold mb-8'>
          RISE HR
        </h1>


        <div className='space-y-4'>

          <Link
            to='/'
            className='block hover:text-gray-300'
          >
            Dashboard
          </Link>


          <Link
            to='/announcements'
            className='block hover:text-gray-300'
          >
            Announcements
          </Link>


          {
            user?.role === 'ADMIN' && (

              <>
                <Link
                  to='/admin'
                  className='block hover:text-gray-300'
                >
                  Admin Dashboard
                </Link>

                <Link
                  to='/audit-logs'
                  className='block hover:text-gray-300'
                >
                  Audit Logs
                </Link>
              </>
            )
          }

        </div>


        <button
          onClick={logout}
          className='mt-10 bg-red-500 px-4 py-2 rounded'
        >
          Logout
        </button>

      </div>


      {/* CONTENT */}

      <div className='flex-1 bg-gray-100'>

        {children}

      </div>

    </div>
  )
}