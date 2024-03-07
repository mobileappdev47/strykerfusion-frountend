import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './register.module.css';
import axios from 'axios';
import { base_url } from '../../config/Base_url';

const Register = ({ sectionAlign }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const [possibleData, setPossibleData] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0, // Adjust threshold as needed
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
        let timeout;
        if (isVisible) {
            timeout = setTimeout(() => {
                sectionAlign();
            }, 500);
        }

        return () => clearTimeout(timeout);
    }, [isVisible, sectionAlign]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/possible`);
                setPossibleData(response?.data?.data || []);
                setIsDataFetched(true);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        if (!isDataFetched) {
            fetchData();
        }
    }, [isDataFetched]);
    const text = possibleData?.possibleDescription?.split(" ");

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
                            >{possibleData?.possibleTitle}</motion.h1>
                            <div className='mb-3'>
                                {text?.map((el, i) => (
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