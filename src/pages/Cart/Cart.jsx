import React,{useState,useEffect,useMemo,useContext}  from 'react'
import { AuthContext } from '../../context/AuthContext'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import axios from 'axios'
import './Cart.css' 
import Show from '../../components/Show'
import {Navigate} from 'react-router-dom';
import { m } from 'framer-motion'
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
  let context=useContext(AuthContext)
  let shipping=5000
  const [tam,setTam] = useState([]);
  const [total,setTotal]=useState(0)
  useMemo(async () => {
      let acsess=context.authTokens.acsessToken
      let user_name=context.user.Infouser[0]?.customer_name
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
     context.setSoluong(data.Check[0]?.cart_items.length)
      setTam(data.Check[0]?.cart_items)
      var x=0
      for(var i=0;i<data.Check[0]?.cart_items.length;i++)
      {
      x=x+data.Check[0]?.cart_items[i].iproduct.pricing.price_with_vat*data.Check[0]?.cart_items[i].quantity
      }
      setTotal(x)
   }, []);
   
  if(context.flag)
  {
    return <Navigate to="/Checkout"/>
  }
    return (
      <> 
    {context.soluongSP > 0? (
      <>
    <section id="blog-home" className="pt-5 mt-5 container">
        <h2 className="font-weight-bold pt-5">Shopping Cart</h2>
        <hr />
     </section>
    <div className="container-fluid pt-5">
        <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
                <table className="table table-bordered text-center mb-0">
                    <thead className="bg-secondary text-dark">
                        <tr>
                            <th>Products</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody className="align-middle">
                          {tam?.map((item,index)=>(
                          <Show data={item} key={index} setTam={setTam}  setTotal={setTotal}/>
                            ))}            
                    </tbody>
                </table>
            </div>
            <div className="col-lg-4">
                <form className="mb-5" action="">
                    <div className="input-group">
                        <input type="text" className="form-control p-4" placeholder="Coupon Code"/>
                        <div className="input-group-append">
                            <button className="btn btn-primary">Apply Coupon</button>
                        </div>
                    </div>
                </form>
                <div className="card border-secondary mb-5">
                    <div className="card-header bg-secondary border-0">
                        <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
                    </div>
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-3 pt-1">
                            <h6 className="font-weight-medium">Subtotal</h6>
                            <h6 className="font-weight-medium">{total}</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6 className="font-weight-medium">Shipping</h6>
                            <h6 className="font-weight-medium">{shipping}</h6>
                        </div>
                    </div>
                    <div className="card-footer border-secondary bg-transparent">
                        <div className="d-flex justify-content-between mt-2">
                            <h5 className="font-weight-bold">Total</h5>
                            <h5 className="font-weight-bold">{total+shipping}</h5>
                        </div>
                        <button className="btn btn-block btn-primary my-3 py-3" onClick={context.billAdd}>Proceed To Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
   </>                      
    ):(
    <div>
    <section id="blog-home" className="pt-5 mt-5 container">
      <h2 className="font-weight-bold pt-5">Shopping Cart</h2>
      <hr />
      <h3 className="font-weight-light pt-5">Rất tiếc, bạn chưa có sản phẩm nào cả</h3>
    </section>
     </div>
  )}
      </>
    );
}

export default Cart
