import {
  useEffect,
  useState,
} from 'react'

import {
  useNavigate,
} from 'react-router-dom'

import api from '../services/api'

import Navbar from '../components/Navbar'

export default function AuditLogs() {

  const navigate = useNavigate()

  const [logs, setLogs] =
    useState([])


  useEffect(() => {

    const token =
      localStorage.getItem('token')

    const user =
      JSON.parse(
        localStorage.getItem('user')
      )

    if (!token) {

      navigate('/login')

      return
    }

    if (user?.role !== 'ADMIN') {

      navigate('/')

      return
    }

    fetchLogs()

  }, [])



  const fetchLogs =
    async () => {

      try {

        const token =
          localStorage.getItem('token')

        const res =
          await api.get(
            '/audit',
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          )

        setLogs(res.data)

      } catch (error) {

        console.log(error)
      }
  }



  return (

    <>

      <Navbar />

      <div className='min-h-screen bg-gray-100 p-6'>

        <h1 className='text-3xl font-bold mb-6'>
          Audit Logs
        </h1>


        <div className='space-y-4'>

          {
            logs.map((log) => (

              <div
                key={log._id}
                className='bg-white p-4 rounded shadow'
              >

                <p>
                  <strong>Actor:</strong>
                  {' '}
                  {log.actorId?.name}
                </p>


                <p>
                  <strong>Action:</strong>
                  {' '}
                  {log.actionType}
                </p>


                <p>
                  <strong>Target:</strong>
                  {' '}
                  {log.target}
                </p>


                <p>
                  <strong>Reason:</strong>
                  {' '}
                  {log.reason || 'N/A'}
                </p>


                <p className='text-sm text-gray-500 mt-2'>

                  {
                    new Date(
                      log.createdAt
                    ).toLocaleString()
                  }

                </p>

              </div>
            ))
          }

        </div>

      </div>

    </>
  )
}