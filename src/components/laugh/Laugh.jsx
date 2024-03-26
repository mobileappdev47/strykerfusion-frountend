import React, { useEffect, useRef, useState } from 'react';
import style from './laugh.module.css';
import { motion } from 'framer-motion';
import laughbg from '../../assets/laughbg.png'
import laugh1 from '../../assets/laugh1.png'
import laugh2 from '../../assets/laugh2.png'
import laugh3 from '../../assets/laugh3.png'
import laugh4 from '../../assets/laugh4.png'
import laugh5 from '../../assets/laugh5.png'
import laugh6 from '../../assets/laugh6.png'
import laugh7 from '../../assets/laugh7.png'
import laugh8 from '../../assets/laugh8.png'
import laugh9 from '../../assets/laugh9.png'



const Laugh = () => {
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
            <div ref={ref} className={style.laughbanner}>
                <div className={`row ${style.laughmain}`}>
                    <div className={`col-12 ${style.imgSection}`}>
                        <div className={style.laughimgContainer}>
                            <motion.img
                                src={laughbg}
                                alt=""
                                className={style.laughimg}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isVisible ? 1 : 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </div>
                        <motion.div
                            className={style.laughcontent}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible ? 1 : 0 }}
                            transition={{ duration: 1, delay: isVisible ? 1 : 0 }} // Delay transition until isVisible becomes true
                        >
                            <motion.h1 className='me-5 fs-1' initial={{ x: '10%' }} animate={{ x: isVisible ? '0%' : '10%' }} transition={{ duration: 0.5, delay: isVisible ? 1.5 : 0 }}>
                                Power to Laugh
                            </motion.h1>
                            <motion.h5 className='fs-3' initial={{ x: '10%' }} animate={{ x: isVisible ? '0%' : '10%' }} transition={{ duration: 0.8, delay: isVisible ? 1.8 : 0 }}>
                                "Laughter is an instant Vacation!"
                            </motion.h5>
                            <motion.p className='uppercase' initial={{ x: '10%' }} animate={{ x: isVisible ? '0%' : '10%' }} transition={{ duration: 1, delay: isVisible ? 2.1 : 0 }}>
                                -Milton Berle-
                            </motion.p>
                        </motion.div>
                        <motion.img src={laugh1} alt="" className={style.laugh1} initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1, delay: 1 }} />
                        <motion.img src={laugh2} alt="" className={style.laugh2} initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1, delay: 1.2 }} />
                        <motion.img src={laugh3} alt="" className={style.laugh3} initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1, delay: 1.4 }} />
                        <motion.img src={laugh4} alt="" className={style.laugh4} initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1, delay: 1.6 }} />
                        <motion.img src={laugh5} alt="" className={style.laugh5} initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1, delay: 1.8 }} />
                        <motion.img src={laugh6} alt="" className={style.laugh6} initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1, delay: 2 }} />
                        <motion.img src={laugh7} alt="" className={style.laugh7} initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1, delay: 2.2 }} />
                        <motion.img src={laugh8} alt="" className={style.laugh8} initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1, delay: 2.2 }} />
                        <motion.img src={laugh9} alt="" className={style.laugh9} initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ duration: 1, delay: 2.2 }} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Laugh;
