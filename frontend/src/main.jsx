import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {UserProvider} from './contexts/usercontext.jsx'
import {AdminProvider} from './contexts/admincontext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(

        <BrowserRouter>
         <AdminProvider>
         <UserProvider>
         <GoogleOAuthProvider clientId="384526822588-b01d49slfpl9vlu7sqgiui4gqmf2ibc3.apps.googleusercontent.com">
         <App />
        </GoogleOAuthProvider>       
         </UserProvider>
         </AdminProvider>
         <ToastContainer/>
        </BrowserRouter>
)