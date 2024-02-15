import React, { useEffect, useRef, useState } from 'react';
import product1 from '../../assets/product1.png';
import style from './products.module.css';
import { motion ,useInView} from 'framer-motion';

const Products = ({ index }) => {
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

  return (
    <>
      <div ref={inViewRef}>
        <motion.div
          ref={ref}
          className={style.maindiv}
          key={index}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
          transition={{ duration: 0.5 }}
        >
          <div className='position-relative h-100 w-100'>
            <div className={style.imagegradient}></div>
            <img className='h-100 w-100' src={product1} alt='product' />
            <div className={style.contentbox}>
              <h1 className={style.headingfont}>
                Growth Tracker
              </h1> 
              <h1 className={style.content}>
                View Project
              </h1>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Products;
