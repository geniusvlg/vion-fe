import React,{useState,useContext,useEffect}  from 'react'
import { AuthContext } from '../../context/AuthContext'
import {useNavigate,Navigate } from 'react-router-dom';
import axios from 'axios';
import "./Checkout.css"
const Checkout = () => {
    const context=useContext(AuthContext)
    let navigate=useNavigate()
    let shipping=5000
    let fullname=context.user.Infouser[0]?.full_name
    console.log('full name:',fullname )
    let fi=fullname.split(' ').slice(0,1).join(' ')
    let la = fullname.split(' ').slice(1,3).join(' ');
    let fla =context.user.Infouser[0].address.district.city[0].uid
     
    const [data1,setData]=useState([])
    const [data2,setData2]=useState([])
    const [data3,setData3]=useState([])
    const [data4,setData4]=useState([])
    const [city,setCity]=useState(context.user.Infouser[0].address.district.city[0].uid)
    const [district,setDistrict]=useState()
    const [province,setProvince]=useState()
  
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
    if(quan == null)
    {
       
        setCity(context.user.Infouser[0].address.district.city[0].uid)
        quan=city
   
    }
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
    if(quan == null)
    {
        setDistrict(context.user.Infouser[0].address.district.uid)
        quan=district
       
    }
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
  //load province
  useEffect(() => {
    getCheck()
  }, [province]);
  let getCheck=async()=>{
    let quan=province
    if(quan == null)
    {
        setProvince(context.user.Infouser[0].address.province.uid)
        quan=province
       
    }
  }
  const handleChange = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute('id');
    setCity(optionElementId )
    setDistrict()
    setProvince()
  }
  const handleChange1 = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute('id');
    setDistrict(optionElementId)
  }
  const handleChange2 = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute('id');
    setProvince(optionElementId)
  }



  //submit order 
  const submitorder =async() =>{
    let customer_id=context.user.Infouser[0]?.uid
    let customer_name=context.user.Infouser[0]?.customer_name
    let phone_number=context.user.Infouser[0]?.phone_number
    let address_des = context.user.Infouser[0]?.address.address_des
    let address_type ="1"
    let item=context.dataProduct
    var item1={}
    var cart=[]
    var cart1=[]
    for(var i=0;i<item.length;i++)
    {   
        item1={uid:item[i].iproduct.uid, quantity:item[i].quantity}
        cart.push(item1)
    }
    cart1.push({items:cart})
    var items=cart1[0].items
    console.log("customer_id:",customer_id)
    console.log("customer_name:",customer_name)
    console.log("phone_number:",phone_number)
    console.log("address_des:",address_des)
    console.log("address_type:",address_type)
    console.log("district:",district)
    console.log("province:",province)
    console.log("items:",items)
    let config ={
        headers:{
            "Content-type":"application/json"
        }
      }
      let {data}= await axios.post('http://localhost:60000/api_public/submitOrder',{
        customer_id,customer_name, phone_number,address_des,address_type,district,province,items
      },  
      config)
      setData4(data)
    console.log("d:",data)
  } 
  if(data4.statusCode == 200)
  {
    return <Navigate to="/userprofile"/>
  }
  return (
    <>
    {context.flag ? ( 
      <>
      <br />
      <br />
      <div className="container-fluid pt-5">
          <div className="row px-xl-5">
              <div className="col-lg-8">
                  <div className="mb-4">
                      <h4 className="font-weight-semi-bold mb-4">Billing Address</h4>
                      <div className="row">
                          <div className="col-md-6 form-group">
                              <label>Họ</label>
                              <input className="form-control" type="text" placeholder={fi}/>
                          </div>
                          <div className="col-md-6 form-group">
                              <label>Tên</label>
                              <input className="form-control" type="text" placeholder={la}/>
                          </div>
                          <div className="col-md-6 form-group">
                              <label>E-mail</label>
                              <input className="form-control" type="text" placeholder="example@email.com"/>
                          </div>
                          <div className="col-md-6 form-group">
                              <label>Số điện thoại</label>
                              <input className="form-control" type="text" placeholder={context.user.Infouser[0].phone_number}/>
                          </div>
                          <div className="col-md-6 form-group">
                              <label>Địa chỉ </label>
                              <input className="form-control" type="text" placeholder={context.user.Infouser[0].address.address_des}/>
                          </div>
                          <div className="col-md-6 form-group">
                              <label>Country</label>
                              <select className="custom-select" defaultValue="Default" onChange={handleChange}>
                              <option value=" " hidden>
                              {context.user.Infouser[0].address.district.city[0].name}
                             </option>
                             {data1?.map((item,index)=>(
                                <>
                                <option  id={item.uid}>{item.name} </option>
                                    </>
                                ))}      
                              </select>
                          </div>
                          <div className="col-md-6 form-group">
                              <label>Phường</label>
                              <select className="custom-select" defaultValue="Default" onChange={handleChange1}>
                              <option value=" " hidden>
                              {fla==city? (context.user.Infouser[0].address.district.name):("Vui lòng chọn quận")}
                             </option>
                             {data2?.map((item,index)=>(
                                <>
                                <option  id={item.uid}>{item.name} </option>
                                    </>
                                ))}      
                              </select>
                          </div>
                          <div className="col-md-6 form-group">
                              <label>Quận</label>
                              <select className="custom-select" defaultValue="Default" onChange={handleChange2}>
                              <option value=" " hidden>
                              {fla==city? (context.user.Infouser[0].address.province.name):("Vui lòng chọn phường")
                               }
                             </option>
                             {data3?.map((item,index)=>(
                                <>
                                <option  id={item.uid}>{item.name} </option>
                                    </>
                                ))}    
                              </select>
                          </div>
                          <div className="col-md-6 form-group">
                              <label>ZIP Code</label>
                              <input className="form-control" type="text" placeholder="123"/>
                          </div>
                          <div className="col-md-12 form-group">
                              <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="newaccount"/>
                                  <label className="custom-control-label" htmlFor="newaccount">Create an account</label>
                              </div>
                          </div>
                          <div className="col-md-12 form-group">
                              <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="shipto"/>
                                  <label className="custom-control-label" htmlFor="shipto"  data-toggle="collapse" data-target="#shipping-address">Ship to different address</label>
                              </div>
                          </div>
                      </div>
                  </div>
                  
              </div>
              <div className="col-lg-4">
                  <div className="card border-secondary mb-5">
                      <div className="card-header bg-secondary border-0">
                          <h4 className="font-weight-semi-bold m-0">Tổng tiền</h4>
                      </div>
                      
                      <div className="card-body">
                          <h5 className="font-weight-medium mb-3">Sản phẩm </h5>
                          {context.dataProduct?.map((item,index)=>(
                            <div className="d-flex justify-content-between">
                            <p>{item.iproduct.product_name}</p>
                            <p>{item.quantity}</p>
                            <p>{item.iproduct.pricing.price_with_vat} VNĐ</p>
                        </div>
                            ))}      
                         
                          <hr className="mt-0"/>
                          <div className="d-flex justify-content-between mb-3 pt-1">
                              <h6 className="font-weight-medium">Thành giá </h6>
                              <h6 className="font-weight-medium">{context.total} VNĐ</h6>
                          </div>
                          <div className="d-flex justify-content-between">
                              <h6 className="font-weight-medium">Phí ship</h6>
                              <h6 className="font-weight-medium">{shipping} VNĐ</h6>
                          </div>
                      </div>
                      <div className="card-footer border-secondary bg-transparent">
                          <div className="d-flex justify-content-between mt-2">
                              <h5 className="font-weight-bold">Tổng cộng </h5>
                              <h5 className="font-weight-bold">{context.total+shipping} VNĐ</h5>
                          </div>
                      </div>
                  </div>
                  <div className="card border-secondary mb-5">
                      <div className="card-header bg-secondary border-0">
                          <h4 className="font-weight-semi-bold m-0">Phương thức thanh toán</h4>
                      </div>
                      <div className="card-body">
                          <div className="form-group">
                              <div className="custom-control custom-radio">
                                  <input type="radio" className="custom-control-input" name="payment" id="paypal"/>
                                  <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                              </div>
                          </div>
                          <div className="form-group">
                              <div className="custom-control custom-radio">
                                  <input type="radio" className="custom-control-input" name="payment" id="directcheck"/>
                                  <label className="custom-control-label" htmlFor="directcheck">Tiền mặt</label>
                              </div>
                          </div>
                          <div className="">
                              <div className="custom-control custom-radio">
                                  <input type="radio" className="custom-control-input" name="payment" id="banktransfer"/>
                                  <label className="custom-control-label" htmlFor="banktransfer">Chuyển khoản </label>
                              </div>
                          </div>    
                      </div>
                      <div className="card-footer border-secondary bg-transparent">
                          <button className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" onClick={submitorder}>ĐẶT HÀNG </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </>
      ):(
        navigate("/")
      )}
    </>
  )
}

export default Checkout