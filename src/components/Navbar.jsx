import {
  Link,
  useNavigate,
} from 'react-router-dom'

import {
  useState,
} from 'react'

import {
  Menu,
  X,
} from 'lucide-react'

import logo
  from '../assets/rise-logo.png'

export default function Navbar() {

  const navigate =
    useNavigate()

  const [open, setOpen] =
    useState(false)

  const user =
    JSON.parse(
      localStorage.getItem('user')
    )


  const logout = () => {

    localStorage.clear()

    navigate('/login')
  }


  return (

    <nav className='bg-[var(--rise-primary)] text-white shadow-md'>

      <div className='max-w-7xl mx-auto px-4 py-3'>

        <div className='flex items-center justify-between'>

          {/* LOGO */}
          <div className='flex items-center gap-3'>

            <img
              src={logo}
              alt='RISE'
              className='h-10 w-auto bg-white p-1 rounded'
            />

            <h1 className='text-2xl font-bold hidden sm:block'>

              RISE HR Portal

            </h1>

          </div>


          {/* DESKTOP MENU */}
          <div className='hidden md:flex items-center gap-6'>

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
              className='bg-black px-4 py-2 rounded-lg hover:opacity-90 transition'
            >
              Logout
            </button>

          </div>


          {/* MOBILE MENU BUTTON */}
          <button

            className='md:hidden'

            onClick={() =>
              setOpen(!open)
            }
          >

            {
              open
                ? <X size={28} />
                : <Menu size={28} />
            }

          </button>

        </div>


        {/* MOBILE MENU */}
        {
          open && (

            <div className='md:hidden flex flex-col gap-4 mt-4 pb-4'>

              <Link
                to='/'
                onClick={() =>
                  setOpen(false)
                }
              >
                Dashboard
              </Link>


              <Link
                to='/announcements'
                onClick={() =>
                  setOpen(false)
                }
              >
                Announcements
              </Link>


              {
                user?.role ===
                  'ADMIN' && (

                  <>
                    <Link
                      to='/admin'
                      onClick={() =>
                        setOpen(false)
                      }
                    >
                      Admin
                    </Link>

                    <Link
                      to='/audit-logs'
                      onClick={() =>
                        setOpen(false)
                      }
                    >
                      Audit Logs
                    </Link>
                  </>
                )
              }


              <button
                onClick={logout}
                className='bg-black px-4 py-2 rounded-lg w-fit'
              >
                Logout
              </button>

            </div>
          )
        }

      </div>

    </nav>
  )
}