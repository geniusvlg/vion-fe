import React from 'react'
import '../css/App.css'
import logo_footer from '../assets/images/logo-1.webp'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DoneIcon from '@mui/icons-material/Done';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
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
const Done = styled(DoneIcon)({
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

const Basket = styled( SupportAgentIcon)({
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
      <>
                  
    <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center border mb-4" style={{padding: '30px'}}>
                        <h1><Done/></h1>
                        <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
                    </div>
                </div>

              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                  <div className="d-flex align-items-center border mb-4" style={{padding: '30px'}}>
                      <h1><Truck/></h1>
                      <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
                  </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                  <div className="d-flex align-items-center border mb-4" style={{padding: '30px'}}>
                      <h1><Tag/></h1>
                      <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
                  </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                  <div className="d-flex align-items-center border mb-4" style={{padding: '30px'}}>
                      <h1><Basket/></h1>
                      <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
                  </div>
              </div>
          </div>
    </div>
    <div className="container-fluid bg-secondary text-dark mt-5 pt-5">
      <div className="row px-xl-5 pt-5">
          <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
              <a href="" className="text-decoration-none">
                  <h1 className="mb-4 display-5 font-weight-semi-bold">Vion Mart</h1>
              </a>
              <p>Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore amet erat.</p>
              <p className="mb-2"><LocalShippingIcon></LocalShippingIcon> 123 Street, New York, USA</p>
              <p className="mb-2"><EmailIcon></EmailIcon> info@example.com</p>
              <p className="mb-0"><LocalPhoneIcon></LocalPhoneIcon> +012 345 67890</p>
          </div>
          <div className="col-lg-8 col-md-12">
              <div className="row">
                  <div className="col-md-4 mb-5">
                      <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
                      <div className="d-flex flex-column justify-content-start">
                          <a className="text-dark mb-2" href="index.html"><ChevronRightIcon/>Home</a>
                          <a className="text-dark mb-2" href="shop.html"><ChevronRightIcon/>Our Shop</a>
                          <a className="text-dark mb-2" href="detail.html"><ChevronRightIcon/>Shop Detail</a>
                          <a className="text-dark mb-2" href="cart.html"><ChevronRightIcon/>Shopping Cart</a>
                          <a className="text-dark mb-2" href="checkout.html"><ChevronRightIcon/>Checkout</a>
                          <a className="text-dark" href="contact.html"><ChevronRightIcon/>Contact Us</a>
                      </div>
                  </div>

                  <div className="col-md-4 mb-5">
                      <h5 className="font-weight-bold text-dark mb-4">Newsletter</h5>
                      <form action="">
                          <div className="form-group">
                              <input type="text" className="form-control border-0 py-4" placeholder="Your Name" required="required" />
                          </div>
                          <div className="form-group">
                              <input type="email" className="form-control border-0 py-4" placeholder="Your Email"
                                  required="required" />
                          </div>
                          <div>
                              <button className="btn btn-primary btn-block border-0 py-3" type="submit">Subscribe Now</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
  </>
    )
}

export default Footer
