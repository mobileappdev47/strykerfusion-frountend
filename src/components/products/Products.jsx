import React, { useEffect, useRef, useState } from 'react';
import style from './products.module.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import axios from 'axios';
import SingleProduct from '../singleproduct/SingleProduct';

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

  const scales = [
    useTransform(scrollYProgress, [0, 1], [4, 1]),
    useTransform(scrollYProgress, [0, 1], [4, 1]),
    useTransform(scrollYProgress, [0, 1], [4, 1]),
    useTransform(scrollYProgress, [0, 1], [4, 1]),
    useTransform(scrollYProgress, [0, 1], [4, 1])
  ];

  const widths = [
    // useTransform(scrollYProgress, [0, 1], ['100%', '100%']),
    // useTransform(scrollYProgress, [0, 1], ['100%', '0%']),
    // useTransform(scrollYProgress, [0, 1], ['100%', '0%']),
    // useTransform(scrollYProgress, [0, 1], ['100%', '0%']),
    // useTransform(scrollYProgress, [0, 1], ['100%', '0%']),
  ]

  const heights = [
    // useTransform(scrollYProgress, [0, 1], ['100%', '0%']),
    // useTransform(scrollYProgress, [0, 1], ['100%', '0%']),
    // useTransform(scrollYProgress, [0, 1], ['100%', '0%']),
    // useTransform(scrollYProgress, [0, 1], ['100%', '0%']),
    // useTransform(scrollYProgress, [0, 1], ['100%', '0%']),
  ]

  const tops = [
    useTransform(scrollYProgress, [0, 1], ['31%', '0%']),
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

  const fontSizes = [
    useTransform(scrollYProgress, [0, 1], ['10px', '10px']), // Adjust these values according to your font size needs
    useTransform(scrollYProgress, [0, 1], ['16px', '16px']),
    useTransform(scrollYProgress, [0, 1], ['16px', '16px']),
    useTransform(scrollYProgress, [0, 1], ['16px', '16px']),
    useTransform(scrollYProgress, [0, 1], ['16px', '16px'])
  ];

  const contentBoxScale = useTransform(scales[0], [2.8, 1], [0.5, 1]);
  const rearrangedProducts = products.length > 0 ? [products[products.length - 1], ...products.slice(0, products.length - 1)] : [];
  const contentBoxTop = useTransform(tops[3], ["31px", "0px"], ['50px', '31px'])

  // console.log(rearrangedProducts);

  // const contentBoxLeft = useTransform(scrollYProgress, progress => progress === 0 ? '0%' : '0');
  return (
    <>
      <div>
        <SingleProduct />
        <div ref={container} className={style.container}>
          <div className={`row ${style.sticky}`}>
            {rearrangedProducts?.map(({ productImage, productTitle }, index) => (
              <motion.div
                key={index}
                style={{
                  scale: scales[index],
                  opacity: opacities[index], top: tops[index], bottom: bottoms[index],
                  width: widths[index],
                  height: heights[index],
                  fontSize: fontSizes[index]
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
                  <motion.div
                    style={{ scale: contentBoxScale, top: contentBoxTop }}
                    className={style.contentbox}>
                    <h1 className={style.headingfontimg}>{productTitle}</h1>
                    <h1 className={style.imgcontent}>
                      View Project
                    </h1>
                  </motion.div>
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
