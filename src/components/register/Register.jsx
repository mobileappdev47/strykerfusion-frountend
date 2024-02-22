import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import wave from '../../assets/Clip path group.png';
import styles from './register.module.css';

const Register = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.5, // Adjust threshold as needed
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

    const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident id, doloremque fugiat minima exercitationem nihil.".split(" ");

    return (
        <div ref={ref} className={styles.container} >
            <div className={styles.content}>
                <AnimatePresence>
                    {isVisible && (
                        <>
                            <motion.h1
                                className={styles.headingfont}
                                initial={{ opacity: 0, y: 100 }} // Start from above (-100)
                                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }} // Move up when visible (-20)
                                transition={{ delay: 0 * 0.5 }}
                            >Unlock a World of New Possibilities</motion.h1>
                            <div className='mb-3'>
                                {text.map((el, i) => (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isVisible ? 1 : 0 }}
                                        transition={{
                                            duration: 0.25,
                                            delay: i / 10,
                                        }}
                                        key={i}
                                        className={styles.contentfont}
                                    >
                                        {el}{" "}
                                    </motion.span>
                                ))}</div>
                            <div className={`d-flex gap-5`}>
                                <motion.button
                                    key="registerButton"
                                    initial={{ scale: 1 }}
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.5, delay: 1.5 }}
                                    className={`${styles.registerbtn}`}
                                >
                                    Register Now
                                </motion.button>
                                <motion.button
                                    key="contactButton"
                                    initial={{ scale: 1 }}
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.5, delay: 2 }}
                                    className={`${styles.contactbtn}`}
                                >
                                    Contact Us
                                </motion.button>

                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Register;