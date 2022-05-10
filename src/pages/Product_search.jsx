import React,{useState, useEffect, useMemo} from 'react'
import { useParams } from 'react-router-dom';

import Card from '../components/Cards'
import axios from 'axios'

const Product_search = () => {
    const params = useParams();
    const [dataProduct, setDataProduct] = useState([])
    const[data,setData]=useState([]);

     useEffect(()=>{
      fetchData()
    },[]);
  const fetchData= async () => {
      //Call GraphQl API
     const response = await axios.get('http://localhost:60000/api_public/list/categories');
     //Update component state
     const result= response.data?.data ?? [];
     setData(result)
   };
   useMemo(async () => {
    let title=params.uid
    let config ={
      headers:{
          "Content-type":"application/json"
      }
    }
    let data1=  await axios.post('http://localhost:60000/api_public/searchproduct/',{
      title
   },
   config)
   console.log("data1:",data1)
   setDataProduct(data1.data)
  },[]);

  return (
    <>
      <br></br>
      <br></br>
    <div className='container-fluid pt-5'>
      <div className='row px-xl-5'>
        {/* Shop Sidebar start */}
        <div className='col-lg-3 col-md-12'>
          {/* Filter by Catergories start */}
          <br></br>
          <br></br>
          <div className='border-bottom mb-4 pb-4'>
            <h5 className='font-weight-semi-bold mb-4'>Lọc bởi danh mục</h5>
            <form>
            {data?.map((item,index)=>(   
              <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3' key={index}>
                 <a key={index} href={`/product/${item.uid}`} >{item.cate_name}</a>
              </div>
                  ))}
            </form>
          </div>
        </div>

        {/* Shop Product Start */}
        <div className='col-lg-9 col-md-12'>
          <div className='row pb-3'>
          {dataProduct.statusCode == 200 ? (
                 <>
            <div className='col-12 pb-1'>
              <div className='d-flex align-items-center justify-content-between mb-4'>
                <form action="">
                  <div className='input-group'>
                  </div>
                </form>
                <div className='dropdown ml-4'>
                  <button className='btn border dropdown-toggle' type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tìm kiếm</button>
                  <div className='dropdown-menu dropdown-menu-right' aria-labelledby="triggerId">
                    <a className="dropdown-item" href="#">Mới Nhất</a>
                    <a className="dropdown-item" href="#">Phổ Biến</a>
                    <a className="dropdown-item" href="#">Đánh Giá Cao Nhất</a>
                  </div>
                </div>
              </div>
            </div>
          
                  {dataProduct.result?.map((item,index)=>(
                    <Card data={item} key={index}/>
                  ))}
                  </>
            ) : (
              <>
                  <h1>{dataProduct.message}</h1>
              </>
            ) }
             

          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Product_search