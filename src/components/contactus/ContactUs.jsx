import React, { useEffect, useRef, useState } from 'react'
import style from './contactus.module.css'
import { Link } from 'react-router-dom';
import ContactUsForm from '../contactusform/ContactUsForm';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { base_url } from '../config/Base_url';

const ContactUs = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const [contactData, setContactData] = useState();
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.5,
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
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/contact`);
                setContactData(response?.data?.data || []);
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
        <div ref={ref} className={`${style.maindiv}`}>
            <div className="row h-100 d-flex align-items-center">
                <div className="col-12 col-lg-5">
                    <AnimatePresence>
                        {isVisible && (<>
                            <motion.h1
                                initial={{ opacity: 0, x: -100 }} // Start from the left (-100)
                                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }} // Move in from left when visible (-20)
                                transition={{ delay: 0 * 0.4 }} className={style.headingfont}>
                                {contactData?.mainTitle}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, x: -100 }} // Start from the left (-100)
                                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }} // Move in from left when visible (-20)
                                transition={{ delay: 1 * 0.4 }}
                                className={`${style.content} mt-3`}>
                                {contactData?.mainDescription}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, x: -100 }} // Start from the left (-100)
                                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }} // Move in from left when visible (-20)
                                transition={{ delay: 2 * 0.4 }}
                            >
                                <a href="mailto:strykerfusion@gmail.com" className='d-flex p-lg-3 p-1'>
                                    <svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M26.2119 0.0825195H3.78744C2.24575 0.0825195 0.99839 1.3439 0.99839 2.88558L0.984375 19.7039C0.984375 21.2456 2.24575 22.507 3.78744 22.507H26.2119C27.7536 22.507 29.015 21.2456 29.015 19.7039V2.88558C29.015 1.3439 27.7536 0.0825195 26.2119 0.0825195ZM25.6513 6.03902L15.7425 12.2338C15.294 12.5141 14.7054 12.5141 14.2569 12.2338L4.34805 6.03902C4.20751 5.96013 4.08445 5.85355 3.9863 5.72572C3.88815 5.59789 3.81695 5.45147 3.77703 5.29533C3.7371 5.13919 3.72928 4.97657 3.75402 4.81732C3.77876 4.65806 3.83556 4.50549 3.92097 4.36882C4.00639 4.23215 4.11865 4.11424 4.25096 4.02221C4.38326 3.93019 4.53287 3.86597 4.69071 3.83343C4.84856 3.8009 5.01137 3.80073 5.16928 3.83294C5.32719 3.86515 5.47693 3.92906 5.60942 4.02082L14.9997 9.89323L24.3899 4.02082C24.5224 3.92906 24.6722 3.86515 24.8301 3.83294C24.988 3.80073 25.1508 3.8009 25.3086 3.83343C25.4665 3.86597 25.6161 3.93019 25.7484 4.02221C25.8807 4.11424 25.993 4.23215 26.0784 4.36882C26.1638 4.50549 26.2206 4.65806 26.2453 4.81732C26.2701 4.97657 26.2622 5.13919 26.2223 5.29533C26.1824 5.45147 26.1112 5.59789 26.0131 5.72572C25.9149 5.85355 25.7918 5.96013 25.6513 6.03902Z" fill="#4C5877" />
                                    </svg>
                                    <p className={`${style.content} ms-3`}> {contactData?.email}</p>
                                </a>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -100 }} // Start from the left (-100)
                                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }} // Move in from left when visible (-20)
                                transition={{ delay: 3 * 0.4 }}
                            >
                                <a href="tel:+61123456789" className='d-flex  p-lg-3 p-1'>
                                    <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M29.9825 22.8354C29.7151 24.868 28.7169 26.7337 27.1743 28.0841C25.6318 29.4345 23.6505 30.1772 21.6004 30.1736C9.69018 30.1736 1.35732e-05 20.4834 1.35732e-05 8.57318C-0.00366146 6.52308 0.739057 4.54175 2.08945 2.99923C3.43984 1.45671 5.30556 0.458501 7.33814 0.191037C7.85213 0.128277 8.37263 0.23343 8.82195 0.490799C9.27126 0.748169 9.62529 1.14395 9.83118 1.61906L12.9992 8.69168V8.70968C13.1569 9.07337 13.222 9.47044 13.1887 9.86542C13.1555 10.2604 13.0249 10.641 12.8087 10.9732C12.7817 11.0137 12.7532 11.0512 12.7232 11.0887L9.60018 14.7908C10.7237 17.0738 13.1117 19.4409 15.4248 20.5674L19.0758 17.4608C19.1117 17.4307 19.1493 17.4026 19.1883 17.3768C19.5203 17.1554 19.9022 17.0203 20.2995 16.9836C20.6968 16.947 21.097 17.0099 21.4639 17.1668L21.4834 17.1758L28.55 20.3424C29.026 20.5475 29.4227 20.9013 29.6809 21.3506C29.9391 21.8 30.0449 22.3209 29.9825 22.8354Z" fill="#4C5877" />
                                    </svg>
                                    <p className={`${style.content} ms-3`}> {contactData?.phone}</p>
                                </a>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -100 }} // Start from the left (-100)
                                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }} // Move in from left when visible (-20)
                                transition={{ delay: 4 * 0.4 }}
                            >
                                <a className='d-flex p-lg-3 p-1' href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactData?.address)}`}>
                                    <svg width="30" height="39" viewBox="0 0 30 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 0.0825195C11.0232 0.0872111 7.21062 1.66907 4.39859 4.4811C1.58656 7.29312 0.0047075 11.1057 1.59585e-05 15.0825C-0.00474707 18.3324 1.05681 21.494 3.02183 24.0825C3.02183 24.0825 3.43092 24.6211 3.49774 24.6989L15 38.2643L26.5077 24.692C26.5677 24.6198 26.9782 24.0825 26.9782 24.0825L26.9795 24.0784C28.9436 21.4911 30.0046 18.3309 30 15.0825C29.9953 11.1057 28.4134 7.29312 25.6014 4.4811C22.7894 1.66907 18.9768 0.0872111 15 0.0825195ZM15 20.537C13.9212 20.537 12.8666 20.2171 11.9696 19.6178C11.0726 19.0184 10.3735 18.1666 9.96066 17.1699C9.54782 16.1732 9.4398 15.0765 9.65027 14.0184C9.86073 12.9603 10.3802 11.9884 11.1431 11.2256C11.9059 10.4627 12.8778 9.94324 13.9359 9.73277C14.9939 9.52231 16.0907 9.63032 17.0874 10.0432C18.084 10.456 18.9359 11.1551 19.5353 12.0521C20.1346 12.9491 20.4545 14.0037 20.4545 15.0825C20.4527 16.5286 19.8775 17.9149 18.8549 18.9375C17.8324 19.96 16.4461 20.5352 15 20.537Z" fill="#4C5877" />
                                    </svg>
                                    <p className={`${style.content} ms-3`}> {contactData?.address}</p>
                                </a>
                            </motion.div>
                        </>)}
                    </AnimatePresence>
                </div>
                <div className="col-12 col-lg-7 d-lg-flex d-none h-100  justify-content-end align-items-center">
                    <ContactUsForm />
                </div>
            </div>
        </div>
    )
}

export default ContactUs
