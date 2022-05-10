import React,{useContext,useEffect,useState} from 'react'
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button,CardImg, Container} from 'react-bootstrap'
import logo1 from '../assets/images/discount30.png'
import logo2 from '../assets/images/discount50.png'
const Voucher = () => {
    const context=useContext(AuthContext)
    const [data1,setData1]=useState([])
    const [sl,setSl]=useState(0)
    useEffect(() => {
        getVoucher()
       }, []);
    let getVoucher=async()=>{
        let customer_id=context.user.Infouser[0].uid
        console.log("cus_id:",customer_id)
        let config ={
          headers:{
              "Content-type":"application/json"
          }
        }
        let {data}= await axios.post('http://localhost:60000/api_public/listVouch',{
            customer_id
        },
        config)
        setData1(data.data)
        setSl(data.data.length)
      }
  return (
              <Container>
        {sl>0?(<>
          {data1?.map((it,i)=>(
       <Card style={{maxWidth:'100%',display: 'flex', flexDirection: 'row'}} key={i}>
     <CardImg src={logo1} alt="image"style={{width:'30%',display: 'flex', flexDirection: 'row'}}  />
             <Card.Body>
    <Card.Title>{it.voucher_uid}</Card.Title>
    <Card.Text>
      Bạn sẽ được giảm giá {it.applied_value}% khi sử dụng voucher này 
    </Card.Text>
    <Button variant="success" disabled>Hạn sử dụng: {new Date(it.used_at + (30 * 86400000)).toLocaleString('en-GB')}</Button>
  </Card.Body>
</Card>
     ))}
        </>):(<>
        <h2>Rất tiếc, bạn chưa có voucher nào cả</h2>
        </>)}
 
        </Container>
 
  )
}

export default Voucher