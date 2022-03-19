import React, { useState,useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiTwotoneEdit } from "react-icons/ai";
import ResetPassword from "./ResetPassword";
import axios from 'axios';
const schema = yup.object().shape({
  username: yup
    .string()
    .required("Vui lòng nhập tên đăng nhập")
    .max(20, "Username tối đa 20 ký tự"),
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
      .min(10, "Số điện thoại không hợp lệ"),
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

function UpdateInfo() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const [firstname, setFirst] = useState();
    const [lastname, setLast] = useState();
    const [gender, setGender] = useState();
    const [user_name, setName] = useState();
    const [phone_number, setPhone] = useState();
    const [address_des, setAddress] = useState();

    const [data1,setData]=useState([])
    const [data2,setData2]=useState([])
    const [data3,setData3]=useState([])
    const [city,setCity]=useState()
    const [district,setDistrict]=useState()
    const [province,setProvince]=useState()

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
    const [email, setEmail] = useState();
    let name=firstname +" "+ lastname
    let fullname=name.split(' ')
    let fi=fullname[0]
    let la = fullname[fullname.length-1]
    console.log("gender:",gender)
    console.log("name:",name)
    console.log("fi:",fi)
    console.log("la:",la)
    console.log("phone:",phone_number)
    console.log("email:",email)
    console.log("address:",address_des)
    console.log("user_name:",user_name)
    console.log("district:",district)
    console.log("province",province)
    const registerSubmit =async (e) => {  
      let config ={
        headers:{
            "Content-type":"application/json"
        }
      }
      let {data}= await axios.post('http://localhost:60000/api_public/list/fixadd',{
        user_name,address_des,email,district,province },  
      config)
       console.log("d:",data)
    };
  
    return (
      <div className="update-info-container">
        <div className="form-container">
          <form className="update-form" onSubmit={handleSubmit(registerSubmit)}>
              {/* <label>Tên đăng nhập </label> */}
              <div className="form-group-row">
                <input type="radio" id="html" name="fav_language" value="HTML"/>
              <label for="html">Nam</label>
  
              <input type="radio" id="html" name="fav_language" value="HTML"/>
              <label for="html">Nữ</label><br/>
              </div>
            <div className="form-group-item">
              {/* <label>Tên đăng nhập </label> */}
              <input
                className="form-field"
                type="text"
                name="username"
                placeholder="Tên đăng nhập"
                {...register("username")}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="edit-btn-icon">
                <AiTwotoneEdit size={24} />
              </div>
              {errors.username && (
                <span className="error">{errors.username?.message}</span>
              )}
            </div>
            <div className="form-group-item">
              {/* <label>Email</label> */}
              <input
                className="form-field"
                type="email"
                name="email"
                placeholder="Email"
                {...register("email")}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="edit-btn-icon">
                <AiTwotoneEdit size={24} />
              </div>
              {errors.email && (
                <span className="error">{errors.email?.message}</span>
              )}
            </div>
            <div className="form-group-row">
              <div className="form-group-item">
                {/* <label>Họ</label> */}
                <input
                  className="form-field"
                  type="text"
                  name="lastname"
                  placeholder="Họ"
                  {...register("lastname")}
                  onChange={(e) => setLast(e.target.value)}
                />
                <div className="edit-btn-icon">
                  <AiTwotoneEdit size={24} />
                </div>
                {errors.lastname && (
                  <span className="error">{errors.lastname?.message}</span>
                )}
              </div>
              <div className="form-group-item">
                {/* <label>Tên</label> */}
                <input
                  className="form-field"
                  type="text"
                  name="firstname"
                  placeholder="Tên"
                  {...register("firstname")}
                  onChange={(e) => setFirst(e.target.value)}
                />
                <div className="edit-btn-icon">
                  <AiTwotoneEdit size={24} />
                </div>
                {errors.firstname && (
                  <span className="error">{errors.firstname?.message}</span>
                )}
              </div>
            </div>
          
            <div className="form-group-row">
              <div className="form-group-item">
                {/* <label>Số nhà, đường</label> */}
                <input
                  className="form-field"
                  type="text"
                  name="address"
                  placeholder="Số nhà, đường"
                  {...register("address")}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className="edit-btn-icon">
                  <AiTwotoneEdit size={24} />
                </div>
                {errors.address && (
                  <span className="error">{errors.address?.message}</span>
                )}
              </div>
              <div className="form-group-item">
                {/* <label>Thành phố</label> */}
                <select className="form-field" defaultValue="Default" onChange={handleChange}>
                              <option value=" " hidden>
                                Thành phố 
                             </option>
                             {data1?.map((item,index)=>(
                                <>
                                <option  id={item.uid}>{item.name} </option>
                                    </>
                                ))}      
                              </select>
              </div>
            </div>
            
            <div className="form-group-row">
            {city? (
              <div className="form-group-item">
              <select className="form-field" defaultValue="Default" onChange={handleChange1}>
                              <option value=" " hidden>
                                Quận
                             </option>
                             {data2?.map((item,index)=>(
                                <>
                                <option  id={item.uid}>{item.name} </option>
                                    </>
                                ))}      
                              </select>
              </div>
            ): (
              <>
              </>
            ) }
              {district? (
              <div className="form-group-item">
                {/* <label>Quận</label> */}
         
                <select className="form-field" defaultValue="Default" onChange={handleChange2}>
                              <option value=" " hidden>
                                Phường
                             </option>
                             {data3?.map((item,index)=>(
                                <>
                                <option  id={item.uid}>{item.name} </option>
                                    </>
                                ))}    
                              </select>
              </div>
               ) : (
                <>
                </>
              ) }
            </div>
  
            <div className="btn-container">
              <button className="form-field" type="submit">
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default UpdateInfo;