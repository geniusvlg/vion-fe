import React,{useState,useEffect,useContext} from 'react'
import styled from "styled-components"
import {Modal} from 'react-bootstrap'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PinterestIcon from '@mui/icons-material/Pinterest';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import {debounce} from "lodash"
import {Navigate} from 'react-router-dom';
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  justify-content:space-around;
  flex-wrap:wrap;
  margin:50px 0;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  max-width:500px;
  min-width:290px;
  height:300px;
  width: 100%;
  display:block;
  object-fit: cover;

`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const ButtonRemove = styled.button`
border: 1px solid teal;
border-radius:5px;
background-color: white;
&:hover{
    background-color:#f8f4f4;
}
`

const ButtonAdd= styled.button`
border: 1px solid teal;
border-radius:5px;
background-color: white;
&:hover{
    background-color:#f8f4f4;
}
`

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

const CardLogin = styled.form`
display: flex;
flex-direction: column;
justify-content: space-evenly;
padding: 10px;
`;

const Input = styled.input`
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
  const [dataProduct1, setDataProduct1] = useState()
  const [quantity,setCount] = useState(0);
  const [state, setState] = useState('start')
  const [uid ,  setUid ]= useState();
  const [error,  setError]= useState();
  const [loading,setLoading]=useState(false) 
  const [inputValue, setInputValue] = useState("");
  const [dataProduct2, setDataProduct2] = useState()
  // Input Field handler
  const handleUserInput = (e) => {
    setInputValue(e.target.value);
  };


  const changeClick =async(e) =>{
    e.preventDefault();
    setCount(1);
    setState('count');
    setUid(product.uid)
  }

const handleClick = debounce(async (action) =>{
        if(action === "remove"){
          setCount(quantity - 1 );
        }
        else{
            setCount(quantity + 1);
        }
        let customer_id=context.user.Infouser[0]?.uid
        let acsess=context.authTokens.acsessToken
        let items={uid,quantity}
          let config ={
            headers:{
                "Content-type":"application/json",
                "authorization": "Bearer "+ acsess
            }
          }
          let {data1}=  await axios.post('http://localhost:60000/api_public/submitCart',{
          customer_id,items
         },
         config)
         setDataProduct1(data1)
    },1000);

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
                      <div className="text-primary mr-2">
                          <small><StarIcon/></small>
                          <small><StarIcon/></small>
                          <small><StarIcon/></small>
                          <small><StarBorderIcon/></small>
                          <small><StarBorderIcon/></small>
                      </div>
                      <small className="pt-1">(50 Reviews)</small>
                  </div>
                  <h3 className="font-weight-semi-bold mb-4">{product.pricing.price_with_vat} VNĐ</h3>
                  <p className="mb-4">Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit clita ea. Sanc invidunt ipsum et, labore clita lorem magna lorem ut. Erat lorem duo dolor no sea nonumy. Accus labore stet, est lorem sit diam sea et justo, amet at lorem et eirmod ipsum diam et rebum kasd rebum.</p>
  
                  <div className="d-flex align-items-center mb-4 pt-2">
                  {context.user? (
                    <>
                     {state === 'start' && (
                           <button className="btn btn-primary px-3" onClick={(event)=>changeClick(event)}><i className="mr-1"><ShoppingCartIcon/></i> Add To Cart</button>)}
                     {state === 'count' && (
                        <div className="input-group quantity mr-3" style={{width: "130px"}}>

                        <div className="input-group-btn">
                            <button className="btn btn-primary btn-minus"  action="remove" onClick={()=>handleClick("remove")}><RemoveIcon/></button>
                        </div>
                        {quantity<1 ?(setState('start')):(
                        <input type="text" className="form-control bg-secondary text-center" value={quantity}/>
                        )}
                        <div className="input-group-btn">
                            <button className="btn btn-primary btn-plus" action="add" onClick={()=>handleClick("add")}><AddIcon/></button>
                        </div>
                 
                    </div>
                     )}
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
                      <a className="nav-item nav-link active" data-toggle="tab" href="#tab-pane-1">Description</a>
                      <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-2">Information</a>
                      <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">Reviews (0)</a>
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
                                  <h4 className="mb-4">1 review for "Colorful Organic Papaya"</h4>
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