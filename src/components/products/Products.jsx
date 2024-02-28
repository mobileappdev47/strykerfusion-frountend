import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import style from './products.module.css';
import { motion, useInView } from 'framer-motion';
import { base_url } from '../config/Base_url';
import axios from 'axios';
import classnames from "classnames";

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

  useEffect(() => {
    fetchData();
  }, []);

  const [visibleImagesMap, setVisibleImagesMap] = useState(
    products.reduce((map, image) => { // Corrected the method name to 'reduce'
      map[image] = false;
      return map;
    }, {})
  );

  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;

      const newVisibleImagesMap = products?.reduce((map, image) => { // Corrected the method name to 'reduce'
        map[image] = scrollTop >= image * viewportHeight;
        return map;
      }, {});

      setVisibleImagesMap(newVisibleImagesMap);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      <div className={style.app}>
        <div className={` ${style.sticky} `}>
          {/* <div className={style.products}>
          <h1 className={style.headingfont}>{productMain?.productTitle}</h1>
          <p className={style.content}>{productMain?.productDescription}</p>
        </div> */}
          <div className={style.frame}>
            {products?.map((item, index) => (
              <div className={`${style.imgsection}`} key={index}>
                <div ref={inViewRef} className='h-100'>
                  <div className='position-relative'>
                    <div className={style.imagegradient}></div>
                    <img
                      className={classnames(`${style.image}`, `image_${products}`, {
                        image_visible: visibleImagesMap[products]
                      })}
                      src={`${base_url}/${item?.productImage}`} alt='product' />

                    <div className={style.contentbox}>
                      <h1 className={style.imgheadingfont}>
                        {item?.productTitle}
                      </h1>
                      <h1 className={style.imgcontent}>
                        View Project
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className={`row ${style.imgsection}`}>
          {products?.slice(0, 4)?.map((item, index) => (
            <div ref={ref} className="col-6 px-1 pb-3 px-sm-3 h-50 d-flex justify-content-center align-items-center">
              <motion.div
                className={`${style.imageContainer} h-100`}
              >
                <div className={style.imagegradient}></div>
                <img src={`${base_url}/${item?.productImage}`} className={`${style.productimage} img-fluid`} alt='product' />
                <div className={style.contentbox}>
                  <h1 className={style.headingfontimg}>{item?.productTitle}</h1>
                  <h1 className={style.imgcontent}>
                    View Project
                  </h1>
                </div>
              </motion.div>
            </div>
          ))}
        </div> */}
        </div>
      </div>
    </>

  );
};

export default Products;