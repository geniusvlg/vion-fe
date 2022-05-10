import React,{useState, useEffect,useContext} from 'react'
import axios from 'axios';
import '../css/Header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../context/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { styled } from '@mui/styles';
import {Navbar,Nav,NavDropdown,Form,Container,FormControl,Button} from 'react-bootstrap'


const Cart = styled(ShoppingCartIcon)({
  color:'#ffbb33',
	lineHeight: "50px",
  verticalAlign: "middle",
  fontSize:"40px"
});

const LogoutIc = styled(LogoutIcon)({
  verticalAlign:"middle",
  color:'#ffbb33',
	lineHeight: "50px",
  fontSize:"40px"
})


const AccountBox= styled(AccountBoxIcon)({
  color:'#ffbb33'
});

const Header = () => {
 /* const [isOpen, setIsOpen] = useState(false);*/
  let navigate = useNavigate();
  let context=useContext(AuthContext)
  const [title, setTitle] = useState('')
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
  useEffect(() => {
    context.getcartlength()
  }, [context.user]);
  

  const onFormSubmit = () => {
    navigate(`/product_search/${title}`);
  }
    return (
      <>
      <Navbar collapseOnSelect expand="lg" bg="myColor" fixed='top'>
      <Container>
      <Navbar.Brand href="/"  style={{color:"#ffbf00", fontSize:"2.5em"}}> <span style={{border: "3px solid #3f3b3b", fontSize:"1em",color:"#ffbf00"}}>Vion</span> Mart</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" >
    
        {context.user? (
          <>
            <Nav style={{  textAlign:"right",
                lineHeight:"50px"}}>
              <Nav.Link href="/userprofile" ><AccountBox/> {context.user.Infouser[0]?.customer_name}</Nav.Link>
              <Nav.Link onClick={context.logoutUser} ><LogoutIc/> Đăng xuất</Nav.Link>
              <Nav.Link href="/cart" ><Cart/>{context.soluongSP} Giỏ hàng của bạn</Nav.Link>
            </Nav>
          <Nav className="me-auto" style={{  textAlign:"right"}}>
            <NavDropdown title="Danh mục" id="collasible-nav-dropdown" bg="myDrop" >
          {data?.map((item,index)=>(
            <NavDropdown key={index} title={item.cate_name} id="collasible-nav-dropdown">
                 {item?.sub_cate.map((item1,index1) =>(
            <NavDropdown.Item href={`/product/${item1.uid}`} key={index1}>{item1.cate_name}</NavDropdown.Item>
                     ))}
            </NavDropdown>
              ))}
            </NavDropdown>
          </Nav>
          <Nav>
        <Form className="d-flex" onSubmit={onFormSubmit}>
          <FormControl
            type="search"
            placeholder="Tìm kiếm sản phẩm" 
            className="me-2"
            aria-label="Search"
            onChange={event => setTitle(event.target.value)}
          />
             <Button variant="outline-success">Tìm kiếm</Button>
          </Form>
           </Nav>
          </>
         ) : (
          <>
           <Nav>
            <Nav.Link href="/signup" style={{textAlign:"right"}}>Đăng ký</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link href="/signin" style={{textAlign:"right"}}>Đăng nhập</Nav.Link>
          </Nav>
          <Nav className="me-auto" style={{textAlign:"right"}} >
          <NavDropdown title="Danh mục" id="collasible-nav-dropdown" bg="myDrop" style={{textAlign:"right"}}>
          {data?.map((item,index)=>(
            <NavDropdown title={item.cate_name} id="collasible-nav-dropdown" key={index}>
                 {item?.sub_cate.map((item1,index1)=>(
            <NavDropdown.Item href={`/product/${item1.uid}`} key={index1}>{item1.cate_name}</NavDropdown.Item>
                     ))}
            </NavDropdown>
              ))}
          </NavDropdown>
          </Nav>
         
          <Nav>
        <Form className="d-flex" onSubmit={onFormSubmit}>
          <FormControl
            type="search"
            placeholder="Tìm kiếm sản phẩm" 
            className="me-2"
            aria-label="Search"
            onChange={event => setTitle(event.target.value)}
          />
             <Button variant="outline-success">Tìm kiếm</Button>
          </Form>
        </Nav>
          </>

         )}
        
      </Navbar.Collapse>
      </Container>
    </Navbar>
    <br></br>
    </>
    )
}
export default Header
/*<div className="contgainer-fluid">
<Topbar/>
<div className='row align-items-center py-3 px-xl-5'>
    <div className='col-lg-3 d-none d-lg-block'>
      <a href="/" className="text-decoration-none">
        <h1 className="m-0 display-5 font-weight-semi-bold text-warning" >Vion Mart</h1>
      </a>
    </div>

    <div className='col-lg-6 col-6 text-left'>
      <form action="" onSubmit={onFormSubmit}>
        <div className='input-group'>
          <input type="text" className="form-control" placeholder="Tìm kiếm sản phẩm" onChange={event => setTitle(event.target.value)}/>
          <div className="input-group-append" >
            <span className="input-group-text bg-transparent text-warning">
              <SearchIcon onClick={onFormSubmit}/>
            </span>
          </div>
        </div>
      </form>
    </div>
    {context.user? (
         <>
          <div className='col-lg-3 col-6 text-right'>
          <a href="/cart" className="btn border"><Cart/>{context.soluongSP}</a>
          <a href="/userprofile" className="btn border"><AccountBox/>{context.user.Infouser[0]?.customer_name}</a>
          <a onClick={context.logoutUser}
          className="btn border" ><IoLogOutOutline size={20}/></a>
                  </div>
          </>
    ) : (
      <>
        <div className='col-lg-3 col-6 text-right'>
            <a href="/signin" className="btn"><Accessibility/>Đăng Nhập</a>
            <a href="/signup" className="btn"><AccountCircle/>Đăng Kí</a>
         </div>
      </>
    ) }
</div>
</div>

)*/
/*
 <nav className="navbar navbar-expand-lg navbar-light bg-light px-5 sticky-top">
      <a className="navbar-brand" href='/'> <h1 className="m-0 display-5 font-weight-semi-bold" ><span className="m-0 display-5 text-warning font-weight-bold border px-3 mr-1">Vion</span>Mart</h1></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">

        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
   
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i  className="text-warning"> <CookieIcon/> </i>
              <span className="text-warning">Danh mục</span>
            </a>
        
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            {data?.map((item,index)=>(
              <li className="dropdown-submenu">
                <a className="dropdown-item dropdown-toggle" href="#">{item.cate_name}</a>
                <ul className="dropdown-menu">
                {item?.sub_cate.map((item1,index)=>(
                  <li className="dropdown-submenu">
                    <a className="dropdown-item"  href={`/product/${item.uid}`} >{item1.cate_name}</a>
                  </li>
                     ))}
                </ul>
              </li>
                        ))}
            </ul>
          </li>
         
          {context.user? (
         <>
          <li className="nav-item">
          <a href="/userprofile" className="nav-link"><AccountBox/>{context.user.Infouser[0]?.customer_name}</a>
          </li>

          <li className="nav-item">
          <a href="/cart" className="nav-link text-warning"><Cart/>{context.soluongSP}</a>
          </li>

          <li className="nav-item">
              <a onClick={context.logoutUser}
                  className="nav-link text-warning" ><IoLogOutOutline size={20}/>Đăng xuất</a>
          </li>
          </>
         ) : (
          <>
          <li className="nav-item">
                <a href="/signin" className="nav-link text-warning"><Accessibility/><span className="text-warning">Đăng Nhập</span></a>
          </li>
          <li className="nav-item">
          <a href="/signup" className="nav-link text-warning"><AccountCircle/><span className="text-warning">Đăng Ki</span></a>
          </li>
        </>
        ) }
        </ul>
        <form action="" onSubmit={onFormSubmit}>
        <div className='input-group'>
          <input type="text" className="form-control" placeholder="Tìm kiếm sản phẩm" onChange={event => setTitle(event.target.value)}/>
          <div className="input-group-append" >
            <span className="input-group-text bg-transparent text-warning">
              <SearchIcon onClick={onFormSubmit}/>
            </span>
          </div>
        </div>
      </form>
      </div>
    </nav>



*/