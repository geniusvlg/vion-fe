import React, { useState } from 'react'
import '../App.css';
import '../data';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/styles';
import useToken from './useToken';

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



const UserIcon = () => {
  const { token } = useToken();
  if(!token){
    return (
    <div>            
      <a href="/signin"><SignUp/>Đăng nhập</a>
      <a href="/signup"><AccountCircle/>Đăng kí</a>
    </div>
    );
  }
    return (      
    <div>
      <a href="/"><AccountCircle/>Anh Ngo Hoang Long</a>
    </div>
          
    )
}

export default UserIcon
