import React,{useState, useEffect,useContext} from 'react'
import logo from '../assets/images/logo-1.webp'
import '../header.css'
import { AuthContext } from '../context/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

/*const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;
const Logo = styled.a`
padding: 1rem 0;
color: #28a745;
text-decoration: none;
font-weight: 800;
font-size: 1.7rem;
span {
  font-weight: 300;
  font-size: 1.3rem;
  color:#dc3545;
}
&:hover {
  color: #ADFF2F;
}
`; 

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;

const MenuLink = styled.a`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #fd7e14;
  transition: all 0.3s ease-in;
  font-size: 0.9rem;
  &:hover {
    color: #28a745;
  }
  &:focus{
    color:#20c997;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: #28a745;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;


const Header = () => {
  const navigate=useNavigate();
  const [userInfo,setUserinfo]= useState([])
  const [userName,setUserName]=useState()
  const [isOpen, setIsOpen] = useState(false);
  const context=useContext(AuthContext)
  console.log(context.user.Infouser[0].customer_name)
  useEffect(()=>{
    var arr = JSON.parse(localStorage.getItem('userInfo'));
        if(arr!== null)
        {
           setUserinfo(true)
          setUserName(arr.data[0].customer_name)
        }
        else {
          setUserinfo(false)
        }
  })
    return (
      <>
     <Nav>
       <Logo>
        Vion<span>Mart</span>
      </Logo>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Menu isOpen={isOpen}>
        <MenuLink href="/">Trang Chủ</MenuLink>
        <MenuLink href="">Sản Phẩm</MenuLink>
        <MenuLink href="">Về Chúng Tôi</MenuLink>
   	{userInfo ? (
               <>
                <a>{userName}</a>
               <button onClick={()=>{
               localStorage.removeItem("userInfo");
                navigate('/');}}
                >Đăng xuất</button>
     <MenuLink href="/cart"><ShoppingCartIcon/>Giỏ Hàng</MenuLink>
                </>
          ) : (
            <>
           <MenuLink href="/signin"><AccessibilityNewIcon/>Đăng Nhập</MenuLink>
        <MenuLink href="/signup"><AccountCircleIcon/>Đăng Kí</MenuLink>
            </>
          ) }
      </Menu>
    </Nav>
      </>
    )
}*/


const Search = styled(SearchIcon)({
  width: '8rem',
  height: '100%',
  lineHeight: '4rem',
  textAlign: 'center',
  background: 'linear-gradient(135deg, #ff934b 0%, #ff5e62 100%)',
  color: '#fff',
  fontSize: '1.5rem',
  cursor: 'pointer'
});

const Carts = styled(ShoppingCartIcon)({
  color: '#fd7e14',
  marginRight: '.5rem',
  marginLeft: '1rem',
  width:'5rem'
});

const SignUp = styled(AccessibilityNewIcon)({
  color: '#fd7e14',
  marginRight: '.5rem',
  marginLeft: '1rem'
});

const AccountCircle = styled(AccountCircleIcon)({
  color: '#fd7e14',
  marginRight: '.5rem',
  marginLeft: '1rem'
});

const AccountCircle1 = styled(AccountBoxIcon)({
  color: '#fd7e14',
  marginRight: '.5rem',
  marginLeft: '1rem'
});
const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Logo = styled.a`
padding: 1rem 0;
color: #28a745;
text-decoration: none;
font-weight: 800;
font-size: 1.7rem;
span {
  font-weight: 300;
  font-size: 1.3rem;
  color:#dc3545;
}
&:hover {
  color: #ADFF2F;
}

`; 

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;

const MenuLink = styled.a`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #fd7e14;
  transition: all 0.3s ease-in;
  font-size: 0.9rem;
  &:hover {
    color: #28a745;
  }
  &:focus{
    color:#20c997;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: #28a745;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const context=useContext(AuthContext)
    return (
        
      <Nav>
          <Logo href="">
            Vion<span>Mart</span>
          </Logo>
          <Hamburger onClick={() => setIsOpen(!isOpen)}>
            <span />
            <span />
            <span />
          </Hamburger>
          <Menu isOpen={isOpen}>
            <MenuLink href="/">Trang Chủ</MenuLink>
            <MenuLink href="">Sản Phẩm</MenuLink>
            <MenuLink href="">Về Chúng Tôi</MenuLink>
            {context.user? (
                 <>
                  <a style={{margin:'1.25rem'}}>{context.user.Infouser[0]?.customer_name}</a>
                  <button onClick={context.logoutUser}
                  >Đăng xuất</button>
             <MenuLink href="/cart"><ShoppingCartIcon/>Giỏ Hàng</MenuLink>
             <MenuLink href="/userprofile"><AccountBoxIcon/>Thông tin tài khoản</MenuLink>
                  </>
            ) : (
              <>
             <MenuLink href="/signin"><AccessibilityNewIcon/>Đăng Nhập</MenuLink>
            <MenuLink href="/signup"><AccountCircleIcon/>Đăng Kí</MenuLink>
              </>
            ) }
          </Menu>
      </Nav>        
    )
}
export default Header
//