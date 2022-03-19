import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiFillLock } from "react-icons/ai";
import PasswordField from './PasswordField';

const resetPasswordFormSchema = yup.object().shape({
    currentPassword: yup
        .string()
        .required("Vui lòng nhập mật khẩu cũ"),
    newPassword: yup
        .string()
        .required("Vui lòng nhập mật khẩu mới"),
});

function ResetPassword() {

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
        console.log(data)
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
                    <button className="form-field" type="submit">Cập nhật</button>
                </div>
            </form>  
        </div>
    )
}

export default ResetPassword
