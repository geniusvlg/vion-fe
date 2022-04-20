import React,{useState,useEffect,useContext}  from 'react'
import { AuthContext } from '../context/AuthContext';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap'
import {Navigate} from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { styled } from '@mui/styles';

import axios from 'axios';
// Importing toastify module
import {toast} from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import {debounce} from "lodash"
toast.configure()


const Cart = styled(ShoppingCartIcon)({
  color:'#ffbb33'
});

const Eye = styled(RemoveRedEyeIcon)({
  color:'#ffbb33'
})

function MyVerticallyCenteredModal(props) {
  const [redirect,setRedirect] = useState();
  if(redirect){
    return <Navigate to="/signIn"/>
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Có lẽ quý khách chưa đăng kí hoặc đăng nhập để trở thành thành viên của chúng tôi
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <button type='submit' className="btn btn-sm text-dark p-0" onClick={() => setRedirect(true)}>Tiếp tục</button>
      </Modal.Footer>
    </Modal>
  );
}


const Cards = ({data}) => {
  const [modalShow, setModalShow]=useState(false);
  const context=useContext(AuthContext)
  // Xử lý số lượng sản phẩm 
  const [quantity,setCount] = useState(1);
  const [dataProduct1, setDataProduct1] = useState()

  const changeClick = async(e) =>{
    let customer_id=context.user.Infouser[0]?.uid
    let acsess=context.authTokens?.acsessToken
    setCount(quantity + 1);
    let uid =e.currentTarget.id;
    let items={uid,quantity}
   
    let config ={
      headers:{
          "Content-type":"application/json",
          "authorization": "Bearer "+ acsess
      }
    }
    let data1=  await axios.post('http://localhost:60000/api_public/submitCart',{
    customer_id,items
   },
   config)
   console.log("data:",data1)
   if(data1.data.info.statuscode==200)
   {
    setDataProduct1(data1.data.info)
    toast.success(data1.data.info.message, {
      position: toast.POSITION.BOTTOM_LEFT, autoClose:3000})
   }
   else 
   {
    toast.error(data1.data.info.message, {
      // Set to 15sec
      position: toast.POSITION.BOTTOM_LEFT, autoClose:3000})
   }
   
  }
  
  return (
    <> 
        <div className='col-lg-3 col-md-6 col-sm-12 pb-1'>
          <div className='card product-item border-0 mb-4'>
            {/* Card Header */}
            <div className='card-header product-img position-relative overflow-hidden bg-transparent border p-0'>
              <img className='img-fluid w-100 ' src={data.image_cover ?? ''} alt="" />
            </div>
            {/* Card Body */}
            <div className='card-body border-left border-right text-center p-0 pt-2 pb-2'>
              <h6 className='text-truncate mb-3'>{data.product_name}</h6>
              <div className='d-flex justify-content-center'>
                <h6>{data.pricing.price_with_vat} đồng</h6><h6 className="text-muted ml-2"><del>-{data.pricing.discount}%</del></h6>
              </div>
            </div>
            {/* Card Footer */}
            <div className="card-footer d-flex justify-content-between bg-light border">
              <a href={`/product_details/${data.uid}`} className="btn btn-sm text-dark p-0"><i className="text-primary mr-1"><Eye/></i>View Detail</a>
              {context.user? (
                <>
                    <button id={data.uid} onClick={(event)=>changeClick(event)} className="btn btn-sm text-dark p-0"><i className="text-primary mr-1"><Cart/></i>Thêm</button>
                </>
              ) : (
                <>
                <button onClick={() => setModalShow(true)} className="btn btn-sm text-dark p-0"><i className="text-primary mr-1"><Cart/></i>Thêm</button>
                <MyVerticallyCenteredModal show={modalShow} onHide={()=>setModalShow(false)}/>
                </>
              ) }
            </div>
          </div>
        </div>
        
    </>
  )
}

export default Cards



