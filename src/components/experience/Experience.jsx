import React, { useEffect, useRef, useState } from 'react';
import style from './experience.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { base_url } from '../../config/Base_url';

const Experience = () => {
    const [experience, setExperience] = useState([]);
    const [experienceMain, setExperienceMain] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

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
                const response = await axios.get(`${base_url}/experience`);
                setExperience(response?.data?.data || []);
                setIsDataFetched(true);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        const fetchDataExperienceMain = async () => {
            try {
                const response = await axios.get(`${base_url}/experiencemain`);
                setExperienceMain(response?.data?.data || []);
                setIsDataFetched(true);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        if (!isDataFetched) {
            fetchData();
            fetchDataExperienceMain()
        }
    }, [isDataFetched]);

    return (
        <div ref={ref} className={`${style.maindiv} container-fluid`}>
            <div className="row h-100">
                <div className="col-lg-5 h-100 d-none d-lg-flex position-relative  mb-sm-0 mb-5 d-flex flex-column justify-content-center">
                    <AnimatePresence>
                        {isVisible && (
                            <>
                                <div className=' overflow-hidden'>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 100 }} 
                                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }} 
                                        transition={{ delay: 0 * 0.5 }}
                                        className={style.headingfont}>
                                        {experienceMain?.experienceTitle}
                                    </motion.h1>

                                    <motion.p initial={{ opacity: 0, y: 100 }} 
                                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }} 
                                        transition={{ delay: 1 * 0.5 }}
                                        className={style.content}>
                                        {experienceMain?.experienceDescription}
                                    </motion.p>
                                </div>

                                <motion.button
                                    key="button"
                                    initial={{ scale: 1 }}
                                    animate={{ scale: [1, 1.2, 1] }} 
                                    transition={{ duration: 0.5, delay: 2.5 }}
                                    className={`btn mt-5 ${style.learnmorebtn}`}
                                >
                                    Learn More
                                </motion.button>
                            </>
                        )}
                    </AnimatePresence>
                </div>
                <div className="col-lg-7 col-12 h-100">
                    <div className={style.imagegradient}></div>
                    <Swiper
                        slidesPerView={(experience.length === 1 && window.innerWidth < 500) ? 1 : 'auto'}
                        spaceBetween={(window.innerWidth < 500) ? 0 : 30}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev'
                        }}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {experience.map((item, index) => (
                            <SwiperSlide className={style.card} key={index}>
                                <motion.div
                                    key={index}
                                    style={{ borderRadius: '28px' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isVisible ? 1 : 0 }}
                                    transition={{ delay: index * 0.3 }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.5 }}
                                    className={`h-100 w-100 px-3`}
                                >
                                    <div className={`card h-100 ${style.cardbox}`}>
                                        <div className={style.cardimg}>
                                            <img
                                                src={`${base_url}/${item?.experienceImage}`}
                                                alt=""
                                                className={style.roundedImage}
                                            />
                                        </div>

                                        <div className="card-body px-0 h-100">
                                            <div className={style.cardtext}>
                                                <h1 className={style.cardheading}>{item?.experienceTitle}</h1>
                                                <p className={style.cardcontent}>{item?.experienceDescription}</p>
                                            </div>
                                            <a href="/" className={`${style.cardbtn} btn p-0 text-primary`}><h1 className={style.btntext}>Read More</h1></a>
                                        </div>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                        <div className={`swiper-button-next`}></div>
                        <div className={`swiper-button-prev`}></div>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Experience;