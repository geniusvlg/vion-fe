import React,{useState, useEffect,useContext} from 'react'

import '../header.css'
import { AuthContext } from '../context/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IoLogOutOutline } from "react-icons/io5";
import {useNavigate} from 'react-router-dom';
import Topbar from './topbar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { styled } from '@mui/styles';

const Cart = styled(ShoppingCartIcon)({
  color:'#ffbb33'
});

const LoveList = styled(FavoriteIcon)({
  color:'#ffbb33'
})

const Accessibility= styled(AccessibilityNewIcon)({
  color:'#ffbb33'
});
const AccountCircle= styled(AccountCircleIcon)({
  color:'#ffbb33'
});
const AccountBox= styled(AccountBoxIcon)({
  color:'#ffbb33'
});

const Header = () => {
 /* const [isOpen, setIsOpen] = useState(false);*/
  let context=useContext(AuthContext)
  if(context.user)
  {
  useEffect(() => {
    context.getCart()
  },[context.refresh]);
}
    return (
      <div className="container-fluid">
        <Topbar/>
        <div className='row align-items-center py-3 px-xl-5'>
            <div className='col-lg-3 d-none d-lg-block'>
              <a href="/" className="text-decoration-none">
                <h1 className="m-0 display-5 font-weight-semi-bold text-warning" >Vion Mart</h1>
              </a>
            </div>

            <div className='col-lg-6 col-6 text-left'>
              <form action="">
                <div className='input-group'>
                  <input type="text" className="form-control" placeholder="Tìm kiếm sản phẩm"/>
                  <div className="input-group-append">
                    <span className="input-group-text bg-transparent text-warning">
                      <SearchIcon/>
                    </span>
                  </div>
                </div>
              </form>
            </div>
            {context.user? (
                 <>
                  <div className='col-lg-3 col-6 text-right'>
                  <a href="/cart" class="btn border"><Cart/><span class="badge">0</span></a>
                  <a href="/userprofile" class="btn border"><AccountBox/>{context.user.Infouser[0]?.customer_name}</a>
                  <a onClick={context.logoutUser}
                  class="btn border" ><IoLogOutOutline size={20}/></a>
                          </div>
                  </>
            ) : (
              <>
                <div className='col-lg-3 col-6 text-right'>
                    <a href="/signin" class="btn"><Accessibility/>Đăng Nhập</a>
                    <a href="/signup" class="btn"><AccountCircle/>Đăng Kí</a>
                 </div>
              </>
            ) }
          
   
        </div>
    </div>

    )
}
export default Header
/*   <Nav>
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
            <MenuLink href="/product">Sản Phẩm</MenuLink>
            <MenuLink href="">Về Chúng Tôi</MenuLink>
            {context.user? (
                 <>
                  <MenuLink href="/cart"><ShoppingCartIcon/>Giỏ hàng </MenuLink>
                  <MenuLink href="/userprofile"><AccountBoxIcon/>Thông tin tài khoản</MenuLink>
                  <a >{context.user.Infouser[0]?.customer_name}</a>
                  <MenuLink onClick={context.logoutUser}
                  >Đăng xuất<IoLogOutOutline size={20}/></MenuLink>
                  </>
            ) : (
              <>
             <MenuLink href="/signin"><AccessibilityNewIcon/>Đăng Nhập</MenuLink>
            <MenuLink href="/signup"><AccountCircleIcon/>Đăng Kí</MenuLink>
              </>
            ) }
          </Menu>
   
      </Nav> */