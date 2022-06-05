import React, { useState,useEffect,useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'

const schema = yup.object().shape({
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
`;

const Error = styled.span`
color: #ffa4a4
`


export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const context=useContext(AuthContext)
  const [message,setMessage]=useState(null);
  const [loading,setLoading]=useState(false) 
  const [error,setError]=useState(false);
  const onLoginSubmit = async(data) => {
    let password=data.password.replace(/\s/g, '')
    let  phone_number=context?.user.Infouser[0]?.phone_number
      const config ={
        headers:{
            "Content-type":"application/json"
        }
      }
      setLoading(true)
      const data2= await axios.post(`${process.env.REACT_APP_HOST_URL}/api_public/list/forgotpassword`,{
       phone_number,password
      },
      config)
      setLoading(false)
      if(data2.data.statuscode == 200)
      {
        setError(null)
        setMessage(data2.data.message)
        context?.logoutUser()
      }
      else
      {
        setMessage(null)
        setError(data2.data.message)
      }
 
  };


  return (
      <CardWrapper>
        <CardHeader>
          <CardHeading>Chỉnh sửa lại mât khẩu </CardHeading>
        </CardHeader>
              <div>
          {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
          {message && <ErrorMessage variant='success'>{message}</ErrorMessage>}
          {loading && <Loading/>}
            </div>
        <CardLoginForm onSubmit={handleSubmit(onLoginSubmit)}>
          <CardBody>

          
          <CardFieldset>
            <CardInput id="password" placeholder="Mật khẩu mới " type="password" name="password"{...register("password")} />
            {errors.password && <Error>{errors.password?.message}</Error>}
          </CardFieldset>

          <CardFieldset>
            <CardInput id="confirm_password" placeholder="Nhập lại mật khẩu mới" type="password" name="confirm_password"{...register("confirm_password")}/>
            {errors.confirm_password && <Error>{errors.confirm_password?.message}</Error>}
          </CardFieldset>
       

         {/*otp*/}

          <CardFieldset>
            <CardButton type="submit">Xác thực </CardButton>
          </CardFieldset>

          <CardFieldset>
            <CardMenu>
              <li>
                <a href="/"><CardLink>Gửi lại mã OTP</CardLink></a>
              </li>
              <li><CardDoc> hoặc </CardDoc></li>
              <li>
                <a href="/signup"><CardLink> Đăng kí tại đây</CardLink></a>
              </li>
            </CardMenu>
          </CardFieldset>
        </CardBody>
        </CardLoginForm>
        
      </CardWrapper>

  );
}
/*<CardFieldset>
<CardInput id="otp" placeholder="Mã OTP" type="text" name="otp"{...register("otp")} required/>
{errors.otp && <Error>{errors.otp?.message}</Error>}
</CardFieldset>*/