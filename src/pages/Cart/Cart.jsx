import React,{useState,useMemo,useContext}  from 'react'
import { AuthContext } from '../../context/AuthContext'

import axios from 'axios'
import './Cart.css' 
import Show from '../../components/Show'
import {Navigate} from 'react-router-dom';




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
      let {data}= await axios.post(`${process.env.REACT_APP_HOST_URL}/api_public/getCart/`,{
        user_name
      },  
      config)
     context.setSoluong(data.Check[0]?.cart_items.length)
      setTam(data.Check[0]?.cart_items)
      var x=0
      for(var i=0;i<data.Check[0]?.cart_items.length;i++)
      {
        
      x=x+((data.Check[0]?.cart_items[i].iproduct.pricing.price_with_vat-data.Check[0]?.cart_items[i].iproduct.pricing.price_with_vat*data.Check[0]?.cart_items[i].iproduct.pricing.discount/100)*data.Check[0]?.cart_items[i].quantity)
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
        <h2 className="font-weight-bold pt-5">Giỏ hàng</h2>
        <hr />
     </section>
    <div className="container-fluid pt-5">
        <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
                <table className="table table-bordered text-center mb-0">
                    <thead className="bg-secondary text-dark">
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Giá </th>
                            <th>Số lượng</th>
                            <th>Tổng cộng(đã có giảm giá)</th>
                            <th>Xóa</th>
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
              
                <div className="card border-secondary mb-5">
                    <div className="card-header bg-secondary border-0">
                        <h4 className="font-weight-semi-bold m-0">Giỏ hàng</h4>
                    </div>
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-3 pt-1">
                            <h6 className="font-weight-medium">Phí phụ</h6>
                            <h6 className="font-weight-medium">{total}</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6 className="font-weight-medium">Phí ship</h6>
                            <h6 className="font-weight-medium">{shipping}</h6>
                        </div>
                    </div>
                    <div className="card-footer border-secondary bg-transparent">
                        <div className="d-flex justify-content-between mt-2">
                            <h5 className="font-weight-bold">Tổng cộng</h5>
                            <h5 className="font-weight-bold">{total+shipping}</h5>
                        </div>
                        <button className="btn btn-block btn-primary my-3 py-3" onClick={context.billAdd}>Thanh toán</button>
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
