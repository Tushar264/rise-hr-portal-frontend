import {
  useEffect,
  useState,
} from 'react'

import {
  useNavigate,
} from 'react-router-dom'

import Navbar
  from '../components/Navbar'

import api
  from '../services/api'

export default function AdminDashboard() {

  const navigate =
    useNavigate()

  const [leaves, setLeaves] =
    useState([])


  useEffect(() => {

    const user =
      JSON.parse(
        localStorage.getItem('user')
      )

    if (
      user?.role !== 'ADMIN'
    ) {

      navigate('/')
    }

    fetchPendingLeaves()

  }, [])



  const fetchPendingLeaves =
    async () => {

      try {

        const token =
          localStorage.getItem('token')

        const res =
          await api.get(
            '/leave/pending',
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          )

        setLeaves(res.data)

      } catch (error) {

        console.log(error)
      }
  }



  const approveLeave =
    async (id) => {

      try {

        const token =
          localStorage.getItem('token')

        await api.put(

          `/leave/approve/${id}`,

          {},

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

        fetchPendingLeaves()

      } catch (error) {

        console.log(error)
      }
  }



  const rejectLeave =
    async (id) => {

      try {

        const token =
          localStorage.getItem('token')

        const reason =
          prompt(
            'Enter rejection reason'
          )

        if (!reason) return

        await api.put(

          `/leave/reject/${id}`,

          { reason },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

        fetchPendingLeaves()

      } catch (error) {

        console.log(error)
      }
  }



  return (

    <>
      <Navbar />

      <div className='min-h-screen bg-[var(--rise-cream)] p-6'>

        <h1 className='text-3xl font-bold mb-6'>

          Admin Dashboard

        </h1>


        <div className='space-y-4'>

          {
            leaves.map((leave) => (

              <div
                key={leave._id}
                className='bg-white p-6 rounded-xl shadow-md'
              >

                <h2 className='text-xl font-semibold mb-2'>

                  {
                    leave.userEmail
                  }

                </h2>

                <p>
                  <strong>
                    Type:
                  </strong>
                  {' '}
                  {leave.leaveType}
                </p>

                <p>
                  <strong>
                    From:
                  </strong>
                  {' '}
                  {
                    new Date(
                      leave.startDate
                    ).toLocaleDateString()
                  }
                </p>

                <p>
                  <strong>
                    To:
                  </strong>
                  {' '}
                  {
                    new Date(
                      leave.endDate
                    ).toLocaleDateString()
                  }
                </p>

                <p>
                  <strong>
                    Reason:
                  </strong>
                  {' '}
                  {leave.reason}
                </p>

                <p>
                  <strong>
                    Deducted Days:
                  </strong>
                  {' '}
                  {
                    leave.deductedDays
                  }
                </p>


                <div className='flex gap-4 mt-4'>

                  <button
                    onClick={() =>
                      approveLeave(
                        leave._id
                      )
                    }
                    className='bg-[var(--rise-primary)] text-white px-4 py-2 rounded-lg hover:opacity-90 transition'
                  >
                    Approve
                  </button>


                  <button
                    onClick={() =>
                      rejectLeave(
                        leave._id
                      )
                    }
                    className='bg-[var(--rise-black)] text-white px-4 py-2 rounded-lg hover:opacity-90 transition'
                  >
                    Reject
                  </button>

                </div>

              </div>
            ))
          }

        </div>

      </div>
    </>
  )
}