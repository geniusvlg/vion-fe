import React from 'react'
import {useCart} from 'react-use-cart'



const Cards = (props) => {
    const {addItem} = useCart();
    return (
            <div className="box">
                <span className="discount">-33%</span>
                <div className="corner-box"><span /></div>
                <a href= {`/product_details/${props.id}`}><img src={props.image}/></a>
                <h3>{props.title}</h3>
                <p>instock - <span>1</span>kg</p>
                <div className="price"><span>{props.main_price}</span>{props.sub_price}</div>
                <button type="button" className="btn" onClick={()=>addItem(props.item)}>Add to cart</button>
            </div>
    )
}

export default Cards


/*import React from 'react'
import axios from 'axios';
import '../css/Card.css'
export default class ImageSlider extends React.Component {
  state = {
    teh: []
    }
    componentDidMount() {
    axios.get(`http://localhost:3000/superpro`)
    .then(res => {
    const teh = res.data;
    this.setState({ teh });
    })
    }// react hook <=
    render() {
      return (
        <>{
          this.state.teh.map((item) => (
            <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <h5 className="card-title">{item.header}</h5>
            </div>
          </div><img className="card-image" src={item.url} alt="Logo" /><div className="card-price">{item.para}</div><div className="card-btnr">
            </div>
            <button class="button button2">Chọn mua</button>
            </div>
          ))}
        </>
      )
  }
}*/



