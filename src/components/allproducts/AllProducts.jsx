import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import style from './allproducts.module.css';
import product1 from '../../assets/product1.png';
import { useInView } from 'react-intersection-observer';

const Product = ({ index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

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
        <img src={product1} className={`${style.productimage} img-fluid`} alt='product' />
        <div className={style.contentbox}>
          <h1 className={style.headingfontimg}>Growth Tracker</h1>
          <h1 className={style.contentimg}>View Project</h1>
        </div>
      </motion.div>
    </div>
  );
};

const AllProducts = () => {
  return (
    <div className={style.maindiv}>
      <div className={style.products}>
        <h1 className={style.headingfont}>Our Products</h1>
        <p className={style.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <br /> tempor incididunt</p>
      </div>
      <div className={`row ${style.imgsection}`}>
        {[0, 1, 2, 3].map(index => (
          <Product key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
