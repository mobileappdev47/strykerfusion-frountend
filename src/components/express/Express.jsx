import React, { useEffect, useRef, useState } from 'react';
import style from './express.module.css';
import expressbg from '../../assets/expressbg.png';
import express1 from '../../assets/express1.png';
import express2 from '../../assets/express2.png';
import express3 from '../../assets/express3.png';
import express4 from '../../assets/express4.png';
import express5 from '../../assets/express5.png';
import express6 from '../../assets/express6.png';
import express7 from '../../assets/express7.png';
import { motion } from 'framer-motion';

const Express = () => {
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
            <div ref={ref} className={style.expressmain}>
                <div className={style.express}>
                    <div className={style.imgbg}>
                        <motion.img
                            src={expressbg}
                            alt=""
                            className={style.expressbg}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible ? 1 : 0 }}
                            transition={{ duration: 1 }}
                        />
                    </div>
                    <div className={style.content}>
                        {/* Image Animations */}
                        <motion.img src={express1} alt="" className={style.express1} initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1, delay: 1 }} />
                        <motion.img src={express2} alt="" className={style.express2} initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1, delay: 1.2 }} />
                        <motion.img src={express3} alt="" className={style.express3} initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1, delay: 1.4 }} />
                        <motion.img src={express4} alt="" className={style.express4} initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1, delay: 1.6 }} />
                        <motion.img src={express5} alt="" className={style.express5} initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1, delay: 1.8 }} />
                        <motion.img src={express6} alt="" className={style.express6} initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1, delay: 2 }} />
                        <motion.img src={express7} alt="" className={style.express7} initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1, delay: 2.2 }} />
                        {/* Text Animations */}
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible ? 1 : 0 }}
                            transition={{ duration: 1, delay: 2.4 }}
                        >
                            Power to Express
                        </motion.h1>
                        <motion.h5
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible ? 1 : 0 }}
                            transition={{ duration: 1, delay: 2.6 }}
                        >
                            Unlock your Truth, Be All of You!
                        </motion.h5>
                        <motion.p
                            initial={{ scale: 0 }}
                            animate={{ scale: isVisible ? 1 : 0 }}
                            transition={{ duration: 1, delay: 2.8 }}
                        >
                            -David Stryker-
                        </motion.p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Express;
