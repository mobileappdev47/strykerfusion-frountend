import React, { useEffect, useRef, useState } from 'react';
import style from './products.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { base_url } from '../config/Base_url';

const Products = ({ item, index, sectionAlign }) => {

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          sectionAlign(); 
        }
      },
      {
        threshold: 0,
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

  return (
    <>
      <div className={style.maindiv}>
        <div className={style.parentscrolldiv} ref={ref}>
          <AnimatePresence>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: isVisible ? 1 : 1, y: isVisible ? 10 : 10 }}
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
          </AnimatePresence>

          {/* <AnimatePresence>
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
          </AnimatePresence> */}

        </div>
      </div>
    </>
  );
};

export default Products;