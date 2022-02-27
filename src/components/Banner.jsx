import React,{useState,useEffect} from 'react'
import '../css/App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';



const Banner = () => {
  const[data,setData]=useState([]);
  useEffect(()=>{
    const fetchData= async () => {
       //Call GraphQl API
      const response = await axios.get('http://localhost:60000/api_public/list/slider');
      //Update component state
      const result= response.data?.data ?? [];
      setData(result)
    };
    fetchData();
  },[]);
    return (   
     <Carousel interval={2000} transitionTime={500}  swipeScrollTolerance={5} infiniteLoop={true} autoPlay={true} autoFocus={true} >
       {
      data?.map((item) => (
        <div  key={item.uid}>
        <img src={item.img} alt="" />
    </div>
      ))}
          
    
      </Carousel>
    )
}

export default Banner
