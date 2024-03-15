import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import style from './allproducts.module.css';
import { base_url } from '../../config/Base_url';

const Product = ({ item, index }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [scrollDirection, setScrollDirection] = useState('down');
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        } else {
          controls.start('hidden');
        }
      },
      {
        threshold: 0.5, // Adjust the threshold as needed
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
  }, [controls]);

  const variants = {
    hidden: {
      clipPath: scrollDirection === 'down' ? "circle(500px at 50% 0%)" : "circle(500px at 50% 100%)",
      opacity: 0.4,
      transition: {
        opacity: { duration: 0.3 }, // Keep opacity duration constant for smoothness
        type: 'spring',
        stiffness: 200, // Lower stiffness for smoother animation
        damping: 25, // Increase damping for smoother animation
        delay: 0.5,
        ease: [0.33, 1, 0.68, 1], // Custom easing
      },
    },
    visible: {
      clipPath: scrollDirection === 'down' ? "circle(1200px at 50% 0%)" : "circle(1200px at 50% 100%)",
      opacity: 1,
      transition: {
        opacity: { duration: 0.3 }, // Keep opacity duration constant for smoothness
        type: 'spring',
        stiffness: 20, // Lower stiffness for smoother animation
        damping: 25, // Increase damping for smoother animation
        ease: [0.33, 1, 0.68, 1], // Custom easing
      },
    },
  };

  return (
    <div ref={ref} className="col-6 px-1 pb-3 px-sm-3 h-50 d-flex justify-content-center align-items-center">
      <motion.div
        className={`${style.imageContainer} h-100`}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        <div className={style.imagegradient}></div>
        <img src={`${process.env.REACT_APP_BASE_URL}/${item?.productImage}`} className={`${style.productimage} img-fluid`} alt='product' />
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

const AllProducts = ({ products, handleMouseEnter, handleMouseLeave }) => {
  return (
    <div className={style.maindiv} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={`row ${style.imgsection}`}>
        {products?.map((item, index) => (
          <Product key={item?._id} index={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
