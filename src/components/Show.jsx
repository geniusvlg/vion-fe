import React,{useState,useEffect,useContext}  from 'react'
import { AuthContext } from '../context/AuthContext';
import {Navigate} from 'react-router-dom';
import styled from 'styled-components';
import {useCart} from 'react-use-cart'
import {Modal} from 'react-bootstrap'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

const Show = ({data}) => {
  const context=useContext(AuthContext)
  const [quantity,setCount] = useState(0);
  const [uid ,  setUid ]= useState();
  let textInput = React.useRef(null); 

  let addClick=async(e)=>{
      setCount(textInput.current.value %10 +1)
      setUid(e.currentTarget.id)
  }
  let removeClick=async(e)=>{
    setCount(textInput.current.value %10 +1)
    setUid(e.currentTarget.id)
}
  let submitcard=async()=>{
    let customer_id=context.user.Infouser[0]?.uid
    let acsess=context.authTokens?.acsessToken
    let items={uid,quantity}
      let config ={
        headers:{
            "Content-type":"application/json",
            "authorization": "Bearer "+ acsess
        }
      }
      let data1=  await axios.post('http://localhost:60000/api_public/submitCart',{
      customer_id,items
     },
     config)
     console.log("data:",data1)
     context.setRefresh(true)
  }
  useEffect(() => {
    submitcard()
  }, [quantity]);
  return(
    <tr>
    <td className="align-middle"> <img src={data.iproduct.image_cover} alt=""  style={{width: '50px'}}/>{data.iproduct.product_name}</td>
    <td className="align-middle">{data.iproduct.pricing.price_with_vat}</td>
    <td className="align-middle">
        <div className="input-group quantity mx-auto" style={{width: '100px'}}>
            <div className="input-group-btn">
                <button className="btn btn-sm btn-primary btn-minus"id={data.iproduct.uid} value={data.quantity} onClick={(event)=>removeClick(event)} >
                  <RemoveIcon></RemoveIcon>
                </button>
            </div>
            <input type="text" className="form-control form-control-sm bg-secondary text-center"  ref={textInput}  value={data.quantity}/>
            <div className="input-group-btn">
                <button className="btn btn-sm btn-primary btn-plus" id={data.iproduct.uid} value={data.quantity} onClick={(event)=>addClick(event)} >
                <AddIcon></AddIcon>
                </button>
            </div>
        </div>
    </td>
    <td className="align-middle">{data.iproduct.pricing.price_with_vat*data.quantity}</td>
    <td className="align-middle">
      <button className="btn btn-sm btn-primary" id={data.uid} onClick={(event)=>context.deleteClick(event)} >
            <ClearIcon/>
      </button></td>
</tr>
               
  )
};

export default Show;
//<td><input type="number" className="w-25 pl-1" defaultValue={1}/></td>
/*<tr>
<td><button id={data.iproduct.uid}  onClick={(event)=>context.deleteClick(event)}><DeleteForeverOutlinedIcon/></button></td>
<td><img src={data.iproduct.image_cover} alt="" /></td>
<td><h5>{data.iproduct.product_name}</h5></td>
<td>{data.iproduct.pricing.price_with_vat}</td>
<td>{data.quantity}</td>
<td><h5>{data.iproduct.pricing.price_with_vat*data.quantity}</h5></td>
</tr>*/