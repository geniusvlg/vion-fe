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
    const [phone_number, setPhone] = useState();
    const [address_des, setAddress] = useState();

    const [dulieu,setData1]=useState([])
    const [data1,setData]=useState([])
    const [data2,setData2]=useState([])
    const [data3,setData3]=useState([])
    const [city,setCity]=useState()
    const [district,setDistrict]=useState()
    const [province,setProvince]=useState()
    const [error,setError]=useState(false);
    const [flag,setFlag]=useState(false)

    const handleChange = (event) => {
      const index = event.target.selectedIndex;
      const optionElement = event.target.childNodes[index];
      const optionElementId = optionElement.getAttribute('id');
      if(optionElementId)
      {
      setCity(optionElementId)
      }
      else
      {

      }
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
  if(city)
  {
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
  let {data}= await axios.post('http://localhost:60000/api_public/list/province',{
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
    const context=useContext(AuthContext)
    const customer_name=context.user.Infouser[0]?.customer_name
    const customer_id=context.user.Infouser[0]?.uid
    const [email, setEmail] = useState();
    let full_name=firstname +" "+ lastname
    const registerSubmit =async (e) => {  
    }
    const checknow = async (e)=>{
      if(city &&  district && province)
      {
        setError(false)
        let config ={
          headers:{
              "Content-type":"application/json"
          }
        }
        let {data}= await axios.post('http://localhost:60000/api_public/list/fixadd',{
          customer_id,full_name,address_des,district,province,gender
        },  
        config)
        setData1(data)
        if(data.statusCode==200)
        {
          context.logoutUser()
        }
        else
        {
          setFlag(true) 
        }
      }
      
      else
      {
        setError(true)
      }
    }
console.log("dữ liệu:",dulieu)
     return (
      <div className="update-info-container">
        <div className="form-container">
          <form className="update-form" onSubmit={handleSubmit(registerSubmit)}>
          {error && <span className="error">Vui lòng điền đầy đủ thông tin</span>}
              {/* <label>Giới tính</label> */}
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
                <select className="form-field" defaultValue="Default"{...register("city")} onChange={handleChange}>
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
              <button className="form-field" type="submit" onClick={checknow}>
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default UpdateInfo;