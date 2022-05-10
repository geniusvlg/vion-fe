import React,{useState,useEffect} from 'react'
import '../css/App.css';
import axios from 'axios';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Right_Section from './nav_right'
import {styled} from '@mui/styles'

const ArrowDrop = styled(ArrowDropDownIcon)({
  float:'right',
});

const myStyle=({
  marginTop:"100px"

});
const Sidebar = () => {
  const[data,setData]=useState([]);
  useEffect(()=>{
    fetchData()
  },[]);

  const fetchData= async () => {
    //Call GraphQl API
   const response = await axios.get('http://localhost:60000/api_public/list/categories');
   //Update component state
   const result= response.data?.data ?? [];
   setData(result)
 };
    return (
  <>
    <div className='container-fluid mb-5' style={myStyle} >
     <div className='row border-top px-xl-5'>
        <div className="col-lg-3 d-none d-lg-block">
                <a className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" href="#navbar-vertical" style={{height: "65px",  marginTop: "-1px", padding: "0 30px"}}>
                    <h3 className="m-0">Danh mục sản phẩm</h3>
                </a>
                <nav className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 sticky-top" id="navbar-vertical">
                    <div className="navbar-nav w-100 overflow-hidden" style={{height: "410px"}}>
                    {data?.map((item,index)=>(
                        <div className="nav-item dropdown" key={index}>
                        <a  className="nav-link" data-toggle="dropdown" id={item.uid} key={index}>{item.cate_name}</a>
                            <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                            {item?.sub_cate.map((item1,index1)=>(
                              <>
                                <a href={`/product/${item1.uid}`} className="dropdown-item">{item1.cate_name}</a>
                                </>
                            ))}
                            </div>
                        </div>
                        ))}
                    </div>
                </nav>
            </div>
            <Right_Section/>
            </div>
        </div>
  </>
    )
}

export default Sidebar
/*   <div className='container-fluid mb-5'>
      <div className='row border-top px-xl-5'>
     <div className="col-lg-3 d-none d-lg-block">
                <a className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" href="#navbar-vertical" style={{height: "65px",  marginTop: "-1px", padding: "0 30px"}}>
                    <h6 className="m-0">Danh mục sản phẩm</h6>
                </a>
                <nav className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 sticky-top" id="navbar-vertical">
                    <div className="navbar-nav w-100 overflow-hidden" style={{height: "410px"}}>
                    {data?.map((item,index)=>(
                        <div className="nav-item dropdown">
                        <a  className="nav-link" data-toggle="dropdown" id={item.uid} key={index}>{item.cate_name}</a>
                            <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                            {item?.sub_cate.map((item1,index)=>(
                              <>
                                <a href="" className="dropdown-item">{item1.cate_name}</a>
                                </>
                            ))}
                            </div>
                        </div>
                        
))}
                    </div>
                </nav>

            </div>
            <Right_Section/>
            </div>
      </div>*/

/* <div className='container-fluid mb-5'>
      <div className='row border-top px-xl-5'>
        <div className='col-lg-3'>
          <a className="btn shadow-none d-flex align-items-center justify-content-between bg-warning text-white w-100" data-toggle="collapse" href="#navbar-vertical" style={{height:"65px",marginTop:"-1px",padding:"0 30px"}}>
              <h6 className='m-0'>Danh mục sản phẩm</h6>
              <ArrowDropDownIcon></ArrowDropDownIcon>
          </a>
          <nav className='navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0' id='navbar-vertical'>
            <div className='navbar-nav w-100 overflow-hidden' style={{height:"410px"}}>
              <div className='nav-item dropdown'>
              {data?.map((item,index)=>(
                    <a href={`/product/${item.uid}`} className="nav-item nav-link" id={item.uid} key={index}>{item.cate_name}</a>
                ))}
              </div>
               
             </div>
          </nav>
        </div>
        <Right_Section/>
      </div>
    </div>*/