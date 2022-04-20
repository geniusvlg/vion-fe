import React,{useState, useEffect,useContext} from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Card from '../components/Cards'
//import '../css/App.css';
import {Product}from '../assets/fake-data/data'
import styled from 'styled-components'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';

const Container = styled.div`
background: #eff7fa;
color: #888;
`

const Home = (query) => {
  const [dataProduct, setDataProduct] = useState([])
 /* useEffect(() => {
    axios.post('http://localhost:60000/api_public/list/product', {
      number: query.pageSize || 9,
      page: query.page || 0,
      // ...{filter: (strFilter ? strFilter : '')}
    }).then(res => {
      setDataProduct(res.data.result)
    })
  }, []);*/
  useEffect(() => {
    axios.get('http://localhost:60000/api_public/homelayout/').then(res => {
      setDataProduct(res.data.result)
    })
  }, []);

    return (
      <>
          <Sidebar/>
      {/*product section start*/}
      {dataProduct?.map((item,index)=>(
        <>
        <hr></hr>
        <div className='container-fluid pt-5' key={index}>
        {item?.section.map((item1,index1)=>(
          <>
                  <br></br>
            <div className="heading">
             <h2 key={index1}>{item1.section_name}<span>20% off</span></h2>
               <a href="#">view all</a>
            </div>
            <br></br>
            <div className='row px-xl-5 pb-3'>
            {item1?.section_ref.map((item2,index2)=>(
              <Card data={item2} key={index2} ></Card>
            ))}
            </div>
          </>
          ))}
        </div>
        <hr></hr>
        </>
       ))}
      {/* last product section ends   */}

      </>
    )
}

export default Home
