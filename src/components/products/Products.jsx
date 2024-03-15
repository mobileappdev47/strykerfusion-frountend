import React, { useEffect, useRef, useState } from 'react';
import style from './products.module.css';
import { motion, useAnimation } from 'framer-motion';
import { base_url } from '../../config/Base_url';

const Products = ({ item, index, handleMouseEnter, handleMouseLeave }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [scrollDirection, setScrollDirection] = useState('up');
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
        threshold: 0.5, // Adjust the threshold as needed, 0.5 means when 50% of the product is visible
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
      clipPath: scrollDirection === 'down' ? "circle(600px at 50% 100%)" : "circle(600px at 50% 0%)",
      transition: {
        opacity: { duration: 0.3 }, // Keep opacity duration constant for smoothness
        type: 'spring',
        stiffness: 200, // Lower stiffness for smoother animation
        damping: 25, // Increase damping for smoother animation
        delay: .4,
        ease: [0.33, 1, 0.68, 1], // Custom easing
      },
    },
    visible: {
      clipPath: scrollDirection === 'down' ? "circle(1200px at 50% 0%)" : "circle(1200px at 50% 100%)",
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
    <div style={{ height: '100%' }} ref={ref}>
      <div className={`${style.maindiv}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <motion.div
          initial="hidden" // If it's the first image and scrolling down, set it to visible without animation
          animate={controls}
          variants={variants}
          transition={{ duration: 0.5 }} // Adjust duration for smoother animation
          className={`product-item ${style.imgsection}  mb-4 mx-sm-3`}
        >
          <div className={style.imagegradient}></div>
          <motion.img
            className={`h-100 w-100`}
            src={`${process.env.REACT_APP_BASE_URL}/${item?.productImage}`}
            alt='product'
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
          />
          <div className={style.contentbox}>
            <h1 className={style.imgheadingfont}>{item?.productTitle}</h1>
            <h1 className={style.imgcontent}>View Project</h1>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Products;
