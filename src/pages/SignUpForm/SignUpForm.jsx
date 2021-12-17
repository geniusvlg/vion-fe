import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled, { css } from "styled-components";
import "./SignUpForm.css";

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Vui lòng nhập tên đăng nhập")
        .max(20, "Username tối đa 20 ký tự"),
    password: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu tối thiểu 6 ký tự"),
    email: yup
        .string()
        .required("Vui lòng nhập email"),
    lastname: yup
        .string()
        .required("Vui lòng nhập họ"),      
    firstname: yup
        .string()
        .required("Vui lòng nhập tên"),    
    phone: yup
        .string()
        .required("Vui lòng nhập số điện thoại")
        .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            "Số điện thoại không hợp lệ"),
    address: yup
        .string()
        .required("Vui lòng nhập địa chỉ"),
            
    city: yup
        .string()
        .required("Vui lòng nhập thành phố"),
        
    ward: yup
        .string()
        .required("Vui lòng nhập phường"),
        
    district: yup
        .string()
        .required("Vui lòng nhập quận, huyện"),
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

const SuccessMessage = styled.div`
font-family: 'Raleway', sans-serif;
background-color: #3f89f8;
font-size: 17px;
text-align: center;
padding: 25px;
margin: 0 0 10px 0;
color: white;
display: block;
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



export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const [submitted, setSubmitted] = useState(false);

  const registerSubmit = (data) => {
    setSubmitted(true);
    console.log(data);
  }

  return (
    <CardWrapper>
        <CardHeader>
            <CardHeading>Đăng kí</CardHeading>
        </CardHeader>
        <CardLogUpForm onSubmit={handleSubmit(registerSubmit)}>
            {submitted ? <SuccessMessage>Bạn đã đăng ký thành công. Trở về trang chủ.</SuccessMessage> : null}
        <CardBody>
            <CardFieldset>
                <CardRadio id="sex" placeholder="Anh" type="radio" name="gender"{...register("gender")}/>Anh
                <CardRadio id="sex" placeholder="Chị" type="radio" name="gender"{...register("gender")}/>Chị
            </CardFieldset>

            <CardFieldset>
                <CardInput id="username" placeholder="Tên đăng nhập" type="text" name="username"{...register("username")}/>
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
                <CardInput id="email" placeholder="Email" type="text" name="email"{...register("email")}/>
                {errors.email && <Error>{errors.email?.message}</Error>}
            </CardFieldset>

            <CardFieldset>
                <CardInput id="password" placeholder="Mật khẩu" type="password" name="password"{...register("password")} />
                {errors.password && <Error>{errors.password?.message}</Error>}
            </CardFieldset>

            <CardFieldset>
                <CardInput id="password" placeholder="Nhập lại mật khẩu" type="password" name="password"{...register("password")} />
                {errors.password && <Error>{errors.password?.message}</Error>}
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
    );
}
