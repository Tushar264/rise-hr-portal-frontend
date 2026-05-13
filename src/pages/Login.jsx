import { GoogleLogin }
  from '@react-oauth/google'

import api from '../services/api'

import { useNavigate }
  from 'react-router-dom'

import logo
  from '../assets/rise-logo.png'

export default function Login() {

  const navigate =
    useNavigate()


  const handleSuccess =
    async (credentialResponse) => {

      try {

        const res =
          await api.post(

            '/auth/google',

            {
              token:
                credentialResponse.credential,
            }
          )


        localStorage.setItem(

          'token',

          res.data.token
        )


        localStorage.setItem(

          'user',

          JSON.stringify(
            res.data.user
          )
        )


        navigate('/')

      } catch (error) {

        console.log(error)

        alert(
          'Access denied'
        )
      }
  }



  return (

    <div className='min-h-screen flex items-center justify-center bg-[var(--rise-light)]'>

      <div className='bg-white p-8 rounded-xl shadow-md w-[400px]'>

        <img
          src={logo}
          alt='RISE'
          className='h-20 mx-auto mb-6'
        />

        <h1 className='text-3xl font-bold mb-6 text-center'>

          RISE HR Portal

        </h1>


        <div className='flex justify-center'>

          <GoogleLogin

            onSuccess={
              handleSuccess
            }

            onError={() =>
              console.log(
                'Login Failed'
              )
            }
          />

        </div>

      </div>

    </div>
  )
}