import React from 'react'
import '../css/App.css'
import payment from '../assets/images/payments.png'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import RoomIcon from '@mui/icons-material/Room';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CopyrightIcon from '@mui/icons-material/Copyright';
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
                        <h5 className="font-weight-semi-bold m-0">Đảm bảo chất lượng</h5>
                    </div>
                </div>

              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                  <div className="d-flex align-items-center border mb-4" style={{padding: '30px'}}>
                      <h1><Truck/></h1>
                      <h5 className="font-weight-semi-bold m-0">Miễn phí giao hàng</h5>
                  </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                  <div className="d-flex align-items-center border mb-4" style={{padding: '30px'}}>
                      <h1><Tag/></h1>
                      <h5 className="font-weight-semi-bold m-0">Hoàn trả nhanh chóng</h5>
                  </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                  <div className="d-flex align-items-center border mb-4" style={{padding: '30px'}}>
                      <h1><Basket/></h1>
                      <h5 className="font-weight-semi-bold m-0">Hổ trợ 24/7</h5>
                  </div>
              </div>
          </div>
    </div>
 <div className='container-fluid bg-secondary text-dark mt-5 pt-5'>
        <div className='row px-xl-5 pt-5'>
            <div className='col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5'>
                <a href="" className="text-decoration-none">
                    <h1 className="mb-4 display-5 font-weight-semi-bold">Vion Mart</h1>
                </a>
                <p>Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore amet erat.</p>
                <p className="mb-2"><i class="text-primary mr-3"><RoomIcon/></i>168, Ngô Quyền, phường 1, tp Cà Mau</p>
                <p className="mb-2"><i class="text-primary mr-3"><EmailIcon/></i>vionmart2021@gmail.com</p>
            </div>
            <div className='col-lg-8 col-md-12'>
              <div className='row'>
               
               
              </div>
            </div>
        </div>
        <div className='row border-top border-light mx-xl-5 py-4'>
          <div className='col-md-6 px-xl-0'>
              <p className='mb-md-0 text-center text-md-left text-dark'><CopyrightIcon/><a class="text-dark font-weight-semi-bold" href="#">Vion Mart</a>. All Rights Reserved</p>
          </div>
          <div className="col-md-6 px-xl-0 text-center text-md-right">
          <img className="img-fluid" src={payment} alt=""/>
          </div>
        </div>
    </div>
  </>
    )
}

export default Footer
