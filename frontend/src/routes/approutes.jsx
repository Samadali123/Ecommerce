
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
import AddProduct from '../components/addProducts.jsx';
import ForgotPassword from '../components/forgotpassword.jsx';
import UpdatePassword from '../components/updatePassword.jsx'
import ResetPassword from '../components/resetpassword.jsx';
import ProductsPage from '../components/productsPage.jsx';
import Productsforuser from '../components/productsforuser.jsx';
import Updateproduct from '../components/updateproduct.jsx';
import Reg from '../components/reg.jsx';
import Shop from '../components/reg.jsx';



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
            <Route path='/addproducts' element={<AddProduct/>}></Route>
            <Route path='/updatepassword/:token' element={<UpdatePassword/>}></Route>
            <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
            <Route path='/resetpassword' element={<ResetPassword/>}></Route>
            <Route path='/products' element={<ProductsPage/>}></Route>
            <Route path='/productsforuser' element={<Productsforuser/>}></Route>
            <Route path='/updateproduct/:productId' element={<Updateproduct/>}></Route>
            <Route path='/reg' element={<Shop/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>    
            </Routes>    
    )
}


export default routes