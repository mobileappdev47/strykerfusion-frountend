import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import style from './handcraft.module.css';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { base_url } from '../../config/Base_url';

const Handcraft = () => {
  const autoSlideDuration = 5000;
  const swiperRef = useRef(null);
  const [[page, direction], setPage] = useState([0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

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
        // eslint-disable-next-line
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, autoSlideDuration);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [page]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const [homeData, setHomeData] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/home`);
      setHomeData(response.data.home);
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const title = homeData?.title;

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      const interval = setInterval(() => {
        if (swiper) {
          swiper.slideNext();
        }
      }, autoSlideDuration);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line
  }, [swiperRef.current]);

  return (
    <div ref={ref} className={style.maindiv}>
      <div className="row w-100 h-100">
        <div className={`col-xl-5 col-lg-6 col-12 ${style.contentsection}`}>
          <div>
            <AnimatePresence>
              {isVisible && (
                <>
                  <motion.h1 className={style.headingfont}>
                    {title?.split(' ').map((word, index, array) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.25,
                          delay: index * 0.1,
                        }}
                      >
                        {index !== array.length - 1 ? word + ' ' : ''}
                        {index === array.length - 1 && (
                          <span className={style.backgroundImageSpan}>{word}</span>
                        )}
                      </motion.span>
                    ))}
                  </motion.h1>

                  <motion.button
                    key="button"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, delay: 4.5 }}
                    className={`btn mt-5 ${style.getstartedbtn}`}
                  >
                    Get Started
                  </motion.button>
                </>
              )}
            </AnimatePresence>

          </div>
        </div>
        <div className='col-xl-1 d-xl-flex d-none'></div>
        <div className={`col-xl-6 col-lg-6  col-12 ${style.imagesection}`}>
          {homeData && (
            <Swiper
              ref={swiperRef}
              className="mySwiper"
              loop={true}
            >
              {homeData?.images?.map((image, index) => (
                <SwiperSlide key={index} className='bg-transparent d-flex justify-content-center align-items-center'>
                  <motion.img
                    src={`${base_url}/${image}`}
                    alt={`Slide ${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    whileHover={{ scale: 0.8 }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};

export default Handcraft;