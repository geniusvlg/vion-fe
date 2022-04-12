import React,{useState, useEffect,useContext} from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import styled from "styled-components";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Card from '../components/Cards'
import axios from 'axios'
const PProduct = styled.div`
display: flex;
max-width: inherit;
`;
const Product_List = (query) => {  
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
 
  // xử lý  query 
 const onClick= (event) => {
  event.preventDefault();
  setSp1(event.target.id )
}

useEffect(() => {
  if(sp1==null)
  {
  axios.post('http://localhost:60000/api_public/list/product', {
    number: query.pageSize || 9,
    page: query.page || 0,
  }).then(res => {  
    setDataProduct(res.data.result)
  })
  }
  else
  {
    let uid=sp1
    axios.post('http://localhost:60000/api_public/getProductByCate',{
      uid
    }).then(res => {  
      console.log("data:",res.data.data)
      setDataProduct(res.data.data)
    })
  }
}, [sp1]);



    return (
      <div className='big-container'>
      <Header/>
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
          <a key={index} id={item.uid} onClick={onClick}>{item.cate_name}</a>
          </div>
        </div>
          </div>
          ))}
        </div>
        {/* ----------- right-col starts -----------  */}
        <div className="right-col">
          <div className="logo">
            <a href="#"><img src="images/shop-1.webp" alt="" /></a>
          </div>
          <div className="right-col-1">
            <div className="icons">
              <GridViewIcon></GridViewIcon>
              <FormatListBulletedIcon></FormatListBulletedIcon>
            </div>
            <div className="select">
              <select>
                <option>Phổ biến nhất</option>
                <option>Đánh giá cao nhất</option>
                <option selected>Mới nhất</option>
                <option>Đắt nhất</option>
                <option>Rẻ nhất</option>
              </select>
            </div>
          </div>
          <div className="right-col-3">
            <section className="product">
              <div className="box-container">
                  {dataProduct.map((item,index)=>(
                    <Card data={item} key={index}/>
                  ))}
              </div>
            </section>
          </div>
          <div className="next-page">
            <div className="page">1</div>
            <div className="page">2</div>
            <div className="page"><ChevronRightIcon></ChevronRightIcon></div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </div>
    )
}

export default Product_List
