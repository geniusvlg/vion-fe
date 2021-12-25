import React from "react";
import { Table } from 'react-bootstrap';
import { OrderHistory } from "../../assets/fake-data/data";
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components'

const CardWrapper = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  margin: 48px auto 0;
  width: 1000px;
  font-family: Helvetica, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  background-color: white;
`;

const HistoryOrder = () => {
  return (
<CardWrapper>
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
        {OrderHistory.map((item)=>(
            <tr>
                <td>{item.id}</td>
                <td>{item.date}</td>
                <td>{item.status}</td>
                <td>{item.total_price}</td>
                <td><a href={item.inform}>Xem chi tiết</a><a href="">Đặt hàng lại</a></td>
            </tr>
         ))}
            
      
        </tbody>
    </Table>
</CardWrapper>
    

  );
}

export default HistoryOrder
