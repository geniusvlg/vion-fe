import React,{useState,useEffect,useContext}  from 'react'
import { AuthContext } from '../context/AuthContext';
import {Navigate} from 'react-router-dom';
import styled from 'styled-components';
import {useCart} from 'react-use-cart'
import {Modal} from 'react-bootstrap'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'

const Show = ({data}) => {
  const context=useContext(AuthContext)
  const [uid ,  setUid ]= useState();
  const [dataProduct1, setDataProduct1] = useState()
  const [redirect,setRedirect]=useState(false)

 
  const deleteClick =async(e) =>{
    let customer_id=context.user.Infouser[0]?.uid
    let items={uid}
    setUid(e.currentTarget.id);
      let config ={
        headers:{
            "Content-type":"application/json"
        }
      }
      let {data1}=  await axios.post('http://localhost:60000/api_public/deleteitem/',{
      customer_id,items
     },
     config)
     setDataProduct1(data1)
     setRedirect(true)
};
if (redirect){
  return <Navigate to="/cart"/>
}

  return(
                <tr>
                <td><button id={data.iproduct.uid}  onClick={(event)=>deleteClick(event)}><DeleteForeverOutlinedIcon/></button></td>
                <td><img src={data.iproduct.image_cover} alt="" /></td>
                <td><h5>{data.iproduct.product_name}</h5></td>
                <td>{data.iproduct.pricing.price_with_vat}</td>
                <td>{data.quantity}</td>
                <td><h5>{data.iproduct.pricing.price_with_vat*data.quantity}</h5></td>
                </tr>
  )
};

export default Show;
//<td><input type="number" className="w-25 pl-1" defaultValue={1}/></td>