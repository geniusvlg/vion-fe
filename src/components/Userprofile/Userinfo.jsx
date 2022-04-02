import React, {  useContext,useEffect,useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Userinfo.css';
import { AuthContext } from "../../context/AuthContext";
const Title = styled.h2`
  text-align: center;
  color: black;
  
`;
const Wrapper = styled.section`
  padding: 10px;
  background: #b4e49c;
  margin: 5% 10% 10%;
`;

const Userinfo = () => {
  const context=useContext(AuthContext)
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/updateinfo`; 
    navigate(path);
  }
  return (
    <div>   
        <div className="container">
          <div className="main-body">
            <div className="row">
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/240px-User-avatar.svg.png"
                        className="rounded-circle p-1 bg-light"
                        width={110}
                      />
                      <div className="mt-3">
                        <h4>Tên Tài khoản </h4>
                        <p className="text-secondary mb-1">
                            <h5>{context.user.Infouser[0]?.customer_name}</h5>
                            </p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Họ tên</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                      <h6 className="mb-0">{context.user.Infouser[0]?.full_name}</h6>
                      </div>
                    </div>
                   {/* <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                      <h6 className="mb-0">Email</h6>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Giới tính</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                      <h6 className="mb-0">{context.user.Infouser[0]?.gender? "nam" : "nữ"}</h6>
                      </div>
                    </div>*/}
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Số điện thoại</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                      <h6 className="mb-0">{context.user.Infouser[0]?.phone_number}</h6>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Địa chỉ</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                      <h6 className="mb-0">{context.user.Infouser[0]?.address.address_des}</h6>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Thành phố</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                      <h6 className="mb-0">{context.user.Infouser[0].address.district.city[0].name}</h6>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Quận</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                      <h6 className="mb-0">{context.user.Infouser[0].address.district.name}</h6>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Phường</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                      <h6 className="mb-0">{context.user.Infouser[0].address.province.name}</h6>
                      </div>
                    </div>
                  <div className="btn-container">
                  <button className="form-field" onClick={routeChange}>Chỉnh sửa thông tin</button>
                  
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  )
}

export default Userinfo