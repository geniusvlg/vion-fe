import React,{useState,useEffect} from 'react'
import '../css/Card.css'
import axios from 'axios';
function Cards () {
  const[data,setData]=useState([]);
  useEffect(()=>{
    const fetchData= async () => {
       //Call GraphQl API
      const response = await axios.get('http://localhost:60000/api_public/list/panigate');
      //Update component state
      const result= response.data?.data ?? [];
      setData(result)
    };
    fetchData();
  },[]);
  return (
    <>{
      data?.map((product) => (     
      
      <div className="card">
        <a href={`/catalog/${product.uid}`}>
          <div className="card-header">
              <div className="card-title-group">
                    <h5 className="card-title">{product.product_name}</h5>
              </div>
          </div>
          <img className="card-image" src={product.image_cover} alt="Logo" width="100%"/>
          <div className="card-price">{product.sell_price} </div>
          <div className="card-btnr"></div> 
         </a>
         <button class="button button2">Chọn mua</button>
      </div>
      ))}
    </>
  )
}

export default Cards


/*import React from 'react'
import axios from 'axios';
import '../css/Card.css'
export default class ImageSlider extends React.Component {
  state = {
    teh: []
    }
    componentDidMount() {
    axios.get(`http://localhost:3000/superpro`)
    .then(res => {
    const teh = res.data;
    this.setState({ teh });
    })
    }// react hook <=
    render() {
      return (
        <>{
          this.state.teh.map((item) => (
            <div className="card">
          <div className="card-header">
            <div className="card-title-group">
          <h5 className="card-title">{item.header}</h5>
          </div>
          </div><img className="card-image" src={item.url} alt="Logo" /><div className="card-price">{item.para}</div><div className="card-btnr">
          </div>
          <button class="button button2">Chọn mua</button>
          </div>
          ))}
        </>
      )
  }
}*/



