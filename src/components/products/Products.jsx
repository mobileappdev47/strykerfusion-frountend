import React, { useEffect, useRef, useState } from 'react';
import style from './products.module.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);

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

  const container1 = useRef(null);
  const { scrollY } = useScroll({
    target: container1,
    offset: ['start end', 'start start']
  });

  const scales = [
    useTransform(scrollYProgress, [0, 1], [2.8, 1]),
    useTransform(scrollYProgress, [0, 1], [3.6, 1]),
    useTransform(scrollYProgress, [0, 1], [3.6, 1]),
    useTransform(scrollYProgress, [0, 1], [3.6, 1]),
    useTransform(scrollYProgress, [0, 1], [3.6, 1])
  ];

  // scales[2] = useTransform(scrollXProgress, [0, 1], [3.6, 1]);

  const tops = [
    useTransform(scrollYProgress, [0, 1], ['30%', '0%']),
    useTransform(scrollYProgress, [0, 1], ['50%', '0%']),
    useTransform(scrollYProgress, [0, 1], ['30%', '0%']),
    useTransform(scrollYProgress, [0, 1], ['30%', '0%']),
    useTransform(scrollYProgress, [0, 1], ['50%', '0%']),
  ]

  const bottoms = [
    useTransform(scrollYProgress, [0, 1], ['100%', '30%'])
  ]

  const opacities = [
    useTransform(scrollYProgress, [1, 1, 1], [1, 1, 1]),
    useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]),
    useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]),
    useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]),
    useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])
  ];

  // Rearrange the products array to place the last image at the beginning
  const rearrangedProducts = products.length > 0 ? [products[products.length - 1], ...products.slice(0, products.length - 1)] : [];
  const firstMapProducts = products.slice(0, products.length - 1);
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 }
  };
  
  return (
    <>
      <div>
        <div>
          {firstMapProducts.map((product, index) => (
            <div key={index}>
              <div className={`${style.maindiv}`}>
              <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={imageVariants}
                  transition={{ duration: 0.5 }}
                  className={`${style.imgsection} mx-sm-3`}>
                  <div className=''>
                    <div className={style.imagegradient}></div>
                    <img
                      className={style.singleproimg}
                      src={`${process.env.REACT_APP_BASE_URL}/${product?.productImage}`}
                      alt='product'
                    />
                  </div>
                  <div className={style.contentbox}>
                    <h1 className={style.imgheadingfont}>{product?.productTitle}</h1>
                    <h1 className={style.imgcontent}>View Project</h1>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
        <div ref={container} className={style.container}>
          <div className={`row ${style.sticky}`}>
            {rearrangedProducts?.map(({ productImage, productTitle }, index) => (
              <motion.div
                key={index}
                style={{
                  scale: scales[index],
                  opacity: opacities[index], top: tops[index], bottom: bottoms[index]
                }}
                className={`${style.el}`}
              >
                <div className={style.imageContainer} >
                  <div className={style.imagegradient}></div>
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/${productImage}`}
                    className={`${style.productimage}`}
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
      </div>

    </>
  );
};

export default Products;
