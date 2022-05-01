import React,{useState,useEffect,useContext} from 'react'
import styled from "styled-components"
import {Modal} from 'react-bootstrap'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PinterestIcon from '@mui/icons-material/Pinterest';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import {debounce} from "lodash"
import {Navigate} from 'react-router-dom';
// Importing toastify module
import {toast} from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


const Button = styled.button`
font-size: 1.3rem;
padding: .5rem 1.5rem;
background: linear-gradient(135deg, #ff934b 0%, #ff5e62 100%);
color: #fff;
font-weight: bold;
border-radius: 5rem;
outline:none;
cursor: pointer;
border: none;
&:hover{
  transform: scale(1.1);
  transition: .2s linear;
}
`;



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
        <Button type='submit' onClick={() => setRedirect(true)}>Tiếp tục</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Description = ({product}) => {  
  
  const [modalShow, setModalShow]=useState(false);
  const context=useContext(AuthContext)
  const [inputValue, setInputValue] = useState("");
  const [dataProduct1, setDataProduct1] = useState()
  const [dataProduct2, setDataProduct2] = useState()
  // Input Field handler
  const handleUserInput = (e) => {
    setInputValue(e.target.value);
  };

console.log("product:",product)
const changeClick =async (e) =>{
  let quantity=1
  let customer_id=context.user.Infouser[0]?.uid
  let user_name=context.user.Infouser[0]?.customer_name
  let acsess=context.authTokens?.acsessToken
  let uid =e.currentTarget.id;
  let items={uid,quantity}
  let config ={
    headers:{
        "Content-type":"application/json",
        "authorization": "Bearer "+ acsess
    }
  }
  let data1=  await axios.post('http://localhost:60000/api_public/addCart/',{
  customer_id,items,user_name
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

  //submit comment
const submitComment= async(e)=>{
  let acsess=context.authTokens.acsessToken
  let customerid=context.user.Infouser[0]?.uid
  let productid=product?.uid
  let comment=inputValue
  let config ={
    headers:{
        "Content-type":"application/json"
    }
  }
  let {data}= await axios.post('http://localhost:60000/api_public/pushcomment',{
    productid,
    customerid,
    comment
  },  
  config)
  setDataProduct2(data)
  if(data.statusCode==200)
  {
    setInputValue('');
  }
  else
  {
    console.log("ok")
  }
}
console.log("datane:",dataProduct2)
    return (
      <>
      <div className='container-fluid py-5'>
          <div className='row px-xl-5'>
              <div className='col-lg-5 pb-5'>
                  <img src={product.image_cover} alt=""  className='w-100 h-100'/>
              </div>
  
              <div className='col-lg-7 pb-5'>
                  <h3 className='font-weight-semi-bold'>{product.product_name}</h3>
                  <div className="d-flex mb-3">
                      <small className="pt-1">({product.comments.length} Bình luận)</small>
                  </div>
                  <h3 className="font-weight-semi-bold mb-4">{product.pricing.price_with_vat} VNĐ</h3>
                  <p className="mb-4">Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit clita ea. Sanc invidunt ipsum et, labore clita lorem magna lorem ut. Erat lorem duo dolor no sea nonumy. Accus labore stet, est lorem sit diam sea et justo, amet at lorem et eirmod ipsum diam et rebum kasd rebum.</p>
  
                  <div className="d-flex align-items-center mb-4 pt-2">
                  {context.user? (
                    <>
                     
                     <button className="btn btn-primary px-3" id={product.uid} onClick={(event)=>changeClick(event)}><i className="mr-1"><ShoppingCartIcon/></i> Add To Cart</button>
                    </>
                    ) : ( 
                      <>
                        <button className="btn btn-primary px-3" onClick={() => setModalShow(true)}><i className="mr-1"><ShoppingCartIcon/></i> Add To Cart</button>
                        <MyVerticallyCenteredModal show={modalShow} onHide={()=>setModalShow(false)}/>
                      </>
                    )}
                  
                  </div>
  
                  <div className="d-flex pt-2">
                      <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                      <div className="d-inline-flex">
                          <a className="text-dark px-2" href=""><i><FacebookOutlinedIcon/></i></a>
                          <a className="text-dark px-2" href=""><i><TwitterIcon/></i></a>
                          <a className="text-dark px-2" href=""><i><InstagramIcon/></i></a>
                          <a className="text-dark px-2" href=""><i><PinterestIcon/></i></a>
                      </div>
                  </div>
              </div>
          </div>
  
          {/* Review start */}
          <div className='row px-xl-5'>
              <div className='col'>
                  <div className="nav nav-tabs justify-content-center border-secondary mb-4">
                      <a className="nav-item nav-link active" data-toggle="tab" href="#tab-pane-1">Mô tả sản phẩm </a>
                      <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-2">Thông tin thêm</a>
                      <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">Bình luận({product.comments.length})</a>
                  </div>
  
                  <div className='tab-content'>
                      <div className="tab-pane fade show active" id="tab-pane-1">
                          <h4 className="mb-3">Product Description</h4>
                          <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p>
                          <p>Dolore magna est eirmod sanctus dolor, amet diam et eirmod et ipsum. Amet dolore tempor consetetur sed lorem dolor sit lorem tempor. Gubergren amet amet labore sadipscing clita clita diam clita. Sea amet et sed ipsum lorem elitr et, amet et labore voluptua sit rebum. Ea erat sed et diam takimata sed justo. Magna takimata justo et amet magna et.</p>
                      </div>
  
                      <div className="tab-pane fade" id="tab-pane-2">
                          <h4 className="mb-3">Additional Information</h4>
                          <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p>
                      </div>
                      
                        {/*Binh luan*/}
                      <div className='tab-pane fade' id="tab-pane-3">
                          <div className='row'>
                        
                              <div className='col-md-6'>
                                  <h4 className="mb-4">({product.comments.length} Bình luận cho sản phẩm) </h4>
                                  {product?.comments?.map((item,index)=>(
                                  <div className='media mb-4'>
                                  <AccountCircleIcon/> 
                                      <div className="media-body">
                                          <h6>{item.customer_id?.customer_name}<small> - <i>{ Date(item.comment_at * 100)}</i></small></h6>
                                          <div className="text-primary mb-2">
                                          <small><StarIcon/></small>
                                          <small><StarIcon/></small>
                                          <small><StarIcon/></small>
                                          <small><StarBorderIcon/></small>
                                          <small><StarBorderIcon/></small>
                                          </div>
                                          <p>{item.comment_info}</p>
                                      </div>
                                  </div>
                                  ))} 
                              </div>
                            

                              <div className="col-md-6">
                                  <h4 className="mb-4">Leave a review</h4>
                                 {/* <div className="d-flex my-3">
                                      <p className="mb-0 mr-2">Your Rating * :</p>
                                      <div className="text-primary">
                                      <small><StarIcon/></small>
                                      <small><StarIcon/></small>
                                      <small><StarIcon/></small>
                                      <small><StarBorderIcon/></small>
                                      <small><StarBorderIcon/></small>
                                      </div>
                                  </div>*/}
                                   {context.user? (     
                                      <form>
                                      <div className="form-group">
                                          <label for="message">Your Review *</label>
                                          <textarea id="message" cols="30" rows="5" className="form-control"  value={inputValue} onChange={handleUserInput}></textarea>
                                      </div>
                                      {/*<div className="form-group">
                                          <label for="name">Your Name *</label>
                                          <input type="text" className="form-control" id="name"/>
                                      </div>
                                      <div className="form-group">
                                          <label for="email">Your Email *</label>
                                          <input type="email" className="form-control" id="email"/>
                                      </div>*/}
                                      <div className="form-group mb-0">
                                          <input type="submit" value="Leave Your Review" className="btn btn-primary px-3"  onClick={(event)=>submitComment(event)}/>
                                      </div>
                                  </form>   ) : (    
                                          <>
                                          <button className="btn btn-primary px-3" onClick={() => setModalShow(true)}><i className="mr-1"><ShoppingCartIcon/></i>Đăng nhập để bình luận </button>
                                          <MyVerticallyCenteredModal show={modalShow} onHide={()=>setModalShow(false)}/>
                                        </>
                                    )}
                              
                              </div>
  
                          </div>
                      </div> 
                  </div>
              </div>
          </div>
  
          {/* <Related_Product/> */}
      </div>
  </>
    )
}

export default Description