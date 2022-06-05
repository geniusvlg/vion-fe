import React,{useContext,useEffect,useState} from "react";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeIcon from '@mui/icons-material/Home';
import '../css/Order.css'
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";




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




const CardH3 = styled.h1`
  padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 12px;
  padding-left: 10px;
  color: black;
  white-space: nowrap;
`;



const CardH5 = styled.h1`
  padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 20px;
  padding-left: 10px;
  color: black;
   text-align: right;
`;

const ImgContainer = styled.div`
  max-width: 18%;


`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;


const History = () => {
  const context=useContext(AuthContext)
  const [Slide,setSlide]=useState(0)
  const [time,setTime]=useState(null)
  const [data1,setData1]=useState([])
  const shipping = 5000
  const [expandedId, setExpandedId] = React.useState(-1);
  const handleExpandClick = i => {
    setExpandedId(expandedId === i ? -1 : i);
  };
 useEffect(() => {
  getOrder()
 }, [Slide,time]);

 
 // Tình trạng đơn hàng
let conver2=(data2)=>{
  let postTime=''
  if(data2 == 1)
  {
    postTime= 'Xác nhận đơn hàng' 
  }
  else if(data2 ==  2)
  {
    postTime= 'Chuẩn bị hàng' 
  }
  else if(data2 ==  3)
  {
    postTime= 'Kiểm tra chất lượng ' 
  }
  else if(data2 == 4)
  {
    postTime= 'Vận chuyển' 
  }
  else if(data2 ==  5)
  {
    postTime= 'Nhận hàng' 
  }
  else 
  {
    postTime= 'Đã hủy' 
  }
  return postTime
}
 let getOrder=async()=>{
   let date1=Date.parse(time)
   let phone_number=context?.user.Infouser[0].phone_number
   let config ={
     headers:{
         "Content-type":"application/json"
     }
   }
   let {data}= await axios.post(`${process.env.HOST_URL}/api_public/getHistoryOrderListByPhonenumber/`,{
     phone_number,date1,Slide
   },  
   config)
   setData1(data)
 }
 console.log("data nè :",data1)

  return(
    <>
      <div className='container-fluid pt-5'>
      <div className='row px-xl-5'>
        {/* Shop Sidebar start */}
        <div className='col-lg-3 col-md-12'>
          {/* Filter by Catergories start */}
          <div className='border-bottom mb-4 pb-4'>
            <h5 className='font-weight-semi-bold mb-4'>Lọc </h5>
            <label> Dựa trên ngày </label>
            <input id="party" type="datetime-local" name="partydate" onChange={event => setTime(event.target.value)} />
            <br></br> <br></br>
            <label> Dựa theo giá </label>
            <input type="range" min={0} max={661000} value={Slide} className="slider" onChange={event => setSlide(event.target.value)} />
               <div className="value">{Slide } đồng </div>
          </div>
        </div>

        {/* Shop Product Start */}
        <div className='col-lg-9 col-md-12'>
          <div className='row pb-3'>              
            <div className='container-fluid pt-5'>
                
            {/* Shop Product Start */}
            {data1.statusCode==200?
          ( 
            <>
            
            {data1?.a.map((it,i)=>(
            <>
          <div className='container pb-3 mb-1' key={it.uid}>
            <div className='card mb-3'>
              <div className='p-4 text-center text-white text-lg bg-dark rounded-top'><span className='text-uppercase'>Mã đơn hàng-</span><span className='text-medium'>{it.order_id}</span></div>
              <div className='d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary'>
                <div className="w-100 text-center py-1 px-2"><span className="text-medium">Khu vực giao:</span> Nội địa</div>
                <div className="w-100 text-center py-1 px-2"><span className="text-medium">Tình trạng:</span>{conver2(it.order_status)}</div>
                <div className="w-100 text-center py-1 px-2"><span className="text-medium">Thời gian :</span>{new Date(it.created_at).toLocaleDateString()}</div>
              </div>
              <div className='card-body'>
                <div className='steps d-flex flex-wrap flex-sm-nowrap justify-content-between pt-2 pb-1'>

                    <div className={it.order_status >= 1 ? "step completed" : "step"}>
                      <div className="step-icon-wrap">
                        <div className="step-icon"><ShoppingCartIcon/></div>
                      </div>
                      <h4 className="step-title">Xác nhận đơn hàng</h4>
                    </div>

                    <div className={it.order_status >= 2 ? "step completed" : "step"}>
                      <div className="step-icon-wrap">
                        <div className="step-icon"><SettingsIcon/></div>
                      </div>
                      <h4 className="step-title">Chuẩn bị hàng</h4>
                    </div>

                    <div className={it.order_status >= 3 ? "step completed" : "step"}>
                      <div className="step-icon-wrap">
                        <div className="step-icon"><AssignmentTurnedInIcon/></div>
                      </div>
                      <h4 className="step-title">Kiểm tra chất lượng </h4>
                    </div>

                    <div className={it.order_status >= 4 ? "step completed" : "step"}>
                      <div className="step-icon-wrap">
                        <div className="step-icon"><LocalShippingIcon/></div>
                      </div>
                      <h4 className="step-title">Vận chuyển</h4>
                    </div>

                    <div className={it.order_status >= 5 ? "step completed" : "step"}>
                      <div className="step-icon-wrap">
                        <div className="step-icon"><HomeIcon/></div>
                      </div>
                      <h4 className="step-title">Nhận hàng</h4>
                    </div>

                </div>
                <div className='text-center mb-4'>
            <div className='d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center'>
            <div className="text-left text-sm-right">    
             <IconButton
               className="btn btn-outline-primary btn-rounded btn-sm"
              onClick={() => handleExpandClick(i)}
              aria-expanded={expandedId === i}
              aria-label="show more"
            >
              Xem thông tin chi tiết
            </IconButton></div>
            </div>  
            </div>
              </div>
            </div>
         
       
            <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
              <CardContent>
              {it?.sub_orders[0]?.order_items?.map((item,index)=>(
                  <div key={index} >
                  <CardFieldset>
                  <ImgContainer>
                  <Image src={item.product.image_cover} />
                  </ImgContainer>
                    <CardInform>
                    <CardH3>{item.product.product_name}</CardH3>
                    </CardInform>
                  <CardH5>{item.cost_price} VNĐ * {item.quantity}</CardH5>
                  </CardFieldset>
                  </div>
                  ))}
                  <CardH5>Tiền hàng: {it.total_pay} VNĐ</CardH5>
                  <CardH5>Phí giao hàng: {shipping} VNĐ</CardH5>
                  <CardH5>Tổng: {it.total_pay+shipping} VNĐ</CardH5>
              </CardContent>
            </Collapse>

          </div>
          </>
          ))}
          </>
        ) : (  
          <>
                <h2>{data1?.message}</h2>
          </>
      ) } 
      </div>
          </div>
        </div>
        
      </div>
    </div>
  </>
      )
};

export default History;
/*<div className='text-center mb-4'>
<div className='d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center'>
<div className="text-left text-sm-right"><a className="btn btn-outline-primary btn-rounded btn-sm" onClick={() => handleExpandClick(i)} href="#">Xem chi tiết đơn hàng</a></div>
</div>  
</div>

<div >
{it?.sub_orders[0]?.order_items?.map((item,index)=>(
<div in={expandedId === i} timeout="auto" unmountOnExit>
<CardFieldset>
<ImgContainer>
<Image src={item.product.image_cover} />
</ImgContainer>
  <CardInform>
  <CardH3>{item.product.product_name}</CardH3>
  </CardInform>
<CardH5>{item.cost_price} VNĐ * {item.quantity}</CardH5>
</CardFieldset>
</div>
))}
<CardH5>Tiền hàng: {it.total_pay} VNĐ</CardH5>
<CardH5>Phí giao hàng: {shipping} VNĐ</CardH5>
<CardH5>Tổng: {it.total_pay+shipping} VNĐ</CardH5>
</div>*/