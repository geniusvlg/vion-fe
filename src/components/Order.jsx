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
const Styles = styled.div`
  display: flex;
  align-items: center;
  color: #888;
  margin-top: 2rem;
  margin-bottom: 2rem;
  .value {
    flex: 1;
    font-size: 2rem;
  }
.slider {
  flex: 6;
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #efefef;
  outline: none;
}
`;
const CardWrapper = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  margin: 48px auto 0;
  width: 1000px;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  background-color: #ffffff;
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
const CardH1 = styled.h1`
  padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 24px;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  padding-left: 10px;
  border-radius: 35px;
  color: black;

`;

const CardH2 = styled.div`
  padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 16px;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  padding-left: 10px;
  color: black;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  border: .1rem solid #ddd;
  &:hover {
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.16);
    transform: translate(0, -1px);
  }
`;

const CardH3 = styled.h1`
  padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 12px;
  padding-left: 10px;
  color: black;
  white-space: nowrap;
`;

const CardH4 = styled.h1`
  padding: 7px 0;
  width: 100%;
  font-family: inherit;
  padding-left: 10px;
  color: black;
   text-align: right;
  border-bottom: 0.1rem #bababa solid;
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


const CardQuit = styled.a`
  display: block;
  width: 20%;
  padding: 12px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: #a8a8a8;
  cursor: pointer;
  text-align: center;
  &:hover{
    color: black;
  }
`;

const CardButton = styled.button`
  display: block;
  width: 50%;
  padding: 12px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: black;
  background-color: #ffffff;
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



const Order = () => {
  const context=useContext(AuthContext)
  const [Slide,setSlide]=useState(0)
  const [time,setTime]=useState(null)
  const [data1,setData1]=useState([])
  const [data2,setData2]=useState([])
  const shipping = 5000
  const [expandedId, setExpandedId] = React.useState(-1);
  const handleExpandClick = i => {
    setExpandedId(expandedId === i ? -1 : i);
  };
 useEffect(() => {
  getOrder()
 }, [Slide,time]);
 // Thời giạn thực hiện
 let conver=(data2)=>{
  let data= new Date(data2)
  let hrs = data.getHours()
  let mins = data.getMinutes()
  var date =data.getDate();
  var month = data.getMonth(); //Be careful! January is 0 not 1
  var year = data.getFullYear();
  if(hrs<=9)
     hrs = '0' + hrs
  if(mins<10)
    mins = '0' + mins
  const postTime= hrs + ':' + mins + '-' + date + '/' + month + '/' + year
  return postTime
}
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
   let phone_number=context.user.Infouser[0].phone_number
   let config ={
     headers:{
         "Content-type":"application/json"
     }
   }
   let {data}= await axios.post('http://localhost:60000/api_public/getPresentOrderListByPhonenumber/',{
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
            <label for="party"> Dựa trên ngày </label>
            <input id="party" type="datetime-local" name="partydate" onChange={event => setTime(event.target.value)} />
            <br></br> <br></br>
            <label for="price"> Dựa theo giá </label>
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
                <div class="w-100 text-center py-1 px-2"><span class="text-medium">Khu vực giao:</span> Nội địa</div>
                <div class="w-100 text-center py-1 px-2"><span class="text-medium">Tình trạng:</span>{conver2(it.order_status)}</div>
                <div class="w-100 text-center py-1 px-2"><span class="text-medium">Thời gian :</span>{conver(it.created_at)}</div>
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
            <div class="text-left text-sm-right">    
             <IconButton
               class="btn btn-outline-primary btn-rounded btn-sm"
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
                  <div >
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
export default Order;
/*<CardH3>gIAO HÀNG LÚC: 16.00 - 8/11</CardH3>
{data1.map((it,index)=>(
     <div>
        <CardInform>
            <CardH3>{it.order_id}</CardH3>
             <CardH3>Người nhận: {context.user.Infouser[0]?.full_name}</CardH3>
             <CardH3>Địa chỉ nhận hàng:{it.address_des}</CardH3>
        </CardInform>
        
         {it.sub_orders[0].order_items?.map((item,index)=>(
            <CardFieldset>
            <ImgContainer>
            <Image src={item.product.image_cover} />
            </ImgContainer>
                 <CardInform>
                <CardH3>{item.product.product_name}</CardH3>
                <CardH3>Chất lượng loại 1</CardH3>
                </CardInform>
              <CardH5>{item.cost_price} VNĐ * {item.quantity}</CardH5>
            </CardFieldset>
          ))}      

        <CardH5>Tiền hàng: {it.total_pay} VNĐ</CardH5>
        <CardH5>Phí giao hàng: {shipping} VNĐ</CardH5>
        <CardH5>Tổng: {it.total_pay+shipping} VNĐ</CardH5>  
     </div>  
     ))}




*/