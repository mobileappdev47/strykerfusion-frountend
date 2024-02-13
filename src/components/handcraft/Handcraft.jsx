import React from 'react'
import style from './handcraft.module.css'
import craftimg from '../../assets/Case-study__image (2).png'

const Handcraft = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-12 d-flex flex-column justify-content-center">
          <div>
            <h1 className={style.headingfont}>Handcrafted for </h1>
            <h1 className={style.headingfont}>Business and Startups</h1>
          </div>
          <button className={`btn mt-5 ${style.getstartedbtn}`}> Get Started</button>
        </div>
        <div className="col-lg-6 col-12 d-flex">
          <div id="carouselExampleIndicators" className={`carousel slide w-100 ${style.craftimg}`} data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={craftimg} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={craftimg} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={craftimg} className="d-block w-100" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Handcraft
