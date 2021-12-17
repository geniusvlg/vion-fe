import React from 'react'
import '../css/App.css';
import { Category } from '../assets/fake-data/data'


const Sidebar = () => {
    return (
  <div className="left-col">
    <h2 className="title">Danh mục sản phẩm</h2>
    <div className="box">
      {Category.map((item)=>(
      <a href="#"key={item.id}><img src={item.image}/><p>{item.title}</p><span>{item.number_of_products}</span></a>
      ))}
    </div>
  </div>
    )
}

export default Sidebar