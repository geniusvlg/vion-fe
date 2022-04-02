import React,{useState, useEffect,useContext} from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Banner from '../components/Banner'
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
  useEffect(() => {
    axios.post('http://localhost:60000/api_public/list/product', {
      number: query.pageSize || 9,
      page: query.page || 0,
      // ...{filter: (strFilter ? strFilter : '')}
    }).then(res => {
      setDataProduct(res.data.result)
    })
  }, []);
    return (
      <Container>
      <div style={{paddingTop:'1.25rem'}}>
      <section className="home" id="home">
        <div className="box-container">
          <Sidebar/>
          <Banner/>
        </div>
      </section>
      {/*product section start*/}
      <section className="product">
          <div className="heading">
              <h2>Top savers to day <span>20% off</span></h2>
              <a href="#">view all</a>
        </div>
        <div className='box-container'>
        {dataProduct.map((item,index)=>(
          <Card data={item} key={index}/>))}
        </div>
      </section>
      <div className="col-12 pb-1">
                        <nav aria-label="Page navigation">
                          <ul className="pagination justify-content-center mb-3">
                            <li className="page-item disabled">
                              <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                              </a>
                            </li>
                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                              <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
      </div>
      {/* last product section ends   */}
      </div>
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

