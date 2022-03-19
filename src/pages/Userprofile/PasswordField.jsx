import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";


function PasswordField( { register, label, field, errors } ) {

  const [showEye, setShowEye] = useState(false);

  const toggleShowEye = () => {
    setShowEye(!showEye);
  }

  return (
    <div className="form-group-item">
      <label>{label}</label>
      <input
          className="form-field"
          type={ showEye ? 'text' : "password"}
          {...register(field)}
      />
      <button type='button' className='edit-btn-icon-pw' onClick={toggleShowEye}>
        {!showEye ? <AiFillEyeInvisible size={24} />  :<AiFillEye size={24} />}
      </button>
      {errors[field] && <span className="error">{errors[field].message}</span>} 
    </div> 
  )
}
export default PasswordField
