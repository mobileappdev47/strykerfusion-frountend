import React, { useEffect, useRef, useState } from 'react';
import style from './products.module.css';
import { AnimatePresence, motion, useAnimation, useInView } from 'framer-motion';
import { base_url } from '../config/Base_url';
import axios from 'axios';

const Products = () => {
  const [productMain, setProductMain] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/product`);
        setProducts(response?.data?.data || []);
        setIsDataFetched(true);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    if (!isDataFetched) {
      fetchData();
    }
  }, [isDataFetched]);

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
  console.log(isVisible)
  useEffect(() => {
    fetchData();
  }, []);

  const controls = useAnimation();

  console.log(isVisible)
  return (
    <>
      <div className={style.maindiv}>
        <div className={style.products}>
          <h1 className={style.headingfont}>{productMain?.productTitle}</h1>
          <p className={style.content}>{productMain?.productDescription}</p>
        </div>
        <div className={style.parentscrolldiv} ref={ref} >
          {products?.map((item, index) => (
            <AnimatePresence>
              {isVisible && (
                <div
                  className={`${style.imgsection}  py-4 px-sm-3`} key={index} id={`product_${item._id}`}
                >
                  <motion.div initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
                    transition={{ duration: 0.5 }} className={` position-relative h-100`}>
                    <div className={style.imagegradient}></div>
                    <img
                      className={`h-100 w-100`}
                      src={`${base_url}/${item?.productImage}`} alt='product' />

                    <div className={style.contentbox}>
                      <h1 className={style.imgheadingfont}>
                        {item?.productTitle}
                      </h1>
                      <h1 className={style.imgcontent}>
                        View Project
                      </h1>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          ))}
          <AnimatePresence>
            {isVisible && (
              <div className={`row ${style.imgsection}`}>
                {products?.slice(0, 4)?.map((item, index) => (
                  <div ref={ref} className="col-6 px-1 pb-3 px-sm-3 h-50 d-flex justify-content-center align-items-center">
                    <motion.div
                      className={`${style.imageContainer} h-100`}
                    >
                      <div className={style.imagegradient}></div>
                      <img src={`${base_url}/${item?.productImage}`} className={`${style.productimage} img-fluid`} alt='product' />
                      <div className={style.contentbox}>
                        <h1 className={style.headingfontimg}>{item?.productTitle}</h1>
                        <h1 className={style.allimgcontent}>
                          View Project
                        </h1>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>)}
          </AnimatePresence>
        </div>
      </div>
    </>

  );
};

export default Products;