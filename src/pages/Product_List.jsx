import React,{useState, useEffect, useMemo} from 'react'
import { useParams } from 'react-router-dom';

import Card from '../components/Cards'
import axios from 'axios'

const Product_List = () => {  
  const params = useParams();
  const [dataProduct, setDataProduct] = useState([])

  const[data,setData]=useState([]);
  useEffect(()=>{
    fetchData()
  },[]);
  const fetchData= async () => {
    //Call GraphQl API
   const response = await axios.get(`${process.env.REACT_APP_HOST_URL}/api_public/list/categories`);
   //Update component state
   const result= response.data?.data ?? [];
   setData(result)
 };
 

 useMemo(async () => {
  axios.get(`${process.env.REACT_APP_HOST_URL}/api_public/getcatproduct/`+ params.uid).then(res => {
   setDataProduct(res.data.data)
 })
 },[params.uid]);
 const handleId = (e) => {
  if(e.target.id=="high")
  {
   dataProduct.sort((a, b) => {
     let fa = a.pricing.price_with_vat
     let  fb = b.pricing.price_with_vat
   return fb - fa
   })
  }
  else 
  {
   dataProduct.sort((a, b) => {
     let fa = a.pricing.price_with_vat
     let  fb = b.pricing.price_with_vat
   return fa - fb
   })
  }
}
    return (
      <>
      <br></br>
      <br></br>
      <div className='container-fluid pt-5'>
      <div className='row px-xl-5'>
        {/* Shop Sidebar start */}
        <div className='col-lg-3 col-md-12'>
          {/* Filter by Catergories start */}
          <a className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" href="#navbar-vertical" style={{height: "65px",  marginTop: "-1px", padding: "0 30px"}}>
                    <h6 className="m-0">Danh mục sản phẩm</h6>
                </a>
                <nav className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 sticky-top" id="navbar-vertical">
                    <div className="navbar-nav w-100 overflow-hidden" style={{height: "410px"}}>
                    {data?.map((item,index)=>(
                        <div className="nav-item dropdown" key={index}>
                        <a  className="nav-link" data-toggle="dropdown" id={item.uid} key={index}>{item.cate_name}</a>
                            <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                            {item?.sub_cate.map((item1,index)=>(
                              <>
                                <a href={`/product/${item1.uid}`}  className="dropdown-item" key={index}>{item1.cate_name}</a>
                                </>
                            ))}
                            </div>
                        </div>
                        
))}
                    </div>
                </nav>
        </div>

        {/* Shop Product Start */}
        <div className='col-lg-9 col-md-12'>
          <div className='row pb-3'>
            <div className='col-12 pb-1'>
              <div className='d-flex align-items-center justify-content-between mb-4'>
                <form action="">
                  <div className='input-group'>
                  </div>
                </form>
                <div className='dropdown ml-4'>
                  <button className='btn border dropdown-toggle' type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Lọc</button>
                  <div className='dropdown-menu dropdown-menu-right' aria-labelledby="triggerId">
                  <a className="dropdown-item" id='high' onClick={(e)=>handleId(e)} href="#">Giá cao nhất </a>
                    <a className="dropdown-item" id='low' onClick={(e)=>handleId(e)} href="#">Giá thấp nhất</a>
                  </div>
                </div>
              </div>
            </div>
                 {dataProduct.map((item,index)=>(
                    <Card data={item} key={index}/>
                  ))}

          </div>
        </div>
      </div>
    </div></>
    )
}

export default Product_List
/*
  <div className='container-fluid pt-5'>
      <br></br>
      <section className="shop-product home">
      <div className="box-container">

        <div className="left-col">
          <h2 className="title">Danh mục sản phẩm</h2>
            {data?.map((item,index)=>(
              <div className="left-col-1">
              <div className="box">
              <div className="check">
            <ArrowRightIcon/>
            <a key={index} href={`/product/${item.uid}`} >{item.cate_name}</a>
            </div>
          </div>
            </div>
            ))}
        </div>
        

        <div className="right-col">
              <div className='row'>
                  {dataProduct.map((item,index)=>(
                    <Card data={item} key={index}/>
                  ))}
              </div>
        </div>
      </div>
    </section>
    </div>

*/