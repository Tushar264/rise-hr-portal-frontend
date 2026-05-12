import {
  useEffect,
  useState,
} from 'react'

import { useNavigate }
  from 'react-router-dom'

import Navbar
  from '../components/Navbar'

import LeaveForm
  from '../components/LeaveForm'

import CalendarComponent
  from '../components/CalendarComponent'

import api
  from '../services/api'

export default function Dashboard() {

  const navigate =
    useNavigate()

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

      <div className='min-h-screen p-6 bg-[var(--rise-cream)]'>


        {
          balance && (

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>

              <div className='bg-[var(--rise-primary)] text-[var(--rise-white)] p-6 rounded-xl shadow-md'>

                <h2 className='text-lg font-semibold'>
                  PTO Balance
                </h2>

                <p className='text-4xl font-bold mt-2'>
                  {
                    balance.PTO.remaining
                  }
                </p>

              </div>


              <div className='bg-[var(--rise-black)] text-[var(--rise-white)] p-6 rounded-xl shadow-md'>

                <h2 className='text-lg font-semibold'>
                  WFH Balance
                </h2>

                <p className='text-4xl font-bold mt-2'>
                  {
                    balance.WFH.remaining
                  }
                </p>

              </div>

            </div>
          )
        }



        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

          <div className='bg-white p-6 rounded-xl shadow-md'>

            <h2 className='text-2xl font-bold mb-4'>
              Apply Leave
            </h2>

            <LeaveForm />

          </div>


          <div className='lg:col-span-2 bg-white p-6 rounded-xl shadow-md'>

            <CalendarComponent />

          </div>

        </div>

      </div>
    </>
  )
}