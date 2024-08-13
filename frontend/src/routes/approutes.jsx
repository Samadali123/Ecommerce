
import React from 'react'
import { Outlet, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from '../components/home'
import Register from '../components/register';
import Login from '../components/login';
import Admin from '../components/admin';
import About from '../components/about'
import Contact from '../components/contact'
import NotFound from '../components/NotFoundPage'
import Loginadmin from '../components/loginadmin'
import Registeradmin from '../components/registeradmin';



const routes = () => {
    return (
        
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/admin" element={<Admin/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>    
            <Route path='/loginadmin' element={<Loginadmin/>}></Route>
            <Route path='/registeradmin' element={<Registeradmin/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>    
            </Routes>    
    )
}


export default routes