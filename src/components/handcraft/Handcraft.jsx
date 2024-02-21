import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import style from './handcraft.module.css';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { EffectCube, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { base_url } from '../config/Base_url';

const Handcraft = () => {
  const autoSlideDuration = 3000; // 3 seconds
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
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper; // Use optional chaining
    const interval = setInterval(() => {
      if (swiper) {
        swiper.slideNext(); // Auto-slide to the next image
      }
    }, autoSlideDuration);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1); // Auto-slide to the next image
    }, autoSlideDuration);

    return () => clearInterval(interval);
  }, [page]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const [homeData, setHomeData] = useState();
  const [error, setError] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/home`);
      setHomeData(response.data.home);
    } catch (error) {
      setError(error);
      console.error('Error fetching home data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const title = homeData?.title;

  // Conditionally render the Swiper component based on the availability of homeData
  return (
    <div ref={ref} className={style.maindiv}>
      <div className="row w-100 h-100">
        <div className="col-lg-6 col-12 d-flex flex-column justify-content-center h-100">
          <div>
            <AnimatePresence>
              {isVisible && (
                <>
                  <motion.h1 className={style.headingfont}>
                    {title?.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.25,
                          delay: i * 0.1, // Adjust delay as needed
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.h1>
                  <motion.button
                    key="button"
                    initial={{ scale: 1 }} // Initial scale set to 1
                    animate={{ scale: [1, 1.2, 1] }} // Animate scale to 1.1 when in view
                    transition={{ duration: 0.5, delay: 1 }}
                    className={`btn mt-5 ${style.getstartedbtn}`}
                  >
                    Get Started
                  </motion.button>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="col-lg-6 col-12 position-relative h-100">
          {homeData && ( // Conditionally render Swiper component
            <Swiper
              ref={swiperRef}
              effect={'cube'}
              grabCursor={true}
              cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
              }}
              pagination={{
                clickable: true,
                type: 'bullets',
              }}
              modules={[EffectCube, Pagination]}
              className="mySwiper"
              autoplay={{
                delay: autoSlideDuration,
                disableOnInteraction: false,
              }}
              loop={true}
            >
              {homeData.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={`${base_url}/${image}`} alt={`Slide ${index}`} />
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

