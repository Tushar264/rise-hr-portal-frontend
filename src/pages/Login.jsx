import { useState } from 'react'

import api from '../services/api'

import { useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] =
    useState('')

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const res =
        await api.post(
          '/auth/login',
          { email }
        )

      localStorage.setItem(
        'token',
        res.data.token
      )

      localStorage.setItem(
        'user',
        JSON.stringify(res.data.user)
      )

      navigate('/')

    } catch (error) {

      alert('Login failed')
    }
  }

  return (

    <div className='min-h-screen flex items-center justify-center bg-gray-100'>

      <form
        onSubmit={handleLogin}
        className='bg-white p-6 rounded shadow w-96'
      >

        <h1 className='text-2xl font-bold mb-4'>
          Login
        </h1>

        <input
          type='email'
          placeholder='Enter email'
          className='w-full border p-2 rounded mb-4'
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button
          className='w-full bg-black text-white py-2 rounded'
        >
          Login
        </button>

      </form>

    </div>
  )
}