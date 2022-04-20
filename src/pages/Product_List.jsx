import React,{useState, useEffect,useContext, useMemo} from 'react'
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Card from '../components/Cards'
import axios from 'axios'
const PProduct = styled.div`
display: flex;
max-width: inherit;
`;
const Product_List = (query) => {  
  const params = useParams();
  const [dataProduct, setDataProduct] = useState([])
  const [sp1, setSp1] = useState(null)
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
  axios.get('http://localhost:60000/api_public/getcatproduct/'+ params.uid).then(res => {
    console.log("data:",res.data.data)
   setDataProduct(res.data.data)
 })
 }, []);





    return (
      <div className='container-fluid pt-5'>
      <div className='row px-xl-5'>
        {/* Shop Sidebar start */}
        <div className='col-lg-3 col-md-12'>
          {/* Filter by Catergories start */}
          <div className='border-bottom mb-4 pb-4'>
            <h5 className='font-weight-semi-bold mb-4'>Lọc bởi danh mục</h5>
            <form>
            {data?.map((item,index)=>(   
              <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                 <a key={index} href={`/product/${item.uid}`} >{item.cate_name}</a>
              </div>
                  ))}
            </form>
          </div>
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
                  <button className='btn border dropdown-toggle' type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tìm kiếm</button>
                  <div className='dropdown-menu dropdown-menu-right' aria-labelledby="triggerId">
                    <a className="dropdown-item" href="#">Mới Nhất</a>
                    <a className="dropdown-item" href="#">Phổ Biến</a>
                    <a className="dropdown-item" href="#">Đánh Giá Cao Nhất</a>
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
    </div>
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