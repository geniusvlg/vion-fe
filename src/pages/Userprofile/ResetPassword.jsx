import React, { useContext,useEffect,useState }  from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiFillLock } from "react-icons/ai";
import PasswordField from './PasswordField';
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
// Importing toastify module
import {toast} from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import {debounce} from "lodash"
toast.configure()

const resetPasswordFormSchema = yup.object().shape({
    currentPassword: yup
        .string()
        .required("Vui lòng nhập mật khẩu cũ"),
    newPassword: yup
        .string()
        .required("Vui lòng nhập mật khẩu mới"),
});

function ResetPassword() {
    const context=useContext(AuthContext)
    const phone_number=context.user.Infouser[0]?.phone_number
    const [password, setPassword] = useState();
    const [data, setData] = useState();
    const [error,setError1]=useState(false);
    const { register, handleSubmit, formState : { errors }, setError } = useForm({
        resolver: yupResolver(resetPasswordFormSchema)
    })

    function onValidSubmit(data) {
        if(data.newPassword !== data.confirmNewPassword) {
            setError("confirmNewPassword", {
                type: "manual",
                message: "Nhập lại mật khẩu không khớp"
            });
            return   
        }
        else if(data.newPassword === data.currentPassword)
        {
            setError("newPassword", {
                type: "manual",
                message: "Mật khẩu mới phải khác mật khẩu củ "
            });
            return   
        }
        else
        {
            setPassword(data.newPassword)
        }
    }
    const Onreset=async(e)=>{
       let config ={
            headers:{
                "Content-type":"application/json"
            }
          }
          let data1= await axios.post('http://localhost:60000/api_public/list/forgotpassword',{
                phone_number,password
          },  
          config)
          console.log("data:",)
          setData(data1)
          if(data1.data.statuscode==200)
          {
            context.logoutUser()

          }
          else
          {
            toast.error(data1.data.message, {
                // Set to 15sec
                position: toast.POSITION.BOTTOM_LEFT, autoClose:3000})
          } 
    }
    return (
  
        <div className="form-container"> 
  
            <div className='form-title d-flex align-items-center'>
                <AiFillLock size={24} />
                <strong className='title-text'>Thay đổi mật khẩu</strong> 
            </div>
            <form className="update-form" onSubmit={handleSubmit(onValidSubmit)}>
                <PasswordField register={register} label="Nhập mật khẩu cũ" field="currentPassword" errors={errors} />  
                <PasswordField register={register} label="Nhập mật khẩu mới" field="newPassword" errors={errors} />
                <PasswordField register={register} label="Nhập lại mật khẩu mới" field="confirmNewPassword" errors={errors}
                 />        
                <div className="btn-container">
                    <button className="form-field" type="submit" onClick={Onreset}>Cập nhật</button>
                </div>
            </form>  
        </div>
    )
}

export default ResetPassword
