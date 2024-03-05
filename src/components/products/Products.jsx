import React, { useEffect, useRef, useState } from 'react';
import style from './products.module.css';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { base_url } from '../config/Base_url';

const Products = ({ item, index, sectionAlign }) => {

  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
          sectionAlign();
        } else {
          controls.start('hidden');
        }
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
  }, [controls, sectionAlign]);

  const variants = {
    hidden: { opacity: 1, y: -100, scale: 1 },
    visible: { opacity: 1, y: 1, scale: 1 },
  };

  return (
    <>
      <div className={style.maindiv} ref={ref}>
        <AnimatePresence>
          <motion.div
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{ duration: 0.5 }}
            className={`product-item ${style.imgsection}  mb-4 mx-sm-3`}
          >
            <div className={style.imagegradient}></div>
            <img
              className={`h-100 w-100`}
              src={`${base_url}/${item?.productImage}`}
              alt='product'
            />
            <div className={style.contentbox}>
              <h1 className={style.imgheadingfont}>{item?.productTitle}</h1>
              <h1 className={style.imgcontent}>View Project</h1>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default Products;