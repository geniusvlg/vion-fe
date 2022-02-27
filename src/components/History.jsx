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
const History = () => {
  return(
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
      )
};

export default History;
