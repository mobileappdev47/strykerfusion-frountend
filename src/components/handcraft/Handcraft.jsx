import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import style from './handcraft.module.css';
import craftimg1 from '../../assets/Case-study__image (2).png';
import craftimg2 from '../../assets/revolutionman.png';
import craftimg3 from '../../assets/product1.png';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { EffectCube, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Handcraft = () => {
  const images = [craftimg1, craftimg1, craftimg3];
  const autoSlideDuration = 3000; // 3 seconds
  const swiperRef = useRef(null);
  const swipeConfidenceThreshold = 10000;
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
    const swiper = swiperRef.current.swiper;
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

  const imageIndex = (index) => {
    return (images.length + (index % images.length)) % images.length;
  };

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div ref={ref} className={style.maindiv}>
      <div className="row w-100 h-100">
        <div className="col-lg-6 col-12 d-flex flex-column justify-content-center">
          <div>
            <AnimatePresence>
              {isVisible && (
                <>
                  <motion.h1
                    key="heading1"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={style.headingfont}
                  >
                    Handcrafted for
                  </motion.h1>
                  <motion.h1
                    key="heading2"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className={style.headingfont}
                  >
                    Business and Startups
                  </motion.h1>
                  <motion.button
                    key="button"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
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
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`Slide ${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Handcraft;
