import React,{useState,useContext,useEffect}  from 'react'
import { AuthContext } from '../../context/AuthContext'
import {useNavigate} from 'react-router-dom';
import ErrorMessage from "../../components/ErrorMessage";
import axios from 'axios';
import "./Checkout.css"
// Importing toastify module
import {toast} from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const Checkout = () => {
    const context=useContext(AuthContext)
    let navigate=useNavigate()
    let shipping=5000
    let fullname=context.user.Infouser[0]?.full_name
    const [data1,setData]=useState([])
    const [data2,setData2]=useState([])
    const [data3,setData3]=useState([])
    const [data4,setData4]=useState([])
    const [data5,setData5]=useState([])
    const [data6,setData6]=useState([])
    const [city,setCity]=useState(context.user.Infouser[0].address?.district.city[0].uid)
    const [district,setDistrict]=useState()
    const [province,setProvince]=useState()
    const [voucherr,setVoucher]=useState(null)
    const [giamgia,setGiam]=useState()
    const [total,setTotal]=useState()
    const [error,setError]=useState(false);
    const [customer_id,setcustomer_id]=useState(context.user.Infouser[0]?.uid)
    const [customer_name,setcustomername]=useState(context.user.Infouser[0]?.customer_name)
    const [phone_number,setphonenumber]=useState(context.user.Infouser[0]?.phone_number)
    const [address_des,setaddressdes]=useState(context.user.Infouser[0]?.address?.address_des)
    const [checked, setChecked] = useState(false);
    let [fi,setFi]=useState()
    let  [la,setLa]=useState()
    fi=fullname.split(' ').slice(0,1).join(' ')
    la=fullname.split(' ').slice(1,3).join(' ')
    let fla =context.user.Infouser[0].address?.district.city[0].uid

  // get own voucher 
  useEffect(() => {
    getVoucher()
  }, []);
  let getVoucher=async()=>{
    console.log("cus_id:",customer_id)
    let config ={
      headers:{
          "Content-type":"application/json"
      }
    }
    let {data}= await axios.post(`${process.env.REACT_APP_HOST_URL}/api_public/listVouch`,{
        customer_id
    },  
    config)
    setData6(data.data)
  }
  // get cart 
  useEffect(async () => {
        let acsess=context.authTokens.acsessToken
        let user_name=context.user.Infouser[0]?.customer_name
        let config ={
          headers:{
              "Content-type":"application/json",
              "authorization": "Bearer "+ acsess
          }
        }
        let {data}= await axios.post(`${process.env.REACT_APP_HOST_URL}/api_public/getCart/`,{
          user_name
        },  
        config)
        console.log("data5:",data.Check[0]?.cart_items)
        setData5(data.Check[0]?.cart_items)
        var x=0
        for(var i=0;i<data.Check[0]?.cart_items.length;i++)
        {
          x=x+((data.Check[0]?.cart_items[i].iproduct.pricing.price_with_vat-data.Check[0]?.cart_items[i].iproduct.pricing.price_with_vat*data.Check[0]?.cart_items[i].iproduct.pricing.discount/100)*data.Check[0]?.cart_items[i].quantity)
        }
        setTotal(x)
  }, []);
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
    let quan=city
    if(quan == null)
    {
       
        setCity(context.user.Infouser[0].address?.district.city[0].uid)
        quan=city
   
    }
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
  }

  //chon phuong and show phuong
  useEffect(() => {
    getprovince()
  }, [district]);
  let getprovince=async()=>{
    let quan=district
    if(quan == null)
    {
        setDistrict(context.user.Infouser[0].address?.district.uid)
        quan=district
       
    }
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
  //load province
  useEffect(() => {
    getCheck()
  }, [province]);
  let getCheck=async()=>{
    let quan=province
    if(quan == null)
    {
        setProvince(context.user.Infouser[0].address?.province.uid)
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
  const handleChange3 = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute('id');
    const optionElementvalue = optionElement.getAttribute('value');
    setGiam(optionElementvalue/100)
    setVoucher(optionElementId)
  }
  //submit order 
  const submitorder =async() =>{
    let full_name= fi+' '+ la
    
    if(phone_number==null || address_des==null ||district==null ||province==null || la==null || fi==null  )
    {
        setError("Vui lòng điền đầy đủ thông tin")
    }
    else
    {
       /* if(checked)
        {
          let config ={
            headers:{
                "Content-type":"application/json"
            }
          }
          let {data}= await axios.post(`${process.env.REACT_APP_HOST_URL}/api_public/list/fixadd`,{
            customer_id,full_name,address_des,district,province,gender,voucher
          },  
          config)
        }*/
        
        let address_type ="1"
        let item=data5
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
        let config ={
            headers:{
                "Content-type":"application/json"
            }
        }
        let {data}= await axios.post(`${process.env.REACT_APP_HOST_URL}/api_public/submitOrder`,{
            customer_id,full_name,customer_name, phone_number,address_des,address_type,district,province,items,voucherr
        },  
        config)
        setData4(data)
    }
  } 
  if(data4.statusCode == 200)
  {
      context.deleteAll()
      const customId = "custom-id-yes";
      toast.success(data4.message, {
        position: toast.POSITION.TOP_CENTER, autoClose:1000,
        toastId: customId,
        onClose:() =>navigate(`/userprofile`),
    
      })
  }
  console.log("value:",giamgia)

  return (
    <>
    {context.flag ? ( 
      <>
      <br />
      <br />
      <br />
      <div className="container-fluid pt-5">
          <div className="row px-xl-5">
              <div className="col-lg-8">
                  <div className="mb-4">
                      <h4 className="font-weight-semi-bold mb-4">Billing Address</h4>
                      <div>
                            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                    </div>
                      <div className="row">
                          <div className="col-md-6 form-group">
                              <label>Họ</label>
                              <input className="form-control" type="text" placeholder={fi} />
                          </div>
                          <div className="col-md-6 form-group">
                              <label>Tên</label>
                              <input className="form-control" type="text" placeholder={la} />
                          </div>
                          <div className="col-md-6 form-group">
                              <label>Số điện thoại</label>
                              <input className="form-control" type="text" placeholder={context.user.Infouser[0].phone_number} onInput={e => setphonenumber(e.target.value)}/>
                          </div>
                          <div className="col-md-6 form-group">
                              <label>Địa chỉ </label>
                              <input className="form-control" type="text" placeholder={context.user.Infouser[0].address?.address_des} onInput={e => setaddressdes(e.target.value)}/>
                          </div>
                          <div className="col-md-6 form-group">
                              <label>Thành phố</label>
                              <select className="custom-select" defaultValue="Default" onChange={handleChange}>
                              <option value=" " hidden>
                              {context.user.Infouser[0].address?.district.city[0].name}
                             </option>
                             {data1?.map((item,index)=>(
                                <>
                                <option key={index} id={item.uid}>{item.name} </option>
                                    </>
                                ))}      
                              </select>
                          </div>
                          <div className="col-md-6 form-group">
                              <label>Phường</label>
                              <select className="custom-select" defaultValue="Default" onChange={handleChange1}>
                              <option value=" " hidden>
                              {fla==city? (context.user.Infouser[0].address?.district.name):("Vui lòng chọn quận")}
                             </option>
                             {data2?.map((item,index)=>(
                                <>
                                <option key={index} id={item.uid}>{item.name} </option>
                                    </>
                                ))}      
                              </select>
                          </div>
                          <div className="col-md-6 form-group">
                              <label>Quận</label>
                              <select className="custom-select" defaultValue="Default" onChange={handleChange2}>
                              <option value=" " hidden>
                              {fla==city? (context.user.Infouser[0].address?.province.name):("Vui lòng chọn phường")
                               }
                             </option>
                             {data3?.map((item,index)=>(    
                                <>
                                <option key={index}  id={item.uid}>{item.name} </option>
                                    </>
                                ))}    
                              </select>
                          </div>
                  
    
                      </div>
                  </div>
                  
              </div>
              <div className="col-lg-4">
                {customer_name!==phone_number?(
              <form className="mb-5" action="">
              <h4 className="font-weight-semi-bold m-0">Voucher</h4>
                    <div className="input-group">
                    <select className="custom-select" defaultValue="Default" onChange={handleChange3}>
                              <option value="" hidden>
                                Vui lòng chọn voucher của bạn
                             </option>
                             {data6?.map((item,index)=>(
                                <>
                                <option key={index} id={item.uid} value={item.applied_value}>{item.voucher_uid}  </option>
                                    </>
                                ))}      
                              </select>
                    </div>
                </form>):(<></>)}
                  <div className="card border-secondary mb-5">
                      <div className="card-header bg-secondary border-0">
                          <h4 className="font-weight-semi-bold m-0">Tổng tiền</h4>
                      </div>
                      
                      <div className="card-body">
                          <h5 className="font-weight-medium mb-3">Sản phẩm </h5>
                          {data5?.map((item,index)=>(
                            <div className="d-flex justify-content-between" key={index}>
                            <p>{item.iproduct.product_name}</p>
                            <p>{item.quantity}</p>
                            <p>{item.iproduct.pricing.price_with_vat} VNĐ</p>
                        </div>
                            ))}      
                         
                          <hr className="mt-0"/>
                          <div className="d-flex justify-content-between mb-3 pt-1">
                              <h6 className="font-weight-medium">Thành giá </h6>
                              <h6 className="font-weight-medium">{total} VNĐ</h6>
                          </div>
                          <div className="d-flex justify-content-between">
                              <h6 className="font-weight-medium">Phí ship</h6>
                              <h6 className="font-weight-medium">{shipping} VNĐ</h6>
                          </div>
                      </div>
                      <div className="card-footer border-secondary bg-transparent">
                          <div className="d-flex justify-content-between mt-2">
                              <h5 className="font-weight-bold">Tổng cộng </h5>
                              <h5 className="font-weight-bold">{giamgia? total-total*giamgia+shipping : total+shipping} VNĐ</h5>
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
                                  <input type="checkbox" defaultChecked={checked}  onChange={() => setChecked(!checked)} className="custom-control-input" name="payment" id="banktransfer"/>
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