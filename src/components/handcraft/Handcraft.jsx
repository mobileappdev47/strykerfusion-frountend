import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import style from './handcraft.module.css';
import craftimg1 from '../../assets/Case-study__image (2).png';
import craftimg2 from '../../assets/revolutionman.png';
import craftimg3 from '../../assets/product1.png';

const Handcraft = () => {
  const images = [craftimg1, craftimg1, craftimg3];

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = (index) => {
    return (images.length + (index % images.length)) % images.length;
  };

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className={style.maindiv}>
      <div className="row w-100">
        <div className="col-lg-6 col-12 d-flex flex-column justify-content-center">
          <div>
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={style.headingfont}
            >
              Handcrafted for
            </motion.h1>
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={style.headingfont}
            >
              Business and Startups
            </motion.h1>
            <motion.button
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className={`btn mt-5 ${style.getstartedbtn}`}
            >
              Get Started
            </motion.button>
          </div>
        </div>
        <div className="col-lg-6 col-12 position-relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={page}
              loading="lazy"
              decoding="async"
              src={images[imageIndex(page)]}
              custom={direction}
              className='w-100'
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
            />

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Handcraft;
