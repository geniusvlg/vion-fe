import React,{useState,useEffect} from 'react'
import logo from "../assets/images/banner.png";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import * as Constants from '../constants'

function Imagelider(){
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
  return(
    <Carousel>{
      data?.map((item) => (
                <Carousel.Item interval={1000} key={item.uid}>
                <img src={item.img}/>
                </Carousel.Item>
      ))}
      </Carousel>
  )
}
export default Imagelider

/*export default class ImageSlider extends React.Component {
  state = {
  persons: []
  }
  componentDidMount() {
  axios.get(`http://localhost:3000/products`)
  .then(res => {
  const persons = res.data;
  this.setState({ persons });
  })
  }// react hook <=
  render() {
  return (
    <Carousel>{
      this.state.persons.map((item) => (
                <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100"
                  src={item.url}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>{item.header}</h3>
                  <p>{item.para}</p>
                </Carousel.Caption>
                </Carousel.Item>
      ))}
      </Carousel>
  )
  }
 }*/
