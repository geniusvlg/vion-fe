import React,{useState,useEffect} from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-icons'
import axios from 'axios';
// import * as Icon from 'react-bootstrap-icons'
function Sidebar() {
  const[data,setData]=useState([]);
  useEffect(()=>{
    const fetchData= async () => {
       //Call GraphQl API
      const response = await axios.get('http://localhost:60000/api_public/list/categories');
      //Update component state
      const result= response.data?.data ?? [];
      setData(result)
    };
    fetchData();
  },[]);
    return (
      <div class="dropdown d-grid gap-2">
        <button class="btn btn-secondary btn-lg" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
  <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg>Dropdown button
        </button>
        <ul class="dropdown-menu " aria-labelledby="dropdownMenuButton1">
          {
           data?.map((item) => (
            <li><a class="dropdown-item" href="#">{item.cate_name}</a></li> ))
          }
        </ul>
      </div>
      
    )
}

export default Sidebar
