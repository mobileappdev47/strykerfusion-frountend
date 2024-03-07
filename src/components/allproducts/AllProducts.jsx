import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import style from './allproducts.module.css';
import { useInView } from 'react-intersection-observer';
import { base_url } from '../../config/Base_url';
import axios from 'axios';

const Product = ({ item, index }) => {

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: index < 2 ? '-100%' : '100%' },
    visible: { opacity: 1, y: '0%', transition: { duration: 0.5, staggerChildren: 0.1 } },
    exit: { opacity: 0, y: index < 2 ? '100%' : '-100%', transition: { duration: 0.5 } }
  };

  return (
    <div ref={ref} className="col-6 px-1 pb-3 px-sm-3 h-50 d-flex justify-content-center align-items-center">
      <motion.div
        className={`${style.imageContainer} h-100`}
        initial="hidden"
        animate={controls}
        exit="exit"
        variants={variants}
      >
        <div className={style.imagegradient}></div>
        <img src={`${base_url}/${item?.productImage}`} className={`${style.productimage} img-fluid`} alt='product' />
        <div className={style.contentbox}>
          <h1 className={style.headingfontimg}>{item?.productTitle}</h1>
          <h1 className={style.imgcontent}>
            View Project
          </h1>
        </div>
      </motion.div>
    </div>
  );
};

const AllProducts = ({ products }) => {

  return (
    <div className={style.maindiv}>
      <div className={`row ${style.imgsection}`}>
        {products?.slice(0, 4)?.map((item, index) => (
          <Product key={item?._id} index={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;