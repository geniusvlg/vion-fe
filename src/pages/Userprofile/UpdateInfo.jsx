import React,{useState,useContext,useEffect}  from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../context/AuthContext'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiTwotoneEdit } from "react-icons/ai";
import ResetPassword from "./ResetPassword";
import axios from 'axios';
const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Email không hợp lệ')
    .max(255, "Username tối đa 20 ký tự")
    .required("Vui lòng nhập email"),
  lastname: yup
    .string()
    .required("Vui lòng nhập họ"),
  firstname: yup
    .string()
    .required("Vui lòng nhập tên"),
  address: yup
    .string()
    .required("Vui lòng nhập địa chỉ"),
});

function UpdateInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

    const [firstname, setFirst] = useState();
    const [lastname, setLast] = useState();
    const [gender, setGender] = useState();
    const [phone_number, setPhone] = useState();
    const [address_des, setAddress] = useState();
    const context=useContext(AuthContext)
    const customer_id=context.user.Infouser[0]?.uid
    const [email, setEmail] = useState();
    let full_name=firstname +" "+ lastname

    const [data1,setData]=useState([])
    const [data2,setData2]=useState([])
    const [data3,setData3]=useState([])
    const [city,setCity]=useState()
    const [district,setDistrict]=useState()
    const [province,setProvince]=useState()
    const [message,setMessage]=useState(null);
    const [message1,setMessage1]=useState(null);

    const handleChange = (event) => {
      const index = event.target.selectedIndex;
      const optionElement = event.target.childNodes[index];
      const optionElementId = optionElement.getAttribute('id');
      setCity(optionElementId)
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
  let {data}= await axios.get(`${process.env.REACT_APP_HOST_URL}/api_public/list/city`)
  setData(data.data)
}

//chon quan huyen and show huyen quan
useEffect(() => {
  getdistrict()
}, [city]);
let getdistrict=async()=>{
  if(city)
  {
  let quan=city
  let config ={
    headers:{
        "Content-type":"application/json"
    }
  }
  let {data}= await axios.post(`${process.env.REACT_APP_HOST_URL}/api_public/list/province`,{
    quan
  },  
  config)
  setData2(data.result[0].areas)
  }else
  {
    setData2(null)
  }
}

//chon phuong and show phuong
useEffect(() => {
  getprovince()
}, [district]);

let getprovince=async()=>{

  if(district)
  {
    let quan=district
  let config ={
    headers:{
        "Content-type":"application/json"
    }
  }
  let {data}= await axios.post(`${process.env.REACT_APP_HOST_URL}/api_public/list/province`,{
    quan
  },  
  config)
  setData3(data.result[0].areas)
  }
  else
  {
    setData3(null)
  }
}
   
    const registerSubmit =async (e) => {  
      console.log("gioi tinh:",gender)
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
      setMessage(null)
      setMessage1(null)
        let config ={
          headers:{
              "Content-type":"application/json"
          }
        }
        let {data}= await axios.post(`${process.env.REACT_APP_HOST_URL}/api_public/list/fixadd`,{
          customer_id,full_name,address_des,district,province,gender,email
        },  
        config)
        console.log("update:",data)
        if(data.statusCode==200)
        {
          context.logoutUser()
        }
        else
        {
          setMessage(data.message)
        }
      }
    
    }
     return (
      <div className="update-info-container">
        <div className="form-container">
          <form className="update-form" onSubmit={handleSubmit(registerSubmit)}>
              {/* <label>Giới tính</label> */}
              {message && (<span className="error">{message}</span>)}
              {message1 && (<span className="error" >{message1}</span>)}  
              <div className="form-group-row">
                <input type="radio" id="html" name="fav_language" value="HTML" onChange={(e) => setGender(true)}/>
              <label for="html">Nam</label>
              <input type="radio" id="html" name="fav_language" value="HTML" onChange={(e) => setGender(false)}/>
              <label for="html">Nữ</label><br/>
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
                              {errors.address && (
                  <span className="error">{errors.city?.message}</span>
                )}
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
              <button className="form-field" type="submit" >
                Cập nhật
              </button>
            </div>
 
          </form>
        </div>
      </div>
    );
  }
  
  export default UpdateInfo;