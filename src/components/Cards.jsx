import React,{useState,useEffect,useContext}  from 'react'
import { AuthContext } from '../context/AuthContext';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useCart} from 'react-use-cart'


const Cards = ({data}) => {
  const [modalShow, setModalShow]=useState(false);
  const [customer_id, setCustomerid]=useState()
  const context=useContext(AuthContext)
  const [dataProduct1, setDataProduct1] = useState()
 /* useEffect(()=>{
    changeClick()
  },[])*/

  /*useEffect(()=>{
  handleClick()
  },[])*/

  // Xử lý số lượng sản phẩm 
  const [quantity,setCount] = useState(0);
  const [state, setState] = useState('start')
  const [uid ,  setUid ]= useState();
  const [error,  setError]= useState();
  const [loading,setLoading]=useState(false) 
  

  const changeClick =async(e) =>{
    e.preventDefault();
    setCount(1);
    setState('count');
    setUid(e.currentTarget.id);
  }

  const handleClick = debounce(async (action) =>{
        if(action === "remove"){
          setCount(quantity - 1 );
        }
        else{
            setCount(quantity + 1);
        }
        let customer_id=context.user.Infouser[0]?.uid
        let acsess=context.authTokens.acsessToken
        let items={uid,quantity}
          let config ={
            headers:{
                "Content-type":"application/json",
                "authorization": "Bearer "+ acsess
            }
          }
          let {data1}=  await axios.post('http://localhost:60000/api_public/submitCart',{
          customer_id,items
         },
         config)
         setDataProduct1(data1)
    },1000);
  /*const handleId = (e) => {
    e.preventDefault();
     console.log(e.currentTarget.id);
     console.log(arr.data[0].uid)
  }*/
  return (
          <div className="box">
              <span className="discount">-{data.pricing.discount}%</span>
              <div className="corner-box"><span /></div>
              <StyledLink to= {`/product_details/${data.uid}`}><img src={data.image_cover ?? ''} style={styles}/></StyledLink>
              <h3>{data.product_name}</h3>
              <p>Trọng lượng- <span>1</span>kg</p>
              <p>Giá- <span>{data.pricing.price_with_vat}</span>đồng</p>
              <AddContainer>
              {context.user? (
                <>
                    {state === 'start' && (
                    <Button id={data.uid} onClick={(event)=>changeClick(event)} >Thêm</Button>
                 )}
                  {state === 'count' && 
                  (<AmountContainer>
              <ButtonRemove id={data.uid} action="remove" onClick={()=>handleClick("remove")}><RemoveIcon/></ButtonRemove>
              <Amount>
              {quantity<1 ?(setState('start')):(quantity)}
              </Amount>
              <ButtonAdd id={data.uid} action="add" onClick={()=>handleClick("add")}><AddIcon/></ButtonAdd>
            </AmountContainer>)}
                </>
              ) : (
                <>
                <Button onClick={() => setModalShow(true)}>Thêm</Button>
                <MyVerticallyCenteredModal show={modalShow} onHide={()=>setModalShow(false)}/>
                </>
              ) }
               </AddContainer>
          </div>
  )
}

export default Cards


/*import React from 'react'
import axios from 'axios';
import '../css/Card.css'
export default class ImageSlider extends React.Component {
  state = {
    teh: []
    }
    componentDidMount() {
    axios.get(`http://localhost:3000/superpro`)
    .then(res => {
    const teh = res.data;
    this.setState({ teh });
    })
    }// react hook <=
    render() {
      return (
        <>{
          this.state.teh.map((item) => (
            <div className="card">
          <div className="card-header">
            <div className="card-title-group">
          <h5 className="card-title">{item.header}</h5>
          </div>
          </div><img className="card-image" src={item.url} alt="Logo" /><div className="card-price">{item.para}</div><div className="card-btnr">
          </div>
          <button class="button button2">Chọn mua</button>
          </div>
          ))}
        </>
      )
  }
}*/
