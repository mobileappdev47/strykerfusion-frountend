import React from 'react'
import style from './allproducts.module.css'
import product1 from '../../assets/product1.png'

const AllProducts = () => {
    return (
        <div className={style.maindiv}>
            <h1 className={style.headingfont}>Our Products</h1>
            <p className={style.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <br /> tempor incididunt</p>
            <div className="row">
                <div className="col-md-6 px-4 pb-5 d-flex justify-content-end align-items-center">
                    <div className={style.imageContainer}>
                        <div className={style.imagegradient}></div>
                        <img src={product1} className={style.productimage} alt='product' />
                        <div className={style.contentbox}>
                            <h1 className={style.headingfontimg}>Growth Tracker</h1>
                            <h1 className={style.contentimg}>View Project</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 px-4 pb-5 d-flex justify-content-start align-items-center">
                    <div className={style.imageContainer}>
                        <div className={style.imagegradient}></div>
                        <img src={product1} className={style.productimage} alt='product' />
                        <div className={style.contentbox}>
                            <h1 className={style.headingfontimg}>Growth Tracker</h1>
                            <h1 className={style.contentimg}>View Project</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 px-4 d-flex justify-content-end align-items-center">
                    <div className={style.imageContainer}>
                        <div className={style.imagegradient}></div>
                        <img src={product1} className={style.productimage} alt='product' />
                        <div className={style.contentbox}>
                            <h1 className={style.headingfontimg}>Growth Tracker</h1>
                            <h1 className={style.contentimg}>View Project</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 px-4 d-flex justify-content-start align-items-center">
                    <div className={style.imageContainer}>
                        <div className={style.imagegradient}></div>
                        <img src={product1} className={style.productimage} alt='product' />
                        <div className={style.contentbox}>
                            <h1 className={style.headingfontimg}>Growth Tracker</h1>
                            <h1 className={style.contentimg}>View Project</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts