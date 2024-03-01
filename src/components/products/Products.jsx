import React, { useEffect, useRef, useState } from 'react';
import style from './products.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { base_url } from '../config/Base_url';
import axios from 'axios';

const Products = () => {
  const [productMain, setProductMain] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0); // Track the index of the visible item
  const ref = useRef(null);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [scrollSnapEnabled, setScrollSnapEnabled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollSnapEnabled(false);
      setTimeout(() => {
        setScrollSnapEnabled(true);
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const elements = document.querySelectorAll('.product-item');
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const { top, height } = element.getBoundingClientRect();
        if (top + height > scrollPosition) {
          setVisibleIndex(i); // Update visibleIndex based on scroll position
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    fetchData();
  }, []);

  return (
    <>
      <div className={style.maindiv}>
        <div className={style.products}>
          <h1 className={style.headingfont}>{productMain?.productTitle}</h1>
          <p className={style.content}>{productMain?.productDescription}</p>
        </div>
        <div className={style.parentscrolldiv} style={{ scrollSnapType: scrollSnapEnabled ? 'y mandatory' : 'none' }} ref={ref}>
          <AnimatePresence>
            {products?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: visibleIndex === index ? 1 : 1, y: visibleIndex === index ? 10 : 10 }}
                transition={{ duration: 0.5 }}
                className={`product-item ${style.imgsection}  my-4 mx-sm-3`}
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
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {products?.reduce((chunks, item, index) => {
              if (index % 4 === 0) {
                chunks.push(products.slice(index, index + 4));
              }
              return chunks;
            }, []).map((chunk, chunkIndex) => (
              <div className={`row ${style.imgsection}`} key={chunkIndex}>
                {chunk.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ duration: 0.5 }}
                    className="col-6 px-1 pb-3 px-sm-3 h-50 d-flex justify-content-center align-items-center"
                  >
                    <div className={`${style.imageContainer} h-100`}>
                      <div className={style.imagegradient}></div>
                      <img src={`${base_url}/${item?.productImage}`} className={`${style.productimage} img-fluid`} alt='product' />
                      <div className={style.contentbox}>
                        <h1 className={style.headingfontimg}>{item?.productTitle}</h1>
                        <h1 className={style.allimgcontent}>View Projects</h1>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </AnimatePresence>

        </div>
      </div>
    </>
  );
};

export default Products;