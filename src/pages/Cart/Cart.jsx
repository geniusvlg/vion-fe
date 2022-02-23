import React,{useState,useEffect,useMemo,useContext}  from 'react'
import { AuthContext } from '../../context/AuthContext'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import axios from 'axios'
import './Cart.css'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'

import Show from '../../components/Show'
const Container = styled.div`
`
const Wrapper = styled.div`
padding:20px;
`
const Title = styled.h1`
font-weight:300;
text-align:center;
`

const Top = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
`

const TopButton = styled.button`
padding:10px;
font-weight:600;
cursor:pointer;
border:${(props)=>props.type === "filled" && "none"};
background-color:${(props)=>props.type === "filled" ? "black" : "transparent"};
color:${(props)=> props.type === "filled" && "white"};
`

const TopTexts = styled.div``

const Text = styled.span`
text-decoration:underline;
cursor:pointer;
margin: 0 10px;
`

const Bottom = styled.div`
margin-top: 15px;
display:flex;
align-items:center;
justify-content:space-between;
`

const Info = styled.div`
flex:3`

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const CardLogin = styled.form`
display: flex;
flex-direction: column;
justify-content: space-evenly;
padding: 10px;
`;

const Input = styled.input`
padding: 7px 0;
width: 100%;
font-family: inherit;
font-size: 14px;
border-top: 0;
border-right: 0;
border-bottom: 1px solid #ddd;
border-left: 0;
transition: border-bottom-color 0.25s ease-in;
background-color: #fff;
max-height: 50px;
padding-left: 10px;
border-radius: 35px;
&:focus {
  border-bottom-color: #FFDE59;
  outline: 0;
}
`;

const Cart = () => {

  const [dataProduct, setDataProduct] = useState([])
  const context=useContext(AuthContext)
  let acsess=context.authTokens.acsessToken
  let user_name=context.user.Infouser[0]?.customer_name

  useEffect(() => {
      getCart()
  },[]);
 
  let getCart= async()=>{
    let config ={
      headers:{
          "Content-type":"application/json",
          "authorization": "Bearer "+ acsess
      }
    }
    let {data}= await axios.post('http://localhost:60000/api_public/getCart/',{
      user_name
    },  
    config)
    setDataProduct(data.Check[0]?.cart_items)
  }
  console.log(dataProduct)


    return (
      <>
      <div>
        <section id="blog-home" className="pt-5 mt-5 container">
          <h2 className="font-weight-bold pt-5">Shopping Cart</h2>
          <hr />
        </section>
        <section id="cart-container" className="container my-5">
          <table width="100%">
            <thead>
              <tr>
                <td>Remove</td>
                <td>Image</td>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {dataProduct?.map((item,index)=>(
                  <Show data={item} key={index}/>
                ))}             
            </tbody>
          </table>
        </section>
        <section id="cart-bottom" className="container">
          <div className="row">
            <div className="coupon col-lg-6 col-md-6 col-12 mb-4">
              <div>
                <h5>Coupon</h5>
                <p>Enter the coupon if available</p>
                <input type="text" placeholder="Coupon-code" />
                <button>Apply Coupon</button>
              </div>
            </div>
            <div className="total col-lg-6 col-md-6 col-12">
              <div>
                <h5>Cart Total</h5>
                <div className="d-flex justify-content-between">
                  <h6>Sub-total</h6>
                  <p>$215</p>
                </div>
                <div className="d-flex justify-content-between">
                  <h6>Shipping</h6>
                  <p>$215</p>
                </div>
                <hr className="second-hr" />
                <div className="d-flex justify-content-between">
                  <h6>Total</h6>
                  <p>$215</p>
                </div>
                <button className="ml-auto" >Check out</button>
              </div>
            </div>
          </div>
        </section>
      </div>
</>
    );
}

export default Cart