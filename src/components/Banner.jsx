import React,{useState,useEffect} from 'react'
import '../css/App.css';
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
      <div id="headerCarousel" className="carousel slide" data-ride="carousel">
        <div className='carousel-inner'>
            {
              data?.map((item) => (
                <>
            <div className={item.title} style={{height:"410px"}}>
         
                <img src={item.img} alt="Image-1" className='img-fluid'/>
                <div className='carousel-caption d-flex flex-column align-items-center justify-content-center'>
                    <div className='p-3' style={{maxWidth:"700px"}}>
                        <h4 className="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
                        <h3 className="display-4 text-white font-weight-bold mb-4">Organic Food</h3>
                        <a href="" className="btn btn-light py-2 px-3">{item.header}</a>
                    </div>
                </div>
              
            </div>
            </>
                ))}
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

        </div>
    </div> 
      
     
    )
}

export default Banner