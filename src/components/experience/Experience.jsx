import React from 'react';
import style from './experience.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

const Experience = () => {
    return (
        <div className={`${style.maindiv}`}>
            <div className="row">
                <div className="col-4">
                    <h1 className={style.headingfont}>Experience the Difference</h1>
                    <p className={style.content}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem, repudiandae delectus ea commodi debitis quaerat cumque assumenda fugit possimus temporibus.</p>
                    <button className={`btn ${style.learnmorebtn}`}>Learn More</button>
                </div>
                <div className="col-8">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        navigation={{ nextEl: '.swiper-button-next' }} // Enable only the right arrow
                        className="mySwiper"
                    >
                        <SwiperSlide>Slide 1</SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                        <SwiperSlide>Slide 5</SwiperSlide>
                        <SwiperSlide>Slide 6</SwiperSlide>
                        <SwiperSlide>Slide 7</SwiperSlide>
                        <SwiperSlide>Slide 8</SwiperSlide>
                        <SwiperSlide>Slide 9</SwiperSlide>
                    </Swiper>
                    <div className="swiper-button-next"></div> {/* Right arrow */}
                </div>
            </div>
        </div>
    );
};

export default Experience;
