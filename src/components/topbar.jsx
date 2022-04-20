import React from 'react'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Topbar = () => {
  return (
    <div className='row py-2 px-xl-5' style={{backgroundColor:"#EDF1FF"}}>
        <div className='col-lg-6 d-none d-lg-block'>
            <div className='d-inline-flex align-items-center'>
                <a className="text-dark" href="">FAQs</a>
                <span className="text-muted px-2">|</span>
                <a className="text-dark" href="">Help</a>
                <span className="text-muted px-2">|</span>
                <a className="text-dark" href="">Support</a>
            </div>
        </div>

        <div className='col-lg-6 text-center text-lg-right'>
            <div className='d-inline-flex align-items-center'>
                <a className="text-dark px-2" href="">
                    <FacebookOutlinedIcon/>
                </a>
                <a className="text-dark px-2" href="">
                    <TwitterIcon/>
                </a>
                <a className="text-dark px-2" href="">
                    <LinkedInIcon/>
                </a>
                <a className="text-dark px-2" href="">
                    <InstagramIcon/> 
                </a>
                <a className="text-dark pl-2" href="">
                    <YouTubeIcon/>
                </a>
            </div>
        </div>
    </div>
  )
}

export default Topbar