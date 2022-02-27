import React,{useState,useEffect,useContext}  from 'react'
import { AuthContext } from '../context/AuthContext';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useCart} from 'react-use-cart'
import {Modal} from 'react-bootstrap'
import {Navigate} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';
import {debounce} from "lodash"
const StyledLink = styled(Link)`
    text-decoration: none;
    font-weight: bold;
    
    &:hover, &:active {
        text-decoration:underline;
    }
`;

const styles = {
    width: "170px",
    height: "185px",
};
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


const Cards = ({data}) => {
  const [modalShow, setModalShow]=useState(false);
  const [customer_id, setCustomerid]=useState()
  const context=useContext(AuthContext)
  const [dataProduct1, setDataProduct1] = useState()
 /* useEffect(()=>{
    changeClick()
  },[])*/

  /*useEffect(()=>{
  handleClick()
  },[])*/

  // Xử lý số lượng sản phẩm 
  const [quantity,setCount] = useState(0);
  const [state, setState] = useState('start')
  const [uid ,  setUid ]= useState();
  const [error,  setError]= useState();
  const [loading,setLoading]=useState(false) 
  

  const changeClick =async(e) =>{
    e.preventDefault();
    setCount(1);
    setState('count');
    setUid(e.currentTarget.id);
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
  /*const handleId = (e) => {
    e.preventDefault();
     console.log(e.currentTarget.id);
     console.log(arr.data[0].uid)
  }*/
  return (
          <div className="box">
              <span className="discount">-{data.pricing.discount}%</span>
              <div className="corner-box"><span /></div>
              <StyledLink to= {`/product_details/${data.uid}`}><img src={data.image_cover ?? ''} style={styles}/></StyledLink>
              <h3>{data.product_name}</h3>
              <p>Trọng lượng- <span>1</span>kg</p>
              <p>Giá- <span>{data.pricing.price_with_vat}</span>đồng</p>
              <AddContainer>
              {context.user? (
                <>
                    {state === 'start' && (
                    <Button id={data.uid} onClick={(event)=>changeClick(event)} >Thêm</Button>
                 )}
                  {state === 'count' && 
                  (<AmountContainer>
              <ButtonRemove id={data.uid} action="remove" onClick={()=>handleClick("remove")}><RemoveIcon/></ButtonRemove>
              <Amount>
              {quantity<1 ?(setState('start')):(quantity)}
              </Amount>
              <ButtonAdd id={data.uid} action="add" onClick={()=>handleClick("add")}><AddIcon/></ButtonAdd>
            </AmountContainer>)}
                </>
              ) : (
                <>
                <Button onClick={() => setModalShow(true)}>Thêm</Button>
                <MyVerticallyCenteredModal show={modalShow} onHide={()=>setModalShow(false)}/>
                </>
              ) }
               </AddContainer>
          </div>
  )
}

export default Cards




