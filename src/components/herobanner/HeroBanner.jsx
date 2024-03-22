import React, { useEffect, useRef, useState } from 'react'
import style from './herobanner.module.css'
import heroimg from '../../assets/herobanner.png'
import herotext from '../../assets/text1.png'
import quote from '../../assets/quote.png'
import author from '../../assets/author.png'
import { motion } from 'framer-motion'


const HeroBanner = () => {

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
                // eslint-disable-next-line
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <>
            <div ref={ref} className={style.herobanner}>
                <div className={`row ${style.heromain}`}>
                    <div className={`col-12 ${style.imgSection}`}>
                        <div className="">
                            <img src={heroimg} alt="" className={style.heroimg} />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                            transition={{ duration: 1, delay: 0.1 }}
                            className={style.herocontent}>
                            <motion.img
                                src={herotext}
                                alt=""
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className={`${style.textimg}`}
                            />
                            <motion.img
                                src={quote}
                                alt=""
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                className={`${style.quoteimg}`}
                            />
                            <motion.img
                                src={author}
                                alt=""
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                                className={style.authorimg}
                            />
                            {/* <h1>Power to Connect</h1>
                            <h5>"In order for connection to happen, we have to allow ourselves to be seen, really seen."</h5>
                            <p>-Brene Brown-</p> */}
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroBanner

