
import React from 'react'
import { Outlet, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from '../components/home'
// import Home from  '../components/home2.jsx'
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


import SingleProduct from '../components/SingleProduct.jsx';
import ViewCart from '../components/viewcart.jsx';
import Orders from '../components/Orders.jsx';
import Customers from '../components/customers.jsx';
import Reports from '../components/Reports.jsx';
import Search from '../components/Search.jsx';
import Wishlist from '../components/wishlist.jsx';
import Productsfortest from '../components/Productsfortest.jsx';



const routes = () => {
    return (
        <>
        <div  className='bg-grid'></div>
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
            <Route path='/singleproduct/:id' element={<SingleProduct/>}></Route>
            <Route path='/viewcart' element={<ViewCart/>}></Route>
            <Route path='/orders' element={<Orders/>}></Route>
            <Route path='/customers' element={<Customers/>}></Route>
            <Route path='/reports' element={<Reports/>}></Route>
            <Route path='/search' element={<Search/>}></Route>
            <Route path='/wishlist' element={<Wishlist/>}></Route>
            <Route path='/test' element={<Productsfortest/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>    
            </Routes>   
            </>
    )
}


export default routes