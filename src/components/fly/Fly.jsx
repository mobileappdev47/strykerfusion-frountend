import React, { useEffect, useRef, useState } from 'react';
import style from './fly.module.css';
import { motion } from 'framer-motion';
import flybg from '../../assets/flybg.png';

const Fly = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
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
            <div ref={ref} className={style.flybanner}>
                <div className={`row ${style.flymain}`}>
                    <div className={`col-12 ${style.imgSection}`}>
                        <div className={style.flyimgContainer}>
                            <motion.img
                                src={flybg}
                                alt=""
                                className={style.flyimg}
                                initial={{ opacity: 0}}
                                animate={{ opacity: isVisible ? 1 : 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </div>
                        <motion.div
                            className={style.flycontent}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible ? 1 : 0 }}
                            transition={{ duration: 1, delay: isVisible ? 1 : 0 }} // Delay transition until isVisible becomes true
                        >
                            <motion.h1 className='me-5 fs-1' initial={{ opacity: 0 }} animate={{ opacity: isVisible ?  1: 0 }} transition={{ duration: 0.5, delay: isVisible ? 1.5 : 0 }}>
                                Power to Fly
                            </motion.h1>
                            <motion.h5 className='fs-3' initial={{ opacity: 0 }} animate={{ opacity: isVisible ?  1: 0 }} transition={{ duration: 0.8, delay: isVisible ? 1.8 : 0 }}>
                                "your wings already exist all you have to do is fly!"
                            </motion.h5>
                            <motion.p className='uppercase' initial={{ opacity: 0 }} animate={{ opacity: isVisible ?  1: 0 }} transition={{ duration: 1, delay: isVisible ? 2.1 : 0 }}>
                                -ralph waldo emerson-
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Fly;
