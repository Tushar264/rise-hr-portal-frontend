import React from 'react'

import ReactDOM
  from 'react-dom/client'

import App from './App.jsx'

import './index.css'

import {
  BrowserRouter,
} from 'react-router-dom'

import { Toaster }
  from 'react-hot-toast'

import {
  GoogleOAuthProvider,
} from '@react-oauth/google'


ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <React.StrictMode>

    <GoogleOAuthProvider

      clientId='83355665134-qt1qt4g74uni2t0oc6jpksoaqgr2kni7.apps.googleusercontent.com'

    >

      <BrowserRouter>

        <Toaster />

        <App />

      </BrowserRouter>

    </GoogleOAuthProvider>

  </React.StrictMode>
)