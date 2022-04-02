import React, { useState, useMemo } from 'react'
import styled from "styled-components"
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Description from '../components/Description'
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios'
import { useParams } from 'react-router-dom';
const Container = styled.div``;

const Product_Details = (props) => {
  const params = useParams();
  const [data2, setProduct2] = useState([])
  useMemo(async () => {
    await axios.get('http://localhost:60000/api_public/getProductByUid/'+ params.uid).then(res => {
       setProduct2(res.data.result)
     })
   }, []);
  return (
    <Container>
    <div>
    <section className="home" id="home">
          {data2.map((item,index)=>(
           <Description product={item} key={index}/>))}
    </section>

      {/*product section start*/}

      {/* last product section ends   */}
      </div>

  </Container>
  );
};

export default Product_Details
