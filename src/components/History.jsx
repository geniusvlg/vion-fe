import React from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";
const Inform = styled.td`
  padding-left: 2rem;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
const CardButtonset = styled.fieldset`
  position: relative;
  padding: 20px;
  margin: 0;
  border: 0;
  & + & {
    margin-top: 24px;
  }

  &:nth-last-of-type(2) {
    margin-top: 32px;
  }

  &:last-of-type {
    text-align: center;
  }
`;
const CardButton = styled.button`
  display: block;
  width: 50%;
  padding: 12px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: black;
  background-color: #ffffff;
  border: .1rem gray solid;
  border-radius: 35px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;
const History = () => {
  return(
    <>
    <div>
    <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Ngày đặt hàng</th>
                    <th>Tình trạng</th>
                    <th>Tổng số tiền</th>
                    <th>Thông tin đơn hàng</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </Table>
    
    </div>
      <CardButtonset>
      <CardButton>Mua lại đơn hàng</CardButton>
  </CardButtonset>
  </>
      )
};

export default History;
