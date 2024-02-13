import React, { useEffect, useState } from 'react'
import style from './process.module.css'
import card from '../../assets/card.png'
import pre from '../../assets/prearrow.png'
import next from '../../assets/nextarrow.png'

const Process = () => {
    const [startIndex, setStartIndex] = useState(0);

    const getNumCards = () => {
        if (window.innerWidth >= 990) {
            return 3;
        } else if (window.innerWidth >= 768) {
            return 2;
        } else {
            return 1;
        }
    };

    const [numCards, setNumCards] = useState(getNumCards());

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setNumCards(getNumCards());
    }, [startIndex]);

    const handleResize = () => {
        setNumCards(getNumCards());
    };

    const handleNext = () => {
        setStartIndex((prevIndex) => Math.min(prevIndex + 1, 2));
    };

    const handlePrev = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    return (
        <div className={style.maindiv}>
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
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className={`card-group ${style.cardgroup}`}>
                            {/* Render cards based on startIndex */}
                            {[0, 1, 2].map((index) => {
                                const cardIndex = startIndex + index;
                                return (
                                    <div className={`card border-0 bg-white p-4 m-3 ${style.card}`} key={cardIndex} style={{ width: '18rem', borderRadius: '28px' }}>
                                        <img src={card} style={{ borderRadius: '9px' }} className="card-img-top p-3" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title mb-3">{`${cardIndex + 1}Design`}</h5>
                                            <p className="card-text">{`${cardIndex + 1} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam`}</p>
                                            <button className={`btn ${style.learnmorebtn}`}>Learn More</button>
                                        </div>
                                    </div>
                                );
                            }).slice(0, numCards)}
                        </div>
                    </div>
                </div>
                <button className={`carousel-control-prev ${style.carousel}`} type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide="prev" onClick={handlePrev}>
                    <span className="" aria-hidden="true"> <img src={pre} alt="..." /></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className={`carousel-control-next ${style.carousel}`} type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide="next" onClick={handleNext}>
                    <span className="" aria-hidden="true"><img src={next} alt="..." /></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default Process
