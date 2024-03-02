import React, { useEffect, useRef, useState } from 'react'
import style from './revolution.module.css'
import revolutionman from '../../assets/revolutionman.png'
import { AnimatePresence, motion } from 'framer-motion'
import axios from 'axios'
import { base_url } from '../config/Base_url'

const Revolution = ({ sectionAlignFalse }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [revolutionData, setRevolutionData] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                if (entry.isIntersecting) {
                    sectionAlignFalse(); // Call the callback function when Revolution is in view
                }
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
                // eslint-disable-next-line
                observer.unobserve(ref.current);
            }
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/revolution`);
                setRevolutionData(response?.data?.data || []);
                setIsDataFetched(true);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        if (!isDataFetched) {
            fetchData();
        }
    }, [isDataFetched]);

    return (
        <div className={style.maindiv} ref={ref}>
            <div className={`card mb-3 w-100 ${style.card}`}>
                <div className="row w-100">
                    <div className="col-md-6 d-md-inline d-none col-12 text-center position-relative" >
                        <motion.img
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
                            transition={{ duration: 0.5 }}
                            src={revolutionman}
                            className=""
                            alt="..." />
                        <motion.div
                            className={style.contentbox1}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
                            transition={{ delay: 0 * 0.5 }}
                            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.95 }}
                        >

                            <h1 className={`${style.imgheadingfont}`}>Develop your dreams</h1>
                            <h1 className={`${style.imgcontent}`}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.9722 0.624537C12.7426 0.496789 12.4901 0.41555 12.2291 0.385465C11.9681 0.355379 11.7037 0.377037 11.4511 0.449201C11.1985 0.521365 10.9626 0.642619 10.7568 0.806029C10.5511 0.969439 10.3796 1.1718 10.2522 1.40154L6.53916 8.08354L4.41416 5.95854C4.22967 5.76752 4.00898 5.61515 3.76497 5.51033C3.52096 5.40552 3.25852 5.35034 2.99296 5.34804C2.72741 5.34573 2.46405 5.39633 2.21825 5.49689C1.97246 5.59746 1.74916 5.74596 1.56137 5.93375C1.37359 6.12153 1.22508 6.34484 1.12452 6.59063C1.02396 6.83642 0.973354 7.09978 0.975661 7.36534C0.977969 7.6309 1.03314 7.89334 1.13796 8.13735C1.24278 8.38135 1.39514 8.60204 1.58616 8.78654L5.58616 12.7865C5.96416 13.1655 6.47416 13.3735 7.00016 13.3735L7.27716 13.3535C7.58371 13.3107 7.87612 13.1972 8.13138 13.0221C8.38664 12.847 8.59777 12.6151 8.74816 12.3445L13.7482 3.34454C13.8758 3.11499 13.957 2.86254 13.9871 2.60162C14.0172 2.34069 13.9956 2.07639 13.9235 1.82381C13.8515 1.57124 13.7304 1.33533 13.5671 1.12955C13.4039 0.923779 13.2017 0.752175 12.9722 0.624537Z" fill="#265EE1" />
                                </svg>
                                &nbsp;&nbsp;&nbsp;Design</h1>
                            <h1 className={`${style.imgcontent}`}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.9722 0.624537C12.7426 0.496789 12.4901 0.41555 12.2291 0.385465C11.9681 0.355379 11.7037 0.377037 11.4511 0.449201C11.1985 0.521365 10.9626 0.642619 10.7568 0.806029C10.5511 0.969439 10.3796 1.1718 10.2522 1.40154L6.53916 8.08354L4.41416 5.95854C4.22967 5.76752 4.00898 5.61515 3.76497 5.51033C3.52096 5.40552 3.25852 5.35034 2.99296 5.34804C2.72741 5.34573 2.46405 5.39633 2.21825 5.49689C1.97246 5.59746 1.74916 5.74596 1.56137 5.93375C1.37359 6.12153 1.22508 6.34484 1.12452 6.59063C1.02396 6.83642 0.973354 7.09978 0.975661 7.36534C0.977969 7.6309 1.03314 7.89334 1.13796 8.13735C1.24278 8.38135 1.39514 8.60204 1.58616 8.78654L5.58616 12.7865C5.96416 13.1655 6.47416 13.3735 7.00016 13.3735L7.27716 13.3535C7.58371 13.3107 7.87612 13.1972 8.13138 13.0221C8.38664 12.847 8.59777 12.6151 8.74816 12.3445L13.7482 3.34454C13.8758 3.11499 13.957 2.86254 13.9871 2.60162C14.0172 2.34069 13.9956 2.07639 13.9235 1.82381C13.8515 1.57124 13.7304 1.33533 13.5671 1.12955C13.4039 0.923779 13.2017 0.752175 12.9722 0.624537Z" fill="#265EE1" />
                                </svg>
                                &nbsp;&nbsp;&nbsp;Prototype</h1>
                        </motion.div>
                        <motion.div
                            className={style.contentbox2}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                            transition={{ delay: 1 * 0.5 }}
                            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <h1 className={`${style.imgheadingfont}`}>Develop your dreams</h1>
                            <h1 className={`${style.imgcontent}`}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.9722 0.624537C12.7426 0.496789 12.4901 0.41555 12.2291 0.385465C11.9681 0.355379 11.7037 0.377037 11.4511 0.449201C11.1985 0.521365 10.9626 0.642619 10.7568 0.806029C10.5511 0.969439 10.3796 1.1718 10.2522 1.40154L6.53916 8.08354L4.41416 5.95854C4.22967 5.76752 4.00898 5.61515 3.76497 5.51033C3.52096 5.40552 3.25852 5.35034 2.99296 5.34804C2.72741 5.34573 2.46405 5.39633 2.21825 5.49689C1.97246 5.59746 1.74916 5.74596 1.56137 5.93375C1.37359 6.12153 1.22508 6.34484 1.12452 6.59063C1.02396 6.83642 0.973354 7.09978 0.975661 7.36534C0.977969 7.6309 1.03314 7.89334 1.13796 8.13735C1.24278 8.38135 1.39514 8.60204 1.58616 8.78654L5.58616 12.7865C5.96416 13.1655 6.47416 13.3735 7.00016 13.3735L7.27716 13.3535C7.58371 13.3107 7.87612 13.1972 8.13138 13.0221C8.38664 12.847 8.59777 12.6151 8.74816 12.3445L13.7482 3.34454C13.8758 3.11499 13.957 2.86254 13.9871 2.60162C14.0172 2.34069 13.9956 2.07639 13.9235 1.82381C13.8515 1.57124 13.7304 1.33533 13.5671 1.12955C13.4039 0.923779 13.2017 0.752175 12.9722 0.624537Z" fill="#265EE1" />
                                </svg>
                                &nbsp;&nbsp;&nbsp;Design</h1>
                            <h1 className={`${style.imgcontent}`}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.9722 0.624537C12.7426 0.496789 12.4901 0.41555 12.2291 0.385465C11.9681 0.355379 11.7037 0.377037 11.4511 0.449201C11.1985 0.521365 10.9626 0.642619 10.7568 0.806029C10.5511 0.969439 10.3796 1.1718 10.2522 1.40154L6.53916 8.08354L4.41416 5.95854C4.22967 5.76752 4.00898 5.61515 3.76497 5.51033C3.52096 5.40552 3.25852 5.35034 2.99296 5.34804C2.72741 5.34573 2.46405 5.39633 2.21825 5.49689C1.97246 5.59746 1.74916 5.74596 1.56137 5.93375C1.37359 6.12153 1.22508 6.34484 1.12452 6.59063C1.02396 6.83642 0.973354 7.09978 0.975661 7.36534C0.977969 7.6309 1.03314 7.89334 1.13796 8.13735C1.24278 8.38135 1.39514 8.60204 1.58616 8.78654L5.58616 12.7865C5.96416 13.1655 6.47416 13.3735 7.00016 13.3735L7.27716 13.3535C7.58371 13.3107 7.87612 13.1972 8.13138 13.0221C8.38664 12.847 8.59777 12.6151 8.74816 12.3445L13.7482 3.34454C13.8758 3.11499 13.957 2.86254 13.9871 2.60162C14.0172 2.34069 13.9956 2.07639 13.9235 1.82381C13.8515 1.57124 13.7304 1.33533 13.5671 1.12955C13.4039 0.923779 13.2017 0.752175 12.9722 0.624537Z" fill="#265EE1" />
                                </svg>
                                &nbsp;&nbsp;&nbsp;Prototype</h1>
                        </motion.div>
                        <motion.div
                            className={style.contentbox3}
                            initial={{ opacity: 0, y: 100 }} // Start from above (-100)
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }} // Move up when visible (-20)
                            transition={{ delay: 2 * 0.5 }}
                            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <h1 className={`${style.imgheadingfont}`}>Develop your dreams</h1>
                            <h1 className={`${style.imgcontent}`}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.9722 0.624537C12.7426 0.496789 12.4901 0.41555 12.2291 0.385465C11.9681 0.355379 11.7037 0.377037 11.4511 0.449201C11.1985 0.521365 10.9626 0.642619 10.7568 0.806029C10.5511 0.969439 10.3796 1.1718 10.2522 1.40154L6.53916 8.08354L4.41416 5.95854C4.22967 5.76752 4.00898 5.61515 3.76497 5.51033C3.52096 5.40552 3.25852 5.35034 2.99296 5.34804C2.72741 5.34573 2.46405 5.39633 2.21825 5.49689C1.97246 5.59746 1.74916 5.74596 1.56137 5.93375C1.37359 6.12153 1.22508 6.34484 1.12452 6.59063C1.02396 6.83642 0.973354 7.09978 0.975661 7.36534C0.977969 7.6309 1.03314 7.89334 1.13796 8.13735C1.24278 8.38135 1.39514 8.60204 1.58616 8.78654L5.58616 12.7865C5.96416 13.1655 6.47416 13.3735 7.00016 13.3735L7.27716 13.3535C7.58371 13.3107 7.87612 13.1972 8.13138 13.0221C8.38664 12.847 8.59777 12.6151 8.74816 12.3445L13.7482 3.34454C13.8758 3.11499 13.957 2.86254 13.9871 2.60162C14.0172 2.34069 13.9956 2.07639 13.9235 1.82381C13.8515 1.57124 13.7304 1.33533 13.5671 1.12955C13.4039 0.923779 13.2017 0.752175 12.9722 0.624537Z" fill="#265EE1" />
                                </svg>
                                &nbsp;&nbsp;&nbsp;Design</h1>
                            <h1 className={`${style.imgcontent}`}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.9722 0.624537C12.7426 0.496789 12.4901 0.41555 12.2291 0.385465C11.9681 0.355379 11.7037 0.377037 11.4511 0.449201C11.1985 0.521365 10.9626 0.642619 10.7568 0.806029C10.5511 0.969439 10.3796 1.1718 10.2522 1.40154L6.53916 8.08354L4.41416 5.95854C4.22967 5.76752 4.00898 5.61515 3.76497 5.51033C3.52096 5.40552 3.25852 5.35034 2.99296 5.34804C2.72741 5.34573 2.46405 5.39633 2.21825 5.49689C1.97246 5.59746 1.74916 5.74596 1.56137 5.93375C1.37359 6.12153 1.22508 6.34484 1.12452 6.59063C1.02396 6.83642 0.973354 7.09978 0.975661 7.36534C0.977969 7.6309 1.03314 7.89334 1.13796 8.13735C1.24278 8.38135 1.39514 8.60204 1.58616 8.78654L5.58616 12.7865C5.96416 13.1655 6.47416 13.3735 7.00016 13.3735L7.27716 13.3535C7.58371 13.3107 7.87612 13.1972 8.13138 13.0221C8.38664 12.847 8.59777 12.6151 8.74816 12.3445L13.7482 3.34454C13.8758 3.11499 13.957 2.86254 13.9871 2.60162C14.0172 2.34069 13.9956 2.07639 13.9235 1.82381C13.8515 1.57124 13.7304 1.33533 13.5671 1.12955C13.4039 0.923779 13.2017 0.752175 12.9722 0.624537Z" fill="#265EE1" />
                                </svg>
                                &nbsp;&nbsp;&nbsp;Prototype</h1>
                        </motion.div>
                    </div>
                    <div className={`col-md-6 col-12 d-flex ${style.contentsec}`} >
                        <div className="card-body d-flex flex-column justify-content-center p-0 p-sm-3">
                            <AnimatePresence>
                                {isVisible && (
                                    <>
                                        <motion.h1
                                            className={`card-title ${style.headingfont}`}
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
                                            transition={{ delay: 0 * 0.5 }}
                                        >
                                            {revolutionData?.revolutionTitle}
                                        </motion.h1>
                                        <motion.p
                                            className={`card-text mt-4 ${style.content}`}
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
                                            transition={{ delay: 1 * 0.3 }}
                                        >{revolutionData?.revolutionDescription}</motion.p>
                                        {revolutionData?.revolutionContent?.split('/').map((text, index) => (
                                            <motion.div
                                                key={index}
                                                className={`card-text d-flex mb-3 align-items-center ${style.subcontent}`}
                                                initial={{ opacity: 0, y: 100 }}
                                                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
                                                transition={{ delay: ((index + 2) * 0.3) + (index * 0.1) }}
                                            >
                                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.3751 13.4986C20.6251 17.2486 17.7978 20.779 13.8291 21.5684C9.86043 22.3579 5.83311 20.5118 3.84055 16.99C1.848 13.4682 2.33991 9.06537 5.06059 6.07014C7.78128 3.0749 12.3751 2.24858 16.1251 3.74858" stroke="#265EE1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M8.625 11.9985L12.375 15.7485L21.375 5.99854" stroke="#265EE1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                &nbsp;&nbsp;&nbsp;<p className='mb-0'>{text}</p>
                                            </motion.div>
                                        ))}
                                        <motion.button
                                            className={`btn mt-5 ${style.learnmorebtn}`}
                                            key="button"
                                            initial={{ scale: 1 }}
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 0.5, delay: 2 }}
                                        >Learn More</motion.button>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Revolution
