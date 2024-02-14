import React from 'react';
import style from './handcraft.module.css';
import craftimg from '../../assets/Case-study__image (2).png';
import { motion } from 'framer-motion';

const Handcraft = () => {
  // Custom ease values for cubic-bezier curve
  const customEase = [0.6, -0.05, 0.01, 0.99];

  return (
    <>
      <div className={style.maindiv}>
        <div className="row w-100">
          <div className="col-lg-6 col-12 d-flex flex-column justify-content-center">
            <div>
              <motion.h1 initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: customEase }} className={style.headingfont}>
                Handcrafted for
              </motion.h1>
              <motion.h1 initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5, ease: customEase }} className={style.headingfont}>
                Business and Startups
              </motion.h1>
            </div>
            <motion.button initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 1, ease: customEase }} className={`btn mt-5 ${style.getstartedbtn}`}>
              Get Started
            </motion.button>
          </div>
          <motion.div initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: customEase }} className="col-lg-6 col-12">
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
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Handcraft;
