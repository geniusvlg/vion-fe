import React,{useState} from 'react'
import styled from "styled-components"
import '../css/App.css';

import logo from '../assets/images/p-2.webp'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  overflow: hidden;
  margin: 48px auto 0;
  width: 500px;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  background-color: white;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  display: block;
  overflow: hidden;
  line-height: 1.3em;
  color: #4a4a4a;
  margin-bottom: 10px;
`;

const Desc = styled.p`
  margin: 20px 0px;
  color: #999;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  display: inline-block;
  color: #c10017;
  vertical-align: middle;
`;

const Strike = styled.span`
  font-size: 28px;
  display: inline-block;
  color: #999;
  vertical-align: middle;
  text-decoration: line-through;
  margin-left: 5px;
`;

const Discount = styled.label`
  display: inline-block;
  vertical-align: middle;
  font-size: 12px;
  color: #fff;
  font-weight: 600;
  border-radius: 3px;
  background: #de2000;
  width: 32px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  margin-left: 5px;
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
  width: 70px;
  height: 70px;
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
max-width: 10rem;
whitespace: nowrap;
margin: 0 0.1rem;
`;

const Description = ({product}) => {
    const [count,setCount] = useState(1);

    const handleClick = (action) =>{
        if(action === "remove"){
            setCount(count> 0 ? count - 1 : 0);
        }
        else{
            setCount(count + 1);
        }
    }
    return (
        <Wrapper>
        <ImgContainer>
          <Image src={logo} />
        </ImgContainer>
        <InfoContainer>
          <Title>Khoai tây</Title>
          <Desc>
            Khoai tây tươi từ nông trại nhà a Long
          </Desc>
          <BoxPrice>
            <Price>$18</Price>
            <Strike>$14</Strike>
            <Discount>25%</Discount>
          </BoxPrice>
          
          <AddContainer>
            <AmountContainer>
              <ButtonRemove action="remove" onClick={()=>handleClick("remove")}><RemoveIcon/></ButtonRemove>
              <Amount>{count}</Amount>
              <ButtonAdd action="add" onClick={()=>handleClick("add")}><AddIcon/></ButtonAdd>
            </AmountContainer>
            <Button>Thêm</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    )
}

export default Description
