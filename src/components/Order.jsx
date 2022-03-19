import React,{useContext,useEffect,useState} from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import {useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardWrapper = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  margin: 48px auto 0;
  width: 1000px;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  background-color: #ffffff;
`;

const CardHeader = styled.header`
  padding-top: 32px;
  padding-bottom: 32px;
`;
const CardHeading = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const CardLoginForm = styled.form`
display: flex;
flex-direction: column;
justify-content: space-evenly;
padding: 10px;
`

const CardBody = styled.div`
  padding-right: 32px;
  padding-left: 32px;
`;

const CardFieldset = styled.fieldset`
  position: relative;
  padding: 0;
  margin: 0;
  border: 0;
  display: flex;
  flex-direction: row;
  border-bottom: 0.1rem #bababa solid;
  & + & {
    margin-top: 24px;
  }

  &:nth-last-of-type(2) {
    margin-top: 32px;
  }

  &:last-of-type {
    text-align: center;
  }
`;

const CardInform = styled.div`
position: relative;
padding: 0;
margin: 0;
border-bottom: 0.1rem #bababa solid;

& + & {
  margin-top: 24px;
}

&:nth-last-of-type(2) {
 margin-top: 32px;
 }
`

const CardButtonset = styled.fieldset`
  position: relative;
  padding: 20px;
  margin: 0;
  border: 0;
  & + & {
    margin-top: 24px;
  }

  &:nth-last-of-type(2) {
    margin-top: 32px;
  }

  &:last-of-type {
    text-align: center;
  }
`;

const CardH1 = styled.h1`
  padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 24px;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  padding-left: 10px;
  border-radius: 35px;
  color: black;

`;

const CardH2 = styled.h1`
  padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 16px;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  padding-left: 10px;
  color: black;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  &:hover {
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.16);
    transform: translate(0, -1px);
  }
`;

const CardH3 = styled.h1`
  padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 12px;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  padding-left: 10px;
  color: black;
  white-space: nowrap;
`;

const CardH4 = styled.h1`
  padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 20px;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  padding-left: 10px;
  color: black;
   text-align: right;
  border-bottom: 0.1rem #bababa solid;
`;

const CardH5 = styled.h1`
  padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 20px;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  padding-left: 10px;
  color: black;
   text-align: right;
`;

const ImgContainer = styled.div`
  max-width: 18%;
  border-bottom: 0.1rem #bababa solid;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;


const CardQuit = styled.a`
  display: block;
  width: 20%;
  padding: 12px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: #a8a8a8;
  cursor: pointer;
  text-align: center;
  &:hover{
    color: black;
  }
`;

const CardButton = styled.button`
  display: block;
  width: 50%;
  padding: 12px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: black;
  background-color: #ffffff;
  border: .1rem gray solid;
  border-radius: 35px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;

const CardLink = styled.a`
  display: inline-block;
  font-size: 12px;
  text-decoration: none;
  color: #aaa;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: color 0.25s ease-in;

  &:hover {
    color: #777;
  }
`;

const CardMenu = styled.ul`
list-style: none;
`

const CardDoc = styled.h1`
  display: inline-block;
  font-size: 10px;
  text-decoration: none;
  color: #aaa;
`

const Error = styled.span`
color: #ffa4a4
`

const Order = () => {
  const context=useContext(AuthContext)
  const [data1,setData1]=useState([])
  const [data2,setData2]=useState([])
  const shipping = 5000
  useEffect(() => {
    getdistrict()
  }, []);
  let getdistrict=async()=>{
    let phone_number=context.user.Infouser[0].phone_number
    let config ={
      headers:{
          "Content-type":"application/json"
      }
    }
    let {data}= await axios.post('http://localhost:60000/api_public/getHistoryOrderListByPhonenumber/',{
      phone_number
    },  
    config)
    console.log("độ dài:",data.result.length)
    setData1(data.result)
    setData2(data.result[0].sub_orders[0])
  }
  console.log("thông tin order:",data1)
  console.log("thông tin order 1:",data2)
  
  return (
    <>
       {data1.map((it,index)=>(
     <div>
        <CardInform>
            <CardH3>{it.order_id}</CardH3>
             <CardH3>Người nhận: {context.user.Infouser[0]?.full_name}</CardH3>
             <CardH3>Địa chỉ nhận hàng:{it.address_des}</CardH3>
        </CardInform>
        
         {it.sub_orders[0].order_items?.map((item,index)=>(
            <CardFieldset>
            <ImgContainer>
            <Image src={item.product.image_cover} />
            </ImgContainer>
                 <CardInform>
                <CardH3>{item.product.product_name}</CardH3>
                <CardH3>Chất lượng loại 1</CardH3>
                </CardInform>
              <CardH5>{item.cost_price} VNĐ * {item.quantity}</CardH5>
            </CardFieldset>
          ))}      

        <CardH5>Tiền hàng: {it.total_pay} VNĐ</CardH5>
        <CardH5>Phí giao hàng: {shipping} VNĐ</CardH5>
        <CardH5>Tổng: {it.total_pay+shipping} VNĐ</CardH5>  
     </div>  
     ))}
    </>
      )
};

export default Order;
/*<CardH3>gIAO HÀNG LÚC: 16.00 - 8/11</CardH3>*/