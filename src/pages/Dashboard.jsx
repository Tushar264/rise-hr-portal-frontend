import {
  useEffect,
  useState,
} from 'react'

import {
  useNavigate,
} from 'react-router-dom'

import api from '../services/api'

import Navbar from '../components/Navbar'

import LeaveForm from '../components/LeaveForm'

import CalendarComponent from '../components/CalendarComponent'


export default function Dashboard() {

  const navigate = useNavigate()

  const [balance, setBalance] =
    useState(null)


  useEffect(() => {

    const token =
      localStorage.getItem('token')

    if (!token) {

      navigate('/login')
    }

    fetchBalance()

  }, [])



  const fetchBalance =
    async () => {

      try {

        const token =
          localStorage.getItem('token')

        const res =
          await api.get(
            '/leave/balance',
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          )

        setBalance(res.data)

      } catch (error) {

        console.log(error)
      }
  }



  return (

    <>
      <Navbar />

      <div className='min-h-screen p-6 bg-gray-100'>

        <h1 className='text-3xl font-bold mb-6'>
          RISE HR Portal
        </h1>



        {/* LEAVE BALANCE */}

        {
          balance && (

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>

              <div className='bg-blue-500 text-white p-4 rounded shadow'>

                <h2 className='text-lg font-semibold'>
                  PTO Balance
                </h2>

                <p className='text-3xl font-bold'>
                  {
                    balance.PTO.remaining
                  }
                </p>

                <p className='mt-2 text-sm'>
                  Used:
                  {' '}
                  {balance.PTO.used}
                  {' / '}
                  {balance.PTO.total}
                </p>

              </div>



              <div className='bg-green-500 text-white p-4 rounded shadow'>

                <h2 className='text-lg font-semibold'>
                  WFH Balance
                </h2>

                <p className='text-3xl font-bold'>
                  {
                    balance.WFH.remaining
                  }
                </p>

                <p className='mt-2 text-sm'>
                  Used:
                  {' '}
                  {balance.WFH.used}
                  {' / '}
                  {balance.WFH.total}
                </p>

              </div>

            </div>
          )
        }



        {/* MAIN CONTENT */}

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