import { SyntheticEvent, useState,useContext } from "react";
import { set, useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const schema = yup.object().shape({
    phone: yup
    .string()
    .trim()
    .required("Vui lòng nhập số điện thoại")
    .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Số điện thoại không hợp lệ"),
    
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
`

const Error = styled.span`
color: #ffa4a4
`


export default function Numbersign() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const context=useContext(AuthContext)
  let navigate=useNavigate()

  return (
  <>
    	{context.user? ( 
        navigate("/")
      ):(
        <>
      <CardWrapper>
        <CardHeader>
          <CardHeading>Đăng nhập</CardHeading>
        </CardHeader>
        <div>
          {context.error && <ErrorMessage variant='danger'>{context.error}</ErrorMessage>}
          {context.loading && <Loading/>}
        </div>
        <CardLoginForm onSubmit={handleSubmit(context.onLoginSubmit)}>
          <CardBody>
         
          <CardFieldset>
              <CardInput id="phone" placeholder="Số điện thoại" type="text" name="phone"{...register("phone")}/>
              {errors.phone && <Error>{errors.phone?.message}</Error>}
          </CardFieldset>
      
            <CardFieldset>
              <CardButton type="submit" >Đăng nhập</CardButton>
            </CardFieldset>
      
            <CardFieldset>
              <CardMenu>
                <li>
                  <a href="/forgot"><CardLink>Quên mật khẩu</CardLink></a>
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
      </>  
      )}
</>
  );
}
