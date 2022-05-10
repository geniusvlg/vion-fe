import React  from 'react';
import{createContext,useState,useEffect} from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios'

const AuthContext = createContext()




function AuthProvider ({children}){
  let [authTokens,setAuthTokens]=useState(()=>localStorage.getItem('authTokens')? JSON.parse(localStorage.getItem('authTokens')):null)
  let [user,setUser]=useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')):null)
  const [redirect,setRedirect] = useState(false);
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(false)
  const [loading1,setloading1]=useState(true)
  const [refresh,setRefresh]=useState(false)
  const [flag,setflag]=useState(false)
//------------------------------------------//
const [dataProduct, setDataProduct] = useState([])
const [soluongSP,setSoluong]=useState(0)
const [total,setTotal]=useState(0)

//login 
  const submitHandler = async(data2) =>{
      let user_name=data2.user_name.replace(/\s/g, '')
      let password=data2.password.replace(/\s/g, '')
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
      console.log("đăng nhập:",data)
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
  const onLoginSubmit= async(data2) => {
    let  phone_number=data2.phone

      const config ={
        headers:{
            "Content-type":"application/json"
        }
      }
      setloading1(true)
      const {data}= await axios.post('http://localhost:60000/api_public/hidlogin',{
       phone_number
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
  };
//get cart
  let getcartlength = async()=>{
    let acsess=authTokens?.acsessToken
      let user_name=user?.Infouser[0]?.customer_name
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
    setSoluong(data.Check[0]?.cart_items.length)
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
//delete all item
const deleteAll=async() =>{
  let customer_id=user.Infouser[0]?.uid
    let config ={
      headers:{
          "Content-type":"application/json"
      }
    }
    let {data1}=  await axios.post('http://localhost:60000/api_public/deleteallitem/',{
    customer_id
   },
   config)
   setSoluong(0)
};
//handle checkout order
let billAdd=()=>{
  setflag(true)
}
const value={
    redirect,
    error,
    loading,
    user,
    authTokens,
    refresh,dataProduct,total,flag,soluongSP,
    submitHandler,setError,logoutUser,setRefresh,onLoginSubmit,
   billAdd,deleteAll,setDataProduct,setSoluong,setTotal,getcartlength
  }

//hanlde refresh 
useEffect(()=>{
  // so sánh giờ hệ thống -- Time out 
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