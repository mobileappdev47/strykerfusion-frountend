import React, { useEffect, useRef, useState } from 'react';
import style from './products.module.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import axios from 'axios';

const Products = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/product`);
        setProducts(response?.data?.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  // Define different useTransform hooks for scaling
  const scales = [
    useTransform(scrollYProgress, [0, 1], [4, 1]),
    useTransform(scrollYProgress, [0, 1], [4, 1]),
    useTransform(scrollYProgress, [0, 1], [4, 1]),
    useTransform(scrollYProgress, [0, 1], [4, 1]),
    useTransform(scrollYProgress, [0, 1], [4, 1])
  ];

  return (
    <>
      {
        products.map((product, index) => (
          <div key={index} style={{ height: '100%' }}>
            <div className={`${style.maindiv}`}>
              <div
                className={`product-item ${style.imgsection}  mb-4 mx-sm-3`}
              >
                <div className={style.imagegradient}></div>
                <img
                  className={`h-100 w-100`}
                  src={`${process.env.REACT_APP_BASE_URL}/${product?.productImage}`}
                  alt='product'
                />
                <div className={style.contentbox}>
                  <h1 className={style.imgheadingfont}>{product?.productTitle}</h1>
                  <h1 className={style.imgcontent}>View Project</h1>
                </div>
              </div>
            </div>
          </div>
        ))
      }
      <div ref={container} className={style.container}>
      <div className={`row ${style.sticky}`}>
        {products?.map(({ productImage, productTitle }, index) => (
          <motion.div 
            key={index} 
            style={{ scale: scales[index] }} 
            className={`${style.el}`}
          >
            <div className={style.imageContainer}>
              <img 
                src={`${process.env.REACT_APP_BASE_URL}/${productImage}`} 
                className={`${style.productimage} img-fluid`} 
                alt='product' 
              />
              <div className={style.contentbox}>
                <h1 className={style.headingfontimg}>{productTitle}</h1>
                <h1 className={style.imgcontent}>
                  View Project
                </h1>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Products;
