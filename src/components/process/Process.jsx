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
        if (window.innerWidth >= 990) {
            return 3;
        } else if (window.innerWidth >= 768) {
            return 2;
        } else {
            return 1;
        }
    }

    const [process, setProcess] = useState([])
    const [error, setError] = useState()

    const fetchData = async () => {
        try {
            const response = await axios.get(`${base_url}/process`);
            setProcess(response?.data?.data);
        } catch (error) {
            setError(error);
            console.error('Error fetching home data:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div ref={ref} className={style.maindiv}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: isVisible ? 1 : 0 }} exit={{ opacity: 0 }} >
                <h1 className={style.headingfont}>
                    The Process
                </h1>
                <h1 className={style.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br /> eiusmod tempor incididunt</h1>
                <div id="carouselExampleIndicators1" className="carousel slide" data-bs-ride="carousel">
                    <div className={`carousel-indicators`}>
                        <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="0" className={` ${startIndex === 0 ? 'active' : ''}`} aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="1" className={` ${startIndex === 1 ? 'active' : ''}`} aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="2" className={` ${startIndex === 2 ? 'active' : ''}`} aria-label="Slide 3"></button>
                    </div>
                    <motion.div className="carousel-inner"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="carousel-item active">
                            <div className={`card-group ${style.cardgroup}`}>
                                {process.slice(startIndex, startIndex + numCards).map((item, index) => (
                                    <motion.div className={`card border-0 bg-white p-4 m-3 ${style.card}`} key={index}
                                        style={{ width: '18rem', borderRadius: '28px' }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isVisible ? 1 : 0 }}
                                        transition={{ delay: index * 0.3 }}
                                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                    >
                                        <img src={`${base_url}/${item.image}`} style={{ borderRadius: '9px' }} className="card-img-top p-3" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title mb-3">{`${item.title}`}</h5>
                                            <p className="card-text">{`${item.description}`}</p>
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
