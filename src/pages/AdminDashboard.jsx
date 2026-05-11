import {
  useEffect,
  useState,
} from 'react'

import {
  useNavigate,
} from 'react-router-dom'

import api from '../services/api'

import Navbar from '../components/Navbar'

export default function AdminDashboard() {

  const navigate = useNavigate()

  const [leaves, setLeaves] =
    useState([])


  useEffect(() => {

    const token =
      localStorage.getItem('token')

    const user =
      JSON.parse(
        localStorage.getItem('user')
      )

    // NOT LOGGED IN
    if (!token) {

      navigate('/login')

      return
    }

    // NOT ADMIN
    if (user?.role !== 'ADMIN') {

      navigate('/')

      return
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

        alert('Leave Approved')

        fetchPendingLeaves()

      } catch (error) {

        console.log(error)

        alert('Approval failed')
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

        alert('Leave Rejected')

        fetchPendingLeaves()

      } catch (error) {

        console.log(error)

        alert('Rejection failed')
      }
  }



  return (

    <>
      <Navbar />

      <div className='min-h-screen bg-gray-100 p-6'>

        <h1 className='text-3xl font-bold mb-6'>
          Admin Dashboard
        </h1>



        {
          leaves.length === 0 ? (

            <div className='bg-white p-6 rounded shadow text-center'>

              <p className='text-gray-600'>
                No pending leave requests
              </p>

            </div>

          ) : (

            <div className='space-y-4'>

              {
                leaves.map((leave) => (

                  <div
                    key={leave._id}
                    className='bg-white p-5 rounded shadow'
                  >

                    <h2 className='text-2xl font-semibold mb-2'>

                      {leave.userId?.name}

                    </h2>


                    <div className='space-y-1 text-gray-700'>

                      <p>

                        <strong>
                          Leave Type:
                        </strong>

                        {' '}

                        {leave.leaveType}

                      </p>


                      <p>

                        <strong>
                          Start Date:
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
                          End Date:
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

                        {leave.deductedDays}

                      </p>

                    </div>



                    <div className='flex gap-4 mt-5'>

                      <button
                        onClick={() =>
                          approveLeave(
                            leave._id
                          )
                        }
                        className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded'
                      >
                        Approve
                      </button>



                      <button
                        onClick={() =>
                          rejectLeave(
                            leave._id
                          )
                        }
                        className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded'
                      >
                        Reject
                      </button>

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>
    </>
  )
}