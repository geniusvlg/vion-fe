import React,{useState,useEffect} from 'react'
import '../css/App.css';
import axios from 'axios';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


const Sidebar = () => {
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
    return (
  <div>
    <h2 className="title">Danh mục sản phẩm</h2>
      {data?.map((item,index)=>(
            <div className="left-col-1">
            <div className="box">
            <div className="check">
           <ArrowRightIcon/>
          <a href="#"key={index}>{item.cate_name}</a>
          </div>
        </div>
      </div>
      ))}
  </div>
    )
}

export default Sidebar