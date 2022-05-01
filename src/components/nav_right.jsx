import React,{useState, useEffect,useContext} from 'react'
import Banner from './Banner'
import { AuthContext } from '../context/AuthContext';

const Right_Section = () => {

  return (
    <div className='col-lg-9'>
        <Banner/>
    </div>
  )
}

export default Right_Section