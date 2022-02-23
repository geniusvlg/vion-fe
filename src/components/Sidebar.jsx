import React from 'react'
import '../css/App.css';
import { Category } from '../assets/fake-data/data'


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
  <div className="left-col">
    <h2 className="title">Danh mục sản phẩm</h2>
    <div className="box">
      {data?.map((item,index)=>(
      <a href="#"key={index}><img src=''/><p>{item.cate_name}</p><span>{item.number_of_products}</span></a>
      ))}
    </div>
  </div>
    )
}

export default Sidebar