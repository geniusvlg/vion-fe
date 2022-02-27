import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import {Product, Sale_Product } from '../assets/fake-data/data'

const Product_List = () => {
    return (
        <div className='big-container'>
        <section className="shop-product home">
        <div className="box-container">
          <div className="left-col">
            <div className="left-col-1">
              <h2 className="title">Product Categories</h2>
              <div className="box">
                <div className="check">
                  <i className="fas fa-caret-right" />
                  <a href="#">Beverages</a>
                </div>
                <div className="check">
                  <i className="fas fa-caret-right" />
                  <a href="#">Biscuits, Snacks &amp; Chocolates</a>
                </div>
                <div className="check">
                  <i className="fas fa-caret-right" />
                  <a href="#">Breakfast &amp; Dairy</a>
                </div>
                <div className="check">
                  <i className="fas fa-caret-right" />
                  <a href="#">Fruits &amp; Vegetables</a>
                </div>
                <div className="check">
                  <i className="fas fa-caret-right" />
                  <a href="#">Furnishing &amp; Home Needs</a>
                </div>
                <div className="check">
                  <i className="fas fa-caret-right" />
                  <a href="#">Grocery &amp; Staples</a>
                </div>
                <div className="check">
                  <i className="fas fa-caret-right" />
                  <a href="#">Home &amp; Kitchen</a>
                </div>
                <div className="check">
                  <i className="fas fa-caret-right" />
                  <a href="#">Household Needs</a>
                </div>
                <div className="check">
                  <i className="fas fa-caret-right" />
                  <a href="#">Meats, Frozen &amp; Seafood</a>
                </div>
                <div className="check">
                  <i className="fas fa-caret-right" />
                  <a href="#">Noodles, Sauces &amp; Instant Food</a>
                </div>
                <div className="check">
                  <i className="fas fa-caret-right" />
                  <a href="#">Personal Care</a>
                </div>
                <div className="check">
                  <i className="fas fa-caret-right" />
                  <a href="#">Pet Care</a>
                </div>
              </div>
            </div>
            <div className="col-2 left-col-1">
              <h2 className="title">Product Status</h2>
              <div className="box">
                <div className="check">
                  <i className="fas fa-caret-right" />
                  <a href="#">In Stock</a>
                </div>
                <div className="check">
                  <i className="fas fa-caret-right" />
                  <a href="#">on sales</a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h2 className="title">Products</h2>
              <div className="box">
                  {Sale_Product.map((item)=>(
                      <div className="image">
                      <img src={item.image} alt="" />
                      <div className="content">
                        <h3>{item.title}</h3>
                        <p><span>{item.main_price}</span>{item.sub_price}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* ----------- right-col starts -----------  */}
          <div className="right-col">
            <div className="logo">
              <a href="#"><img src="images/shop-1.webp" alt="" /></a>
            </div>
            <div className="right-col-1">
              <div className="icons">
                <i className="fas fa-th-large" />
                <i className="fas fa-th-list" />
              </div>
              <div className="select">
                <select>
                  <option>sort by popularity</option>
                  <option>sort by average rating</option>
                  <option selected>sort by latest</option>
                  <option>sort by price: low to high</option>
                  <option>sort by price: hight to low</option>
                </select>
              </div>
            </div>
            <div className="right-col-3">
              <section className="product">
                <div className="box-container">
                    {Product.map((item)=>(
                        <div className="box">
                        <span className="discount">-33%</span>
                        <div className="corner-box"><span /></div>
                        <img src={item.image} alt="" />
                        <h3>{item.title}</h3>
                        <p>in stock - <span>1</span>kg</p>
                        <div className="price"><span>{item.main_price}</span>{item.sub_price}</div>
                        <button type="button" className="btn">add to cart</button>
                      </div>
                    ))}
                </div>
              </section>
            </div>
            <div className="next-page">
              <div className="page">1</div>
              <div className="page">2</div>
              <div className="page"><i className="far fa-arrow-right" /></div>
            </div>
          </div>
        </div>
      </section>
      </div>
    )
}

export default Product_List
