import React from 'react'

const Cards = () => {
  return (
    <div>
      
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



