import React from 'react'
import style from './ourclient.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import client1 from '../../assets/client1.png'
import 'swiper/css';
import 'swiper/css/navigation';

const OurClients = () => {
    return (
        <div className={style.maindiv}>
            <h1 className={style.headingfont}>What Our Clients Say About Us</h1>
            <p className={style.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                modules={[Pagination]}
                className="mySwiper mt-5"
            >
                {[...Array(6)].map((_, index) => (
                    <SwiperSlide key={index} className='bg-transparent'>
                        {({ isNext }) => (
                            <div className={isNext ? style.active : style.notactive}>
                                <div className={isNext ? 'p-5 d-flex flex-column h-100 justify-content-center align-items-center' : 'px-5 pt-5'}>
                                    <div>
                                        <svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.555664 10.4166V20.7023H10.8414V10.4166H3.98426C3.98426 6.63564 7.06044 3.55946 10.8414 3.55946V0.130859C5.1695 0.130859 0.555664 4.7447 0.555664 10.4166Z" fill={isNext ? "#FAFAFA" : "#4C5877"} />
                                        </svg>
                                        <svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.555664 10.4166V20.7023H10.8414V10.4166H3.98426C3.98426 6.63564 7.06044 3.55946 10.8414 3.55946V0.130859C5.1695 0.130859 0.555664 4.7447 0.555664 10.4166Z" fill={isNext ? "#FAFAFA" : "#4C5877"} />
                                        </svg>
                                    </div>
                                    <p className={isNext ? style.activecontentclient : style.clientcontent}>
                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                    </p>
                                </div>
                                <div className={isNext ? style.clientsec : 'mt-5'}>
                                    <div className='d-flex justify-content-center position-relative'>
                                        <img src={client1}  className={`${style.clientimg} ${!isNext ? style.blackAndWhite : ''}`} alt="client" />
                                    </div>
                                    <h1 className={style.clientname}>Lora Smith </h1>
                                    <p className={style.clientcontent}>CEO Lixusio</p>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    )
}

export default OurClients