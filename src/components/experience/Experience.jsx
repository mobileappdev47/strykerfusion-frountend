import React, { useEffect, useState } from 'react';
import style from './experience.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import axios from 'axios';
import { base_url } from '../config/Base_url';

const Experience = () => {
    const [experience, setExperience] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/experience`);
                setExperience(response?.data?.data || []);
                setIsDataFetched(true);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching product data:', error);
            }
        };

        if (!isDataFetched) {
            fetchData();
        }
    }, [isDataFetched]);

    return (
        <div className={`${style.maindiv}`}>
            <div className="row">
                <div className="col-sm-5 d-none d-sm-inline  mb-sm-0 mb-5 d-flex flex-column justify-content-center">
                    <h1 className={style.headingfont}>Experience the Difference</h1>
                    <p className={style.content}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, repudiandae delectus ea commodi debitis quaerat cumque assumenda fugit possimus temporibus.</p>
                    <button className={`btn ${style.learnmorebtn}`}>Learn More</button>
                </div>
                <div className="col-sm-7">
                    <Swiper
                        slidesPerView={'auto'}
                        spaceBetween={30}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {experience.map((item, index) => (
                            <SwiperSlide className={style.card} key={index}>
                                <div className={`card border-0`}>
                                    <img
                                        src={`${base_url}/${item?.experienceImage}`}
                                        alt=""
                                        className={style.roundedImage} // Apply a CSS class for styling
                                    />
                                    <div className="card-body">
                                        <h1 className={style.cardheading}>{item?.experienceTitle}</h1>
                                        <p className={style.cardcontent}>{item?.experienceDescription} </p>
                                        <a href="#" className="btn p-0 text-primary">Read More</a>
                                    </div>
                                </div>
                            </SwiperSlide>))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Experience;