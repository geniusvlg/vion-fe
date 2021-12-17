import React from 'react'
import '../css/App.css'
import logo_footer from '../assets/images/logo-1.webp'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import { styled } from '@mui/styles';

const Truck = styled(LocalShippingIcon)({
  width: '6rem',
  height: '6rem',
  border: '.1rem solid #007bff',
  textAlign: 'center',
  lineHeight: '6rem',
  fontSize: '1.5rem',
  borderRadius: '50%',
  color: '#007bff',
  marginRight: '1.5rem',
});

const Basket = styled(ShoppingBasketIcon)({
  width: '6rem',
  height: '6rem',
  border: '.1rem solid #007bff',
  textAlign: 'center',
  lineHeight: '6rem',
  fontSize: '1.5rem',
  borderRadius: '50%',
  color: '#007bff',
  marginRight: '1.5rem',
});

const Tag = styled(LocalOfferIcon)({
  width: '6rem',
  height: '6rem',
  border: '.1rem solid #007bff',
  textAlign: 'center',
  lineHeight: '6rem',
  fontSize: '1.5rem',
  borderRadius: '50%',
  color: '#007bff',
  marginRight: '1.5rem',
});


const Footer = () => {
    return (
        <div>
        <section className="footer">
          <div className="wrapper">
            <div className="feature-box">
              <Truck/>
              <div className="content">
                <h3>Free &amp; Next Day Delivery</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div className="feature-box">
              <Basket/>
              <div className="content">
                <h3>100% Satisfaction Guarantee</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div className="feature-box">
              <Tag/>
              <div className="content">
                <h3>Great Daily Deals Discount</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
          <div className="box-container">
            <div className="box">
              <img src={logo_footer} alt="" />
              <div className="icons icon-1">
                <a href="#"><LocalPhoneIcon/> +61 525 240 310</a>
                <a href="#"><PhoneAndroidIcon/> 12345 67890, 56847-98562</a>
                <a href="#"><EmailIcon/> yourmail@gmail.com</a>
                <a href="#"><LanguageIcon/> www.klbtheme.com</a>
              </div>
            </div>
            <div className="box">
              <h2>CATEGORIES</h2>
              <div className="icons">
                <a href="#">Vegetables</a>
                <a href="#">Grocery &amp; Staples</a>
                <a href="#">Breakfast &amp; Dairy</a>
                <a href="#">Soft Drinks</a>
                <a href="#">Biscuits &amp; Cookies</a>
              </div>
            </div>
            <div className="box">
              <h2>ABOUT US</h2>
              <div className="icons">
                <a href="#">Company Information</a>
                <a href="#">Careers</a>
                <a href="#">Store Location</a>
                <a href="#">Affillate Program</a>
                <a href="#">Copyright</a>
              </div>
            </div>
          </div>
        </section>
        <div className="credit"> Copyright 2021. All right reserved.</div>
      </div>
    )
}

export default Footer
