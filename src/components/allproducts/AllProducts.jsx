import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import style from './allproducts.module.css';
import product1 from '../../assets/product1.png';
import { useInView } from 'react-intersection-observer';
import { base_url } from '../config/Base_url';
import axios from 'axios';

const Product = ({ item, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false });

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
        </div>
      </motion.div>
    </div>
  );
};

const AllProducts = ({ products }) => {
  const [productMain, setProductMain] = useState([])
  const [errors, setErrors] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/productmain`);
      setProductMain(response.data?.data);
    } catch (error) {
      setErrors(error);
      console.error('Error fetching home data:', error);
    }
  };

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className={style.maindiv}>
      <div className={style.products}>
        <h1 className={style.headingfont}>{productMain?.productTitle}</h1>
        <p className={style.content}>{productMain?.productDescription}</p>
      </div>
      <div className={`row ${style.imgsection}`}>
        {products?.slice(0, 4)?.map((item, index) => (
          <Product key={item?._id} index={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;