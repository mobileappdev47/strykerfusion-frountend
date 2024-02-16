import React from 'react'
import style from './allproducts.module.css'
import product1 from '../../assets/product1.png'

const AllProducts = () => {
    return (
        <div className={style.maindiv}>
            <div className={style.products}>
                <h1 className={style.headingfont}>Our Products</h1>
                <p className={style.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <br /> tempor incididunt</p>
            </div>
            <div className={`row ${style.imgsection}`}>
            {[...Array(4)].map((_, index) => ( // Create an array of length numberOfColumns and map over it
          <div key={index} className="col-6 px-1 pb-3 px-sm-3 h-50 d-flex justify-content-center align-items-center">
            <div className={`${style.imageContainer} h-100`}>
              <div className={style.imagegradient}></div>
              <img src={product1} className={`${style.productimage} img-fluid`} alt='product' />
              <div className={style.contentbox}>
                <h1 className={style.headingfontimg}>Growth Tracker</h1>
                <h1 className={style.contentimg}>View Project</h1>
              </div>
            </div>
          </div>
        ))}
            </div>
        </div>
    )
}

export default AllProducts