import React, { useEffect, useRef, useState } from 'react';
import style from './live.module.css';
import { motion } from 'framer-motion';
import livebg from '../../assets/livebg.png'

const Live = () => {
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
            <div ref={ref} className={style.livebanner}>
                <div className={`row ${style.livemain}`}>
                    <div className={`col-12 ${style.imgSection}`}>
                        <div className={style.liveimgContainer}>
                            <motion.img
                                src={livebg}
                                alt=""
                                className={style.liveimg}
                                initial={{ opacity: 0}}
                                animate={{ opacity: isVisible ? 1 : 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </div>
                        <motion.div
                            className={style.livecontent}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible ? 1 : 0 }}
                            transition={{ duration: 1, delay: isVisible ? 1 : 0 }} // Delay transition until isVisible becomes true
                        >
                            <motion.h1 className='me-5 fs-1 font-bold' initial={{ y: '10%' }} animate={{ y: isVisible ? '0%' : '10%' }} transition={{ duration: 0.5, delay: isVisible ? 1.5 : 0 }}>
                                Power to Live
                            </motion.h1>
                            <motion.h5 className='fs-3' initial={{ y: '10%' }} animate={{ y: isVisible ? '0%' : '10%' }} transition={{ duration: 0.8, delay: isVisible ? 1.8 : 0 }}>
                                "what you do today can improve all your tomorrows!"
                            </motion.h5>
                            <motion.p className='uppercase' initial={{ y: '10%' }} animate={{ y: isVisible ? '0%' : '10%' }} transition={{ duration: 1, delay: isVisible ? 2.1 : 0 }}>
                                -ralph marston-
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Live;
