import{createContext,useState,useEffect} from 'react'
import { decodeToken } from "react-jwt";
import jwt_decode from "jwt-decode";
import axios from 'axios'
import {Navigate, useLocation} from 'react-router-dom';
import { Nav } from 'react-bootstrap';
const AuthContext = createContext()




function AuthProvider ({children}){
  let [authTokens,setAuthTokens]=useState(()=>localStorage.getItem('authTokens')? JSON.parse(localStorage.getItem('authTokens')):null)
  let [user,setUser]=useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')):null)
  const [user_name, setUsername] = useState();
  const [password, setPassword] = useState();
  const [redirect,setRedirect] = useState(false);
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(false)
  const [loading1,setloading1]=useState(true)
  const [test,settest]=useState([]);
  const [refresh,setRefresh]=useState(false)
  const [flag,setflag]=useState(false)
//------------------------------------------//
const [dataProduct, setDataProduct] = useState([])
const [soluongSP,setSoluong]=useState(0)
const [total,setTotal]=useState(0)
//login 
  const submitHandler = async(e) =>{
    e.preventDefault();
      const config ={
        headers:{
            "Content-type":"application/json"
        }
      }
      setLoading(true)
      let {data}= await axios.post('http://localhost:60000/api_public/list/login',{
        user_name,password,
      },  
      config)
      if(data.statuscode==200)
      {
        setAuthTokens(data)
        let Token = JSON.stringify(data.acsessToken)
        setUser(jwt_decode(Token))
        console.log(data.statuscode)
        localStorage.setItem('authTokens',JSON.stringify(data));  
        setLoading(false)
        setRedirect(true)
      }
      else
      {
      setError(data.message)
      setLoading(false)
      setRedirect(false) 
      }
  }
// logout 
  let logoutUser =()=>{
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
  }
//send refresh token 
let updateToken = async()=>{
          try {
            console.log("Update token!")
            const config ={
              headers:{
                  "Content-type":"application/json"
              }
            }
            const {data}= await axios.post('http://localhost:60000/api_public/list/refresh',{
              token:authTokens.refreshToken
            },  
            config)
            console.log("du lieu:",data)
            setAuthTokens(data)
            let Token = JSON.stringify(data.newAcesstoken)
            let Token1 = jwt_decode(Token)
            setUser(Token1.x)
            localStorage.setItem('authTokens',JSON.stringify(data));
          } catch (error) {
            logoutUser()
          }
}
//delete click 
const deleteClick =async(e) =>{
  let customer_id=user.Infouser[0]?.uid
  let uid=e.currentTarget.id;
  let items={uid}
    let config ={
      headers:{
          "Content-type":"application/json"
      }
    }
    let {data1}=  await axios.post('http://localhost:60000/api_public/deleteitem/',{
    customer_id,items
   },
   config)
   
   setRefresh(true)
};
//handle get cart 
const getCart= async()=>{
  let acsess=authTokens.acsessToken
  let user_name=user.Infouser[0]?.customer_name

  let config ={
    headers:{
        "Content-type":"application/json",
        "authorization": "Bearer "+ acsess
    }
  }
  let {data}= await axios.post('http://localhost:60000/api_public/getCart/',{
    user_name
  },  
  config)
  var x=0
  for(var i=0;i<data.Check[0]?.cart_items.length;i++)
  {
  x=x+data.Check[0]?.cart_items[i].iproduct.pricing.price_with_vat*data.Check[0]?.cart_items[i].quantity
  }
  setSoluong(data.Check[0]?.cart_items.length)
  setDataProduct(data.Check[0]?.cart_items)
  setTotal(x)
  setRefresh(false)
}
//handle checkout order
let billAdd=()=>{
  setflag(true)
}
const value={
    user_name,
    password,
    redirect,
    error,
    loading,
    user,
    authTokens,
    refresh,dataProduct,total,flag,soluongSP,
    submitHandler, setUsername, setPassword,setError,logoutUser, deleteClick,setRefresh,
    getCart,billAdd
  }

//hanlde refresh 
useEffect(()=>{
  // so sánh giờ hệ thống -- Time out 
  //
    let fourMinutes=10000*30
    let interval= setInterval(()=>{
      if(authTokens)
      {
        updateToken()
      }
    },fourMinutes)
    return ()=>clearInterval(interval)

},[authTokens,loading1])


    return(
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}
export {AuthContext,AuthProvider}