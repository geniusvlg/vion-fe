import React from 'react'
import styled from "styled-components"
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import Description from '../components/Description'

const Container = styled.div``;

const Product_Details = () => {
  return (
    <Container>
      <div>
      <section className="home" id="home">
          <div className="box-container">
            <Sidebar/>
            <Description/>
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
