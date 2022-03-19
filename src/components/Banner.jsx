import React,{useState,useEffect} from 'react'
import '../css/App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


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
/*
 <div id="headerCarousel" className="carousel slide" data-ride="carousel">
  
        <div className='carousel-inner'>
        {
      data?.map((item) => (
        <>
            <div className='carousel-item active' style={{height:"410px"}} key={item.uid}>
                <div className='carousel-caption d-flex flex-column align-items-center justify-content-center'>
                  <img src={item.img} alt="" />
                </div>
            </div>

            <a className="carousel-control-prev" href="#headerCarousel" role="button" data-slide="prev">
                <div className="btn btn-dark" style={{width: "45px", height: "45px"}}>
                    <span className="carousel-control-prev-icon mb-n2"></span>
                </div>
            </a>
                
            <a class="carousel-control-next" href="#headerCarousel" role="button" data-slide="next">
                <div className="btn btn-dark" style={{width: "45px", height: "45px"}}>
                    <span className="carousel-control-next-icon mb-n2"></span>
                </div>
            </a>
        </>
            ))}
        </div>

    </div>      
*/