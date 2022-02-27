import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {
    BrowserRouter,
    Routes,
    Route
  } from 'react-router-dom';
import Path from '../routes/Path'

const Layout = () => {
    return (
        <BrowserRouter>
            <Header/>
                <Path render={props=>(
                    <div>
                        <div className="container">
                            <Routes/>
                        </div>
                    </div>
                )}
                />
            <Footer/>
        </BrowserRouter>
    )
}

export default Layout
