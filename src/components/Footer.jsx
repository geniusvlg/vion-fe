import React from 'react'
import { Container,Row,Col} from 'react-bootstrap-v5'
import * as Icon from 'react-bootstrap-icons'
const Footer = () => {
    return (
        <div>
            <Container>
  <Row>
    <Col>Thông tin Công Ty: Công ty TNHH Đức Tâm Hiệp, Địa chỉ 168 Ngô Quyền, phường 1, tp Cà Mau, Mã số thuế : 2000266853</Col>
    <Col>
    Find us on 
    <Icon.Facebook/> 
    <Icon.Instagram/>
    <Icon.Youtube/>
    </Col>
  </Row> </Container>
        </div>
    )
}

export default Footer
