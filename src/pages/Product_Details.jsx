import React, { useState, useMemo } from 'react'
import styled from "styled-components"
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import Description from '../components/Description'
import axios from 'axios';
const Container = styled.div``;

const Product_Details = (props) => {
  const [data, setProduct] = useState([])

  useMemo(async () => {
   await axios.get('http://localhost:60000/api_public/getProductByUid/'+ props.match.params.uid).then(res => {
      setProduct(res.data.result[0])
    })
  }, []);
  return (
    <Container>
      <div>
      <section className="home" id="home">
          <div className="box-container">
            <Sidebar/>
            <Description product={data}/>
          </div>
        </section>

        {/*product section start*/}

        {/* last product section ends   */}
      </div>

      <Footer />
    </Container>
  );
};

export default Product_Details
