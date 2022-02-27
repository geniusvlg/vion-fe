import React,{useState,useEffect} from 'react'
import styled from "styled-components"
import {Modal} from 'react-bootstrap'
import logo from '../assets/images/p-2.webp'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios'
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
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Có lẽ quý khách chưa đăng kí để trở thành thành viên của chúng tôi
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CardLogin>
          <h5>Vui lòng cung cấp số điện thoại người nhận</h5>
          <Input id="phone" placeholder="Số điện thoại" type="text" name="phone"/>
        </CardLogin>
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit'>Tiếp tục</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Description = ({product}) => {
  // Xử lý số lượng sản phẩm 
    const [quantity,setCount] = useState();
    const [state, setState] = useState('start')
    const changeClick = (e) =>{
      e.preventDefault();
      setCount(1)
      setState('count')
    }
    const handleClick = (action) =>{
        if(action === "remove"){
              if( quantity <= 0)
              {
                setState('start')
              }
              else
              {
                setCount(quantity - 1 )
              }
        }
        else{
            setCount(quantity + 1);
        }
    }

      // Kiểm tra đăng nhập chưa 
    const [modalShow, setModalShow]=useState(false);
    const [userInfo,setUserinfo]= useState([])
    useEffect(()=>{
      var arr = JSON.parse(localStorage.getItem('userInfo'));
          if(arr!== null)
          {
             setUserinfo(true)
          }
          else {
            setUserinfo(false)
          }
    })

    // Báo ra số lượng sản phẩm hiện tại vào giỏ 

    return (
        <Wrapper>
        <ImgContainer>
          <Image src={product.image_cover } />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.product_name}</Title>
          <Desc>
          {product.description}
          </Desc>
          <p>Trọng lượng- <span>1</span>kg</p>
          <Price><span>{product.pricing.price_with_vat}</span>--đồng</Price>
          <AddContainer>

            {userInfo ? (
                <>
                  {state === 'start' && (
                    <Button onClick={changeClick} >Thêm</Button>
                 )}
                  {state === 'count' && 
                  (<AmountContainer>
              <ButtonRemove action="remove" onClick={()=>handleClick("remove")}><RemoveIcon/></ButtonRemove>
              <Amount>
                {(quantity == 0 ) ? (1):(quantity)}
              </Amount>
              <ButtonAdd action="add" onClick={()=>handleClick("add")}><AddIcon/></ButtonAdd>
            </AmountContainer>)}
                </>
              ) : (
                <>
                <Button onClick={() => setModalShow(true)}>Thêm</Button>
                <MyVerticallyCenteredModal show={modalShow} onHide={()=>setModalShow(false)}/>
                </>
              ) }
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    )
}

export default Description