import {
  useEffect,
} from 'react'

import {
  useNavigate,
} from 'react-router-dom'

import Navbar from '../components/Navbar'

import LeaveForm from '../components/LeaveForm'

import CalendarComponent from '../components/CalendarComponent'

export default function Dashboard() {

  const navigate = useNavigate()


  useEffect(() => {

    const token =
      localStorage.getItem('token')

    if (!token) {

      navigate('/login')
    }

  }, [])


  return (

    <>
    
      <Navbar />

      <div className='min-h-screen p-6 bg-gray-100'>

        <h1 className='text-3xl font-bold mb-6'>
          Dashboard
        </h1>


        {/* ANALYTICS CARDS */}

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>

          <div className='bg-blue-500 text-white p-4 rounded shadow'>

            <h2 className='text-lg'>
              Total Leaves
            </h2>

            <p className='text-3xl font-bold'>
              12
            </p>

          </div>


          <div className='bg-green-500 text-white p-4 rounded shadow'>

            <h2 className='text-lg'>
              Approved Leaves
            </h2>

            <p className='text-3xl font-bold'>
              8
            </p>

          </div>


          <div className='bg-yellow-500 text-white p-4 rounded shadow'>

            <h2 className='text-lg'>
              Pending Leaves
            </h2>

            <p className='text-3xl font-bold'>
              4
            </p>

          </div>

        </div>



        {/* MAIN GRID */}

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

          {/* LEAVE FORM */}

          <div className='bg-white p-4 rounded shadow'>

            <h2 className='text-xl font-semibold mb-4'>
              Apply Leave
            </h2>

            <LeaveForm />

          </div>



          {/* CALENDAR */}

          <div className='lg:col-span-2 bg-white p-4 rounded shadow'>

            <CalendarComponent />

          </div>

        </div>

      </div>

    </>
  )
}