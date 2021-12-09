// eslint-disable-next-line
import React from 'react'
import { Container,Row,Col,Tabs,Tab, } from 'react-bootstrap-v5'
import ImageSlider from '../components/ImageSlider'
import Sidebar from '../components/Sidebar'
import '../css/Home.css'
import Cards from '../components/Cards'
const Home = () => {
  return (
    
<Container>
  <Row>
    <Col sm={4}>
      <Sidebar/>
    </Col>
    <Col sm={8} >
      <ImageSlider/>
      <Row className='main1'>
          <Col sm={4}>
            <h5 className='title'>DANH MỤC</h5>
          </Col>
          
          <Col sm={8} > 
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                      <Tab eventKey="home" title="Home">
                      {/* <Sonnet /> */}
                      </Tab>
                      <Tab eventKey="profile" title="Profile">
                      {/* <Sonnet /> */}
                      </Tab>
                      <Tab eventKey="contact" title="Contact" >
                      {/* <Sonnet /> */}
                      </Tab>      
                      <Tab eventKey="contact" title="Contact" >
                      {/* <Sonnet /> */}
                      </Tab>          
                </Tabs>
          </Col>

          <Cards/>

      </Row>

    </Col>
  </Row>
</Container>
  )
}

export default Home
/*<div class="row row-cols-1 row-cols-md-2 g-4">
  <div class="col">
    <div class="card">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
</div>*/

