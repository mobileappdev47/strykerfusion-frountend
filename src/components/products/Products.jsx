import React, { useEffect, useRef, useState } from 'react';
import style from './products.module.css';
import { motion, useInView } from 'framer-motion';
import { base_url } from '../config/Base_url';
import axios from 'axios';

const Products = ({ item, index }) => {
  const [productMain, setProductMain] = useState([])
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const { ref: inViewRef } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/productmain`);
      setProductMain(response.data?.data);
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  };

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
      <div className={style.maindiv}>
        <div className={style.products}>
          <h1 className={style.headingfont}>{productMain?.productTitle}</h1>
          <p className={style.content}>{productMain?.productDescription}</p>
        </div>
        <div className={`${style.imgsection}`}>
          <div ref={inViewRef} className='h-100'>
            <motion.div
              ref={ref}
              className={`h-100`}
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
              transition={{ duration: 0.5 }}
            >
              <div className='position-relative h-100 w-100'>
                <div className={style.imagegradient}></div>
                <img className='h-100 w-100' src={`${base_url}/${item?.productImage}`} alt='product' />
                <div className={style.contentbox}>
                  <h1 className={style.imgheadingfont}>
                    {item?.productTitle}
                  </h1>
                  <h1 className={style.imgcontent}>
                    View Project
                  </h1>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Products;