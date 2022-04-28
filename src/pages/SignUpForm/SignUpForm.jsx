import React, { useState,useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled, { css } from "styled-components";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import {Navigate} from 'react-router-dom';
import "./SignUpForm.css";
import axios from 'axios';

const schema = yup.object().shape({
  username: yup
      .string()
      .required("Vui lòng nhập tên đăng nhập")
      .trim()
      .max(20, "Username tối đa 20 ký tự"),
  password: yup
      .string()
      .trim()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu tối thiểu 6 ký tự"),
  confirm_password:yup
      .string()
      .trim()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu tối thiểu 6 ký tự")
      .oneOf([yup.ref("password")],"Mật khẩu không trùng khớp "),
  email: yup
      .string()
      .trim()
      .email('Email không hợp lệ')
      .max(255, "Username tối đa 20 ký tự")
      .required("Vui lòng nhập email"),
  phone: yup
      .string()
      .trim()
      .required("Vui lòng nhập số điện thoại")
      .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Số điện thoại không hợp lệ"),
  address: yup
      .string()
      .required("Vui lòng nhập địa chỉ"),
  first:yup
      .string()
      .trim()
      .required("Vui lòng nhập họ "),
  last:yup
      .string()
      .trim()
      .required("Vui lòng nhập tên"),    
});
const CardWrapper = styled.div`
overflow: hidden;
padding: 0 0 32px;
margin: 48px auto 0;
width: 500px;
font-family: Quicksand, arial, sans-serif;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
border-radius: 5px;
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
const CardLogUpForm = styled.form`
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
const CardRadio = styled.input`
flex-direction: column;
margin: 10px;
flex: 3px;
justify-content: space-evenly;
`
const CardInput = styled.input`
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
const CardButton = styled.button`
display: block;
width: 100%;
padding: 12px 0;
font-family: inherit;
font-size: 14px;
font-weight: 700;
color: black;
background-color: #FFDE59;
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
const Select = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 10px;
  font-size: 14px;
  border: none;
  border: .1rem gray solid;
  border-radius: 35px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

export default function SignUpForm() {
 
const [gender, setGender] = useState();
const [message,setMessage]=useState(null);
const [message1,setMessage1]=useState(null);
const [error,setError]=useState(false);
const [loading,setLoading]=useState(false) 
const [redirect,setRedirect] = useState();

const [data1,setData]=useState([])
const [data2,setData2]=useState([])
const [data3,setData3]=useState([])
const [city,setCity]=useState()
const [district,setDistrict]=useState()
const [province,setProvince]=useState()

const {
  register,
  handleSubmit,
  formState: { errors }
} = useForm({ resolver: yupResolver(schema) });


//const [submitted, setSubmitted] = useState(false);
const registerSubmit = async(data) => {
  //setSubmitted(true);
  if(gender== null)
  {
    setMessage("Vui lòng chọn giới Tính")
  }
  else if(gender== null && (district== null  || city == null || province== null))
  {
    setMessage("Vui lòng chọn giới Tính")
    setMessage1("Vui lòng chọn thông tin địa chỉ của bạn")
  }
  else if(district== null  || city == null || province== null)
  {
    setMessage1("Vui lòng chọn thông tin địa chỉ của bạn")
  }
  else{
    console.log("trim:",data)
    setMessage(null)
    setMessage1(null)
    let  user_name=data.username.replace(/\s/g, '')
    let password=data.password.replace(/\s/g, '')
    let  phone_number=data.phone
    let  address_des=data.address
    let  email=data.email
    let full_name=data.first+" "+data.last
 
    try { 
      const config ={
        headers:{
            "Content-type":"application/json"
        }
      }
      setLoading(true)
      const {data2}= await axios.post('http://localhost:60000/api_public/list/register',{
       user_name,password,phone_number,address_des,email,district,province,gender,full_name
      },
      config)
      setLoading(false)
      setRedirect(true);
    } catch (error) {
      setError(error.response.data.message)
      setLoading(false)
      setRedirect(false);
    }
  }
}

const handleChange = (event) => {
  const index = event.target.selectedIndex;
  const optionElement = event.target.childNodes[index];
  const optionElementId = optionElement.getAttribute('id');
  setCity(optionElementId )
}
const handleChange1 = (event) => {
  const index = event.target.selectedIndex;
  const optionElement = event.target.childNodes[index];
  const optionElementId = optionElement.getAttribute('id');
  setDistrict(optionElementId )
}
const handleChange2 = (event) => {
  const index = event.target.selectedIndex;
  const optionElement = event.target.childNodes[index];
  const optionElementId = optionElement.getAttribute('id');
  setProvince(optionElementId )
}




//chon thanh pho and show thanh pho
useEffect(() => {
  getcity()
}, []);
let getcity=async ()=>{
  let {data}= await axios.get('http://localhost:60000/api_public/list/city')
  setData(data.data)
}
//chon quan huyen and show huyen quan
useEffect(() => {
  getdistrict()
}, [city]);
let getdistrict=async()=>{
  let quan=city
  let config ={
    headers:{
        "Content-type":"application/json"
    }
  }
  let {data}= await axios.post('http://localhost:60000/api_public/list/province',{
    quan
  },  
  config)
  setData2(data.result[0].areas)
}
//chon phuong and show phuong
useEffect(() => {
  getprovince()
}, [district]);
let getprovince=async()=>{
  let quan=district
  let config ={
    headers:{
        "Content-type":"application/json"
    }
  }
  let {data}= await axios.post('http://localhost:60000/api_public/list/province',{
    quan
  },  
  config)
  setData3(data.result[0].areas)
}


if(redirect){
  return <Navigate to="/signin"/>
}
return (
  <>
  <CardWrapper>
      <CardHeader>
          <CardHeading>Đăng kí</CardHeading>
      </CardHeader>
      <div>
    {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
    {/*message && <ErrorMessage variant='danger'>{message}</ErrorMessage>*/}
    {loading && <Loading/>}
      </div>
      <CardLogUpForm onSubmit={handleSubmit(registerSubmit)}>
      <CardBody>
          <CardFieldset>
              <CardRadio  placeholder="Anh" type="radio" name="gender"onChange={(e) => setGender(true)}/>Anh
              <CardRadio  placeholder="Chị" type="radio" name="gender"onChange={(e) => setGender(false)}/>Chị
          </CardFieldset>
          {message && <Error>{message}</Error>}
          <CardFieldset>
              <CardInput id="họ" placeholder="Họ" type="text" name="first"{...register("first")} />
          </CardFieldset>
          {errors.first && <Error>{errors.first?.message}</Error>}
          <CardFieldset>
              <CardInput id="tên" placeholder="Tên" type="text" name="last"{...register("last")}/>
          </CardFieldset>
          {errors.last && <Error>{errors.last?.message}</Error>}
          <CardFieldset>
              <CardInput id="username" placeholder="Tên đăng nhập" type="text" name="username"{...register("username")} />
              {errors.username && <Error>{errors.username?.message}</Error>}
          </CardFieldset>

          <CardFieldset>
              <CardInput id="phone" placeholder="Số điện thoại" type="text" name="phone"{...register("phone")}/>
              {errors.phone && <Error>{errors.phone?.message}</Error>}
          </CardFieldset>

          <CardFieldset>
              <CardInput id="address" placeholder="Địa chỉ" type="text" name="address"{...register("address")}/>
              {errors.address && <Error>{errors.address?.message}</Error>}

          </CardFieldset>

          <CardFieldset>
              <CardInput id="email" placeholder="Email" type="text" name="email"{...register("email")} />
              {errors.email && <Error>{errors.email?.message}</Error>}
          </CardFieldset>

          {message1 && <Error>{message1}</Error>}  
          <CardFieldset>
          <Select onChange={handleChange} >
                {data1?.map((item,index)=>(
                  <>
                  <option value=" " hidden>
                  Thành phố
                  </option>
                  <option  id={item.uid}>{item.name} </option>
                    </>
                ))}      
            </Select>
          </CardFieldset>

          <CardFieldset>
          {city? (
                <Select onChange={handleChange1}>
                {data2?.map((item,index)=>(
                  <>
                  <option value=" " hidden>
                   Quận
                  </option>
                  <option  id={item.uid}>{item.name} </option>
                    </>
                ))}      
            </Select>
            ) : (
              <>
              </>
            ) }
         </CardFieldset>

         <CardFieldset>
          {district? (
                <Select onChange={handleChange2}>
                {data3?.map((item,index)=>(
                  <>
                  <option value=" " hidden>
                Phường 
                  </option>
                  <option  id={item.uid}>{item.name} </option>
                    </>
                ))}      
            </Select>
            ) : (
              <>
              </>
            ) }
         </CardFieldset>


            <CardFieldset>
                <CardInput id="password" placeholder="Mật khẩu" type="password" name="password"{...register("password")} />
                {errors.password && <Error>{errors.password?.message}</Error>}
            </CardFieldset>

            <CardFieldset>
                <CardInput id="confirm_password" placeholder="Nhập lại mật khẩu" type="password" name="confirm_password"{...register("confirm_password")}/>
                {errors.confirm_password && <Error>{errors.confirm_password?.message}</Error>}
            </CardFieldset>

          
          <CardFieldset>
              <CardButton type="submit" >Đăng kí </CardButton>
          </CardFieldset>


          <CardFieldset>
              <CardMenu>
                  <li><CardDoc> hoặc </CardDoc></li>
                  <li>
                      <a href="/signin"><CardLink>Đăng nhập nếu đã có tài khoản</CardLink></a>
                  </li>
              </CardMenu>
          </CardFieldset>
      </CardBody>
      </CardLogUpForm>  
  </CardWrapper>
</>
  );
}