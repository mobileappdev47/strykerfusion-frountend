import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import style from './process.module.css';
import card from '../../assets/card.png';
import pre from '../../assets/prearrow.png';
import next from '../../assets/nextarrow.png';
import { base_url } from '../config/Base_url';
import axios from 'axios';

const Process = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [numCards, setNumCards] = useState(getNumCards());
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const [process, setProcess] = useState([])
    const [processMain, setProcessMain] = useState([])
    const [error, setError] = useState()

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
    };

    const handlePrev = () => {
        setStartIndex(prevIndex => Math.max(prevIndex - 1, 0));
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


    const fetchData = async () => {
        try {
            const response = await axios.get(`${base_url}/process`);
            setProcess(response?.data?.data);
        } catch (error) {
            setError(error);
            console.error('Error fetching home data:', error);
        }
    };
    const fetchProcessMain = async () => {
        try {
            const response = await axios.get(`${base_url}/processmain`);
            setProcessMain(response?.data?.data);
        } catch (error) {
            setError(error);
            console.error('Error fetching home data:', error);
        }
    };

    useEffect(() => {
        fetchData()
        fetchProcessMain()
    }, [])

    return (
        <div ref={ref} className={style.maindiv}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} exit={{ opacity: 0 }} className='h-100' >
               <div className='d-flex justify-content-center align-items-center'>
               <div className={style.contentwidth}>
                    <h1 className={style.headingfont}>
                        {processMain?.processTitle}
                    </h1>
                    <h1 className={style.content}>{processMain?.processDescription}</h1>
                </div>
               </div>
                <div id="carouselExampleIndicators1" className={`carousel slide  ${style.caroselwidth}`} data-bs-ride="carousel">
                    {numCards === 3 && (
                        <div className={`carousel-indicators`}>
                            <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="0" className={` ${startIndex === 0 ? 'active' : ''}`} aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="1" className={` ${startIndex === 1 ? 'active' : ''}`} aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="2" className={` ${startIndex === 2 ? 'active' : ''}`} aria-label="Slide 3"></button>
                        </div>
                    )}
                    <motion.div className="carousel-inner h-100"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="carousel-item active h-100">
                            <div className={`card-group h-100 ${style.cardgroup}`}>
                                {process.slice(startIndex, startIndex + numCards).map((item, index) => (
                                    <motion.div
                                        className={`card border-0 h-100 p-0 mx-4 ${style.card}`}
                                        key={index}
                                        style={{ width: '18rem', borderRadius: '28px' }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isVisible ? 1 : 0 }}
                                        transition={{ delay: index * 0.3 }}
                                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.5 }}
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
                                ))}
                            </div>
                        </div>
                    </motion.div>
                    <button className={`carousel-control-prev ${style.carousel}`} type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide="prev" onClick={handlePrev}>
                        <span className="" aria-hidden="true"> <motion.img src={pre} alt="..." initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ delay: 0.5 }} /></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className={`carousel-control-next ${style.carousel}`} type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide="next" onClick={handleNext}>
                        <span className="" aria-hidden="true"><motion.img src={next} alt="..." initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} transition={{ delay: 0.5 }} /></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Process;
