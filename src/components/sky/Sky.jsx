import React, { useEffect, useRef, useState } from 'react';
import style from './sky.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import skybg from '../../assets/skybg.png';
import sky1 from '../../assets/sky1.png';

const Sky = () => {
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
            <div ref={ref} className={style.skybanner}>
                <div className={`row ${style.skymain}`}>
                    <div className={`col-12 ${style.imgSection}`}>
                        <div className={style.skyimgContainer}>
                            <motion.img
                                src={skybg}
                                alt=""
                                className={style.skyimg}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isVisible ? 1 : 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </div>
                        <div
                            className={style.skycontent}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible ? 1 : 0 }}
                            transition={{ duration: 1, delay: isVisible ? 1 : 0 }}
                        >
                            <motion.h1
                                className={`${style.flyText} me-5 fs-1 font-bold`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 1,
                                    delay: isVisible ? 1.5 : 0,
                                }}
                            >
                                {isVisible && (
                                    <AnimatePresence>
                                        {Array.from("Power to Fly").map((char, index) => (
                                            <motion.span
                                                key={index}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.25, delay: index * 0.1 }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </AnimatePresence>
                                )}
                            </motion.h1>
                            <motion.h5
                                className={`${style.flyText} fs-4`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 1,
                                    delay: isVisible ? 2.5 : 0, // Adjust delay for h5 to wait for h1 animation to complete
                                }}
                            >
                                {isVisible && (
                                    <AnimatePresence>
                                        {Array.from("F.L.Y - First love Yourself other will come Next!").map((char, index) => (
                                            <motion.span
                                                key={index}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.25, delay: index * 0.1 }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </AnimatePresence>
                                )}
                            </motion.h5>
                            <motion.p
                                className={`${style.flyText} uppercase`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 1,
                                    delay: isVisible ? 4.5 : 0, // Adjust delay for p to wait for h5 animation to complete
                                }}
                            >
                                {isVisible && (
                                    <AnimatePresence>
                                        {Array.from("-Anonymous-").map((char, index) => (
                                            <motion.span
                                                key={index}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.25, delay: index * 0.1 }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </AnimatePresence>
                                )}
                            </motion.p>
                        </div>
                        <AnimatePresence>
                            {isVisible && (
                                <motion.img
                                    key="sky1"
                                    src={sky1}
                                    alt=""
                                    className={style.sky1}
                                    initial={{ opacity: 0, translateY: -50 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{ duration: 1, delay: 5 }} // Adjust delay for sky1 to wait for p animation to complete
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sky;
