import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route
  } from 'react-router-dom';
import Home from '../pages/Home'
import Cart from '../pages/Cart/Cart'
import Product_List from '../pages/Product_List'
import Product_Details from '../pages/Product_Details'
import Product_search from '../pages/Product_search'
import SignInForm from '../pages/SignInForm/SignInForm'
import SignUpForm from '../pages/SignUpForm/SignUpForm'
import ForgotPassword from '../pages/SignInForm/ForgotPassword'
import Userprofile from '../pages/Userprofile/UserProfile'
import PrivateRoutes from './PrivateRoutes';
import Checkout from '../pages/CheckoutPage/Checkout';
import ResetPassword from '../pages/Userprofile/ResetPassword';
import UpdateInfo from '../pages/Userprofile/UpdateInfo';
import Numbersign from '../pages/SignUpForm/Numbersign'
import Layout_Details from '../pages/Layout_Details';
function Path() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/product/:uid' element={<Product_List/>}/>
            <Route path='/product_details/:uid' element={<Product_Details/>}/>
            
            <Route path='/product_search/:uid' element={<Product_search/>}/>
            <Route path='/Checkout' element={
                 <PrivateRoutes>
                     <Checkout/>
                 </PrivateRoutes>
            }/>
            <Route path='/userprofile' 
            element={ 
                <PrivateRoutes>
                    <Userprofile/>
                </PrivateRoutes>}/>


            <Route path='/resetpassword' 
            element={ 
                <PrivateRoutes>
                    <ResetPassword/>
                </PrivateRoutes>}/>    

            <Route path='/updateinfo' 
            element={ 
                <PrivateRoutes>
                    <UpdateInfo/>
                </PrivateRoutes>}/>    
                <Route path='/phonesign' element={<Numbersign/>}/>
            <Route path='/signIn' element={<SignInForm/>}/>
            <Route path='/signUp' element={<SignUpForm/>}/>
            <Route path='/forgot' element={<ForgotPassword/>}/>

            <Route path='/layout_detail/:uid' element={<Layout_Details/>}/>
            <Route path='/cart' 
            element={
                <PrivateRoutes>
                    <Cart/>
                </PrivateRoutes>
            }
            />
        </Routes>
    )
}

export default Path
