import React from 'react';
import style from './experience.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const Experience = () => {
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
                        {Array.from({ length: 6 }, (_, index) => (
                            <SwiperSlide className={style.card}>
                                <div className={`card border-0`}>
                                    <svg width="72" height="73" viewBox="0 0 72 73" className='d-flex' fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="36" cy="36.5" r="36" fill="#265EE1" />
                                        <path d="M45.1085 36.9811C44.6255 36.9811 44.1622 36.7892 43.8206 36.4476C43.479 36.106 43.2871 35.6427 43.2871 35.1597C43.2871 34.6766 43.479 34.2133 43.8206 33.8717C44.1622 33.5301 44.6255 33.3382 45.1085 33.3382C46.5578 33.3382 47.9476 32.7625 48.9724 31.7378C49.9971 30.713 50.5728 29.3232 50.5728 27.874V26.0525H45.4182C44.9351 26.0525 44.4718 25.8606 44.1302 25.519C43.7886 25.1775 43.5967 24.7142 43.5967 24.2311C43.5967 23.748 43.7886 23.2847 44.1302 22.9432C44.4718 22.6016 44.9351 22.4097 45.4182 22.4097H50.5728C51.539 22.4097 52.4655 22.7935 53.1487 23.4766C53.8319 24.1598 54.2157 25.0864 54.2157 26.0525V27.874C54.2157 29.0699 53.9801 30.2542 53.5224 31.3591C53.0648 32.464 52.3939 33.468 51.5483 34.3137C50.7026 35.1594 49.6986 35.8302 48.5937 36.2879C47.4888 36.7455 46.3045 36.9811 45.1085 36.9811ZM28.7157 35.1597C28.7157 34.6766 28.5238 34.2133 28.1822 33.8717C27.8406 33.5301 27.3773 33.3382 26.8943 33.3382C25.445 33.3382 24.0552 32.7625 23.0304 31.7378C22.0057 30.713 21.43 29.3232 21.43 27.874V26.0525H26.4207C26.9038 26.0525 27.367 25.8606 27.7086 25.519C28.0502 25.1775 28.2421 24.7142 28.2421 24.2311C28.2421 23.748 28.0502 23.2847 27.7086 22.9432C27.367 22.6016 26.9038 22.4097 26.4207 22.4097H21.43C20.4638 22.4097 19.5372 22.7935 18.8541 23.4766C18.1709 24.1598 17.7871 25.0864 17.7871 26.0525V27.874C17.7871 30.2893 18.7466 32.6058 20.4545 34.3137C22.1624 36.0216 24.4789 36.9811 26.8943 36.9811C27.3773 36.9811 27.8406 36.7892 28.1822 36.4476C28.5238 36.106 28.7157 35.6427 28.7157 35.1597ZM37.8228 53.374V44.5947C37.8228 44.1116 37.6309 43.6483 37.2893 43.3067C36.9478 42.9651 36.4845 42.7732 36.0014 42.7732C35.5183 42.7732 35.055 42.9651 34.7134 43.3067C34.3719 43.6483 34.18 44.1116 34.18 44.5947V53.374C34.18 53.857 34.3719 54.3203 34.7134 54.6619C35.055 55.0035 35.5183 55.1954 36.0014 55.1954C36.4845 55.1954 36.9478 55.0035 37.2893 54.6619C37.6309 54.3203 37.8228 53.857 37.8228 53.374Z" fill="#FAFAFA" />
                                        <path d="M43.2876 55.1961H28.7161C28.2331 55.1961 27.7698 55.0042 27.4282 54.6627C27.0866 54.3211 26.8947 53.8578 26.8947 53.3747C26.8947 52.8916 27.0866 52.4284 27.4282 52.0868C27.7698 51.7452 28.2331 51.5533 28.7161 51.5533H43.2876C43.7706 51.5533 44.2339 51.7452 44.5755 52.0868C44.9171 52.4284 45.109 52.8916 45.109 53.3747C45.109 53.8578 44.9171 54.3211 44.5755 54.6627C44.2339 55.0042 43.7706 55.1961 43.2876 55.1961ZM45.109 18.7676H26.8947C26.4116 18.7676 25.9483 18.9595 25.6068 19.3011C25.2652 19.6426 25.0733 20.1059 25.0733 20.589V32.5558C25.0671 35.3884 25.9132 38.1574 27.5016 40.5027C29.0901 42.848 31.3474 44.6612 33.9801 45.7065C34.6237 45.9609 35.3098 46.0907 36.0019 46.089C36.6995 46.0874 37.391 45.9578 38.0419 45.7065C40.6697 44.6562 42.9217 42.8413 44.5065 40.4967C46.0912 38.1521 46.9356 35.3857 46.9304 32.5558V20.589C46.9304 20.1059 46.7385 19.6426 46.3969 19.3011C46.0554 18.9595 45.5921 18.7676 45.109 18.7676Z" fill="#FAFAFA" />
                                        <circle cx="36.0014" cy="29.9555" r="3.12245" fill="#265EE1" />
                                    </svg>

                                    <div className="card-body">
                                        <h1 className={style.cardheading}>Timely Deliverables</h1>
                                        <p className={style.cardcontent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                        <a href="#" className="btn p-0 text-primary">Read More</a>
                                    </div>
                                </div></SwiperSlide>))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Experience;
