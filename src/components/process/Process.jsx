import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import style from './process.module.css';
import pre from '../../assets/prearrow.png';
import next from '../../assets/nextarrow.png';
import { base_url } from '../config/Base_url';
import axios from 'axios';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

const Process = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [numCards, setNumCards] = useState(getNumCards());
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const [process, setProcess] = useState([]);
    const [processMain, setProcessMain] = useState([]);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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
                // eslint-disable-next-line
                observer.unobserve(ref.current);
            }
        };
    }, []);

    useEffect(() => {
        setNumCards(getNumCards());
    }, [startIndex]);

    useEffect(() => {
        const handleResize = () => {
            setNumCards(getNumCards());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleNext = () => {
        setStartIndex(prevIndex => Math.min(prevIndex + 1, process.length - numCards));
        setActiveSlideIndex(prevIndex => prevIndex + 1); // Update activeSlideIndex
    };

    const handlePrev = () => {
        setStartIndex(prevIndex => Math.max(prevIndex - 1, 0));
        setActiveSlideIndex(prevIndex => prevIndex - 1); // Update activeSlideIndex
    };


    function getNumCards() {
        if (window.innerWidth >= 1000) {
            return 3;
        } else if (window.innerWidth >= 600) {
            return 2;
        } else {
            return 1;
        }
    }

    const handleIndicatorClick = (index) => {
        setStartIndex(index);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${base_url}/process`);
            setProcess(response?.data?.data || []);
        } catch (error) {
            console.error('Error fetching home data:', error);
        }
    };

    const fetchProcessMain = async () => {
        try {
            const response = await axios.get(`${base_url}/processmain`);
            setProcessMain(response?.data?.data || []);
        } catch (error) {
            console.error('Error fetching home data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchProcessMain();
    }, []);

    return (
        <div ref={ref} className={style.maindiv}>
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 1 }} exit={{ opacity: 0 }}
                className='h-100' >
                <div className={style.processdiv}>
                    <div className={style.contentwidth}>
                        <h1 className={style.headingfont}>
                            {processMain?.processTitle}
                        </h1>
                        <h1 className={style.content}>{processMain?.processDescription}</h1>
                    </div>
                </div>
                <Swiper
                    slidesPerView={numCards}
                    spaceBetween={30}
                    modules={[Navigation, Pagination]}
                    className={`mySwiper ${style.caroselwidth}`}
                    navigation={true}
                    pagination={{ clickable: true }} // Enable clickable pagination
                >
                    {process.map((item, index) => (
                        <SwiperSlide key={index} className='h-100'>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isVisible ? 1 : 1 }}
                                transition={{ duration: 0.3 }}
                                className='h-100'
                            >
                                <div className={`card-group h-100 ${style.cardgroup}`}>
                                    <motion.div
                                        className={`card mx-4 ${style.card}`}
                                        style={{ width: '18rem', borderRadius: '28px' }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isVisible ? 1 : 1 }}
                                        transition={{ delay: index * 0.3 }}
                                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.5 }}
                                    >
                                        <div className="card-body p-4 h-100">
                                            <div className={`${style.cardimg}`}>
                                                <img src={`${base_url}/${item.image}`} style={{ borderRadius: '9px' }} className={`card-img-top h-100 `} alt="..." />
                                            </div>
                                            <h5 className={`card-title ${style.title}`}>{`${item.title}`}</h5>
                                            <p className={`${style.cardtext} card-text`}>{`${item.description}`}</p>
                                            <button className={`btn ${style.learnmorebtn}`}>Learn More</button>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </motion.div>
        </div>
    );
};

export default Process;