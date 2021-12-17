import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Cart from '../pages/Cart'
import Product_List from '../pages/Product_List'
import Product_Details from '../pages/Product_Details'
import SignInForm from '../pages/SignInForm/SignInForm'
import SignUpForm from '../pages/SignUpForm/SignUpForm'
import ForgotPassword from '../pages/SignInForm/ForgotPassword'
const Routes = () => {
    return (
       
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/product' exact component={Product_List}/>
            <Route path='/catalog' exact component={Catalog}/>
            <Route path='/cart' exact component={Cart}/>
            <Route path='/product_details' exact component={Product_Details}/>
            <Route path='/signIn' exact component={SignInForm}/>
            <Route path='/signUp' exact component={SignUpForm}/>
            <Route path='/forgot' exact component={ForgotPassword}/>
        </Switch>
    )
}

export default Routes
