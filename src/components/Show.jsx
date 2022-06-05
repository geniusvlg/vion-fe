import React,{useState,useEffect,useContext}  from 'react'
import { AuthContext } from '../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Show = ({data,setTam,setTotal}) => {
  let navigate = useNavigate();
  const context=useContext(AuthContext)
  let addClick=async(e)=>{
      let quantity=data.quantity+1
      let uid=e.currentTarget.id
      let user_name=context.user.Infouser[0]?.customer_name
      let customer_id=context.user.Infouser[0]?.uid
      let acsess=context.authTokens?.acsessToken
      let items={uid,quantity}
        let config ={
          headers:{
              "Content-type":"application/json",
              "authorization": "Bearer "+ acsess
          }
        }
        let data1=  await axios.post(`${process.env.REACT_APP_HOST_URL}/api_public/submitCart`,{
        customer_id,items,user_name
       },
       config)
       var x=0
       for(var i=0;i<data1.data.currentcart.Check[0]?.cart_items.length;i++)
      {
        x=x+((data1.data.currentcart.Check[0]?.cart_items[i].iproduct.pricing.price_with_vat-data1.data.currentcart.Check[0]?.cart_items[i].iproduct.pricing.price_with_vat*data1.data.currentcart.Check[0]?.cart_items[i].iproduct.pricing.discount/100 )*data1.data.currentcart.Check[0]?.cart_items[i].quantity)
      }
      setTotal(x)
      setTam(data1.data.currentcart.Check[0]?.cart_items)
      context.setSoluong(data1.data.currentcart.Check[0]?.cart_items.length)
  
  }
  let removeClick=async(e)=>{
    let quantity=data.quantity-1
    let uid=e.currentTarget.id
    let user_name=context.user.Infouser[0]?.customer_name
    let customer_id=context.user.Infouser[0]?.uid
    let acsess=context.authTokens?.acsessToken
    let items={uid,quantity}
      let config ={
        headers:{
            "Content-type":"application/json",
            "authorization": "Bearer "+ acsess
        }
      }
      let data1=  await axios.post(`${process.env.REACT_APP_HOST_URL}/api_public/submitCart`,{
      customer_id,items,user_name
     },
     config)
     var x=0
     for(var i=0;i<data1.data.currentcart.Check[0]?.cart_items.length;i++)
    {
    x=x+((data1.data.currentcart.Check[0]?.cart_items[i].iproduct.pricing.price_with_vat-data1.data.currentcart.Check[0]?.cart_items[i].iproduct.pricing.price_with_vat*data1.data.currentcart.Check[0]?.cart_items[i].iproduct.pricing.discount/100 )*data1.data.currentcart.Check[0]?.cart_items[i].quantity)
    }
    setTotal(x)
    setTam(data1.data.currentcart.Check[0]?.cart_items)
    console.log(data1.data.currentcart.Check[0]?.cart_items.length)
    context.setSoluong(data1.data.currentcart.Check[0]?.cart_items.length)
    
  }
  const deleteClick =async(e) =>{
  let acsess=context.authTokens?.acsessToken
  let user_name=context.user.Infouser[0]?.customer_name
  let customer_id=context.user.Infouser[0]?.uid
  let uid=e.currentTarget.id;
  let items={uid}
  let config ={
    headers:{
        "Content-type":"application/json",
        "authorization": "Bearer "+ acsess
    }
  }
  let data1=  await axios.post(`${process.env.REACT_APP_HOST_URL}/api_public/deleteitem/`,{
    customer_id,items,user_name
   },
   config)
   var x=0
   for(var i=0;i<data1.data.currentcart.Check[0]?.cart_items.length;i++)
  {
    x=x+((data1.data.currentcart.Check[0]?.cart_items[i].iproduct.pricing.price_with_vat-data1.data.currentcart.Check[0]?.cart_items[i].iproduct.pricing.price_with_vat*data1.data.currentcart.Check[0]?.cart_items[i].iproduct.pricing.discount/100 )*data1.data.currentcart.Check[0]?.cart_items[i].quantity)
  }
  setTotal(x)
  setTam(data1.data.currentcart.Check[0]?.cart_items)
  if(!data1.data.currentcart.Check[0]?.cart_items.length)
  {
    context.setSoluong(0)
  }
  else
  {
    context.setSoluong(data1.data.currentcart.Check[0]?.cart_items.length)
  }
   
  };
  let selectClick=async(e)=>{
    let quantity=e.target.value
    if(quantity>0)
    {
      let uid=e.currentTarget.id
      let user_name=context.user.Infouser[0]?.customer_name
      let customer_id=context.user.Infouser[0]?.uid
      let acsess=context.authTokens?.acsessToken
      let items={uid,quantity}
        let config ={
          headers:{
              "Content-type":"application/json",
              "authorization": "Bearer "+ acsess
          }
        }
        let data1=  await axios.post(`${process.env.REACT_APP_HOST_URL}/api_public/submitCart`,{
        customer_id,items,user_name
      },
      config)
      var x=0
      for(var i=0;i<data1.data.currentcart.Check[0]?.cart_items.length;i++)
      {
        x=x+((data1.data.currentcart.Check[0]?.cart_items[i].iproduct.pricing.price_with_vat-data1.data.currentcart.Check[0]?.cart_items[i].iproduct.pricing.price_with_vat*data1.data.currentcart.Check[0]?.cart_items[i].iproduct.pricing.discount/100 )*data1.data.currentcart.Check[0]?.cart_items[i].quantity)
      }
      setTotal(x)
      setTam(data1.data.currentcart.Check[0]?.cart_items)
      context.setSoluong(data1.data.currentcart.Check[0]?.cart_items.length)
    }
}
  const getInfo=async(td)=>{
    navigate(`/product_details/${td}`);
  }

  return(
    <tr>
    <td className="align-middle" id={data.iproduct.uid} onClick={()=>getInfo(data.iproduct.uid)}> <img src={data.iproduct.image_cover} href={`/product_details/${data.iproduct.uid}}`} style={{width: '50px'}}/>{data.iproduct.product_name}</td>
    <td className="align-middle">{data.iproduct.pricing.price_with_vat}</td>
    <td className="align-middle">
        <div className="input-group quantity mx-auto" style={{width: '100px'}}>
            <div className="input-group-btn">
                <button className="btn btn-sm btn-primary btn-minus"id={data.iproduct.uid} value={data.quantity} onClick={(event)=>removeClick(event)} >
                  <RemoveIcon></RemoveIcon>
                </button>
            </div>
            <input type="text" className="form-control form-control-sm bg-secondary text-center" id={data.iproduct.uid} value={data.quantity} onChange={(event)=>selectClick(event)}/>
            <div className="input-group-btn">
                <button className="btn btn-sm btn-primary btn-plus" id={data.iproduct.uid} value={data.quantity} onClick={(event)=>addClick(event)} >
                <AddIcon></AddIcon>
                </button>
            </div>
        </div>
    </td>
    <td className="align-middle">{(data.iproduct.pricing.price_with_vat-data.iproduct.pricing.price_with_vat*data.iproduct.pricing.discount/100)*data.quantity}</td>
    <td className="align-middle">
      <button className="btn btn-sm btn-primary" id={data.uid} onClick={(event)=>deleteClick(event)} >
            <ClearIcon/>
      </button></td>
</tr>        
  )
};

export default Show;