import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/logo.png';
import style from './footer.module.css'
import { motion, useAnimation } from 'framer-motion'
import { Link } from 'react-scroll';

const Footer = () => {
    const menuItems = [
        { text: "How It Works", link: "brandandprocess" },
        { text: "Our Products", link: "product" },
        { text: "Why Us", link: "regexeprience" },
        { text: "Find Us", link: "contactus" },
        { text: "Client Speake", link: "ourclient" }
    ];
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const controls = useAnimation();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                if (entry.isIntersecting) {
                    controls.start({ y: 0, opacity: 1 });
                } else {
                    controls.start({ y: -20, opacity: 0 });
                }
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
    }, [controls]);

    return (
        <motion.div initial={{ y: -100 }} animate={controls}>
            <div className={style.footer} ref={ref}>
                <div className="row h-100">
                    <div className="col-sm-4 col-6  col-lg-4 d-flex flex-column justify-content-center">
                        <a href="/"><img src={logo} className={style.logoimg} alt="" /></a>
                        <p className={style.content}>© 2024 StrykerFusion. All Rights Reserved</p>
                    </div>
                    <div className="col-sm-8 col-6 col-lg-8 d-flex flex-column justify-content-center">
                        <div className={style.footermenu}>
                            {menuItems.map((item, index) => (
                                <motion.div key={index}
                                    className='text-end'
                                    whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link to={`${item.link}`} className={`btn ${style.footermenubtn}`}>{item.text}</Link>
                                </motion.div>
                            ))}
                        </div>
                        <div className='d-flex gap-3 justify-content-end mt-3 align-items-center'>
                            <motion.a href='#' whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                                whileTap={{ scale: 0.95 }} >
                                <svg className='cursor-pointer' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 12.4165C24 5.78908 18.6274 0.416504 12 0.416504C5.37258 0.416504 0 5.78908 0 12.4165C0 18.406 4.3882 23.3705 10.125 24.2707V15.8853H7.07812V12.4165H10.125V9.77275C10.125 6.76525 11.9166 5.104 14.6576 5.104C15.9701 5.104 17.3438 5.33838 17.3438 5.33838V8.2915H15.8306C14.34 8.2915 13.875 9.21658 13.875 10.1665V12.4165H17.2031L16.6711 15.8853H13.875V24.2707C19.6118 23.3705 24 18.406 24 12.4165Z" fill="#2E343F" />
                                    <path d="M16.6711 15.8853L17.2031 12.4165H13.875V10.1665C13.875 9.21752 14.34 8.2915 15.8306 8.2915H17.3438V5.33838C17.3438 5.33838 15.9705 5.104 14.6576 5.104C11.9166 5.104 10.125 6.76525 10.125 9.77275V12.4165H7.07812V15.8853H10.125V24.2707C11.3674 24.4651 12.6326 24.4651 13.875 24.2707V15.8853H16.6711Z" fill="white" />
                                </svg>
                            </motion.a>
                            <motion.a href='#' whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                                whileTap={{ scale: 0.95 }}>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.7633 12.6928C23.7633 11.877 23.6972 11.0569 23.5561 10.2544H12.2373V14.8754H18.719C18.4501 16.3657 17.5858 17.6841 16.3204 18.5219V21.5202H20.1873C22.4582 19.4302 23.7633 16.3437 23.7633 12.6928Z" fill="#2E343F" />
                                    <path d="M12.2372 24.4168C15.4736 24.4168 18.203 23.3542 20.1916 21.5199L16.3246 18.5216C15.2487 19.2535 13.8598 19.668 12.2416 19.668C9.11096 19.668 6.45653 17.5559 5.50412 14.7163H1.51367V17.8073C3.55078 21.8594 7.69997 24.4168 12.2372 24.4168Z" fill="#2E343F" />
                                    <path d="M5.49984 14.7172C4.99718 13.2268 4.99718 11.613 5.49984 10.1227V7.03174H1.51381C-0.188196 10.4225 -0.188196 14.4174 1.51381 17.8081L5.49984 14.7172Z" fill="#2E343F" />
                                    <path d="M12.2372 5.16616C13.948 5.13971 15.6015 5.78347 16.8405 6.96517L20.2666 3.53912C18.0972 1.50201 15.2179 0.382038 12.2372 0.417313C7.69997 0.417313 3.55078 2.97473 1.51367 7.03131L5.49971 10.1223C6.44772 7.27823 9.10654 5.16616 12.2372 5.16616Z" fill="#2E343F" />
                                </svg>
                            </motion.a>
                            <motion.a href='#' whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.6845 19.1198C20.3216 19.9583 19.892 20.7301 19.3942 21.4397C18.7157 22.4071 18.1602 23.0767 17.732 23.4485C17.0684 24.0589 16.3573 24.3715 15.5958 24.3893C15.0492 24.3893 14.3899 24.2337 13.6225 23.9182C12.8526 23.6041 12.1451 23.4485 11.4982 23.4485C10.8197 23.4485 10.092 23.6041 9.31364 23.9182C8.53411 24.2337 7.90613 24.3981 7.426 24.4144C6.6958 24.4456 5.96797 24.1241 5.24147 23.4485C4.77779 23.0441 4.19781 22.3508 3.50301 21.3686C2.75756 20.3198 2.14469 19.1035 1.66455 17.7169C1.15035 16.2191 0.892578 14.7688 0.892578 13.3647C0.892578 11.7563 1.24012 10.3691 1.93625 9.20661C2.48334 8.27286 3.21117 7.53629 4.1221 6.99557C5.03304 6.45484 6.0173 6.1793 7.07727 6.16167C7.65725 6.16167 8.41782 6.34107 9.36297 6.69365C10.3055 7.04742 10.9106 7.22682 11.176 7.22682C11.3743 7.22682 12.0466 7.01705 13.1863 6.59884C14.264 6.211 15.1736 6.05041 15.9188 6.11367C17.938 6.27663 19.4549 7.0726 20.4638 8.50663C18.6579 9.60082 17.7646 11.1334 17.7824 13.0994C17.7987 14.6307 18.3542 15.9051 19.4461 16.9169C19.9409 17.3865 20.4934 17.7495 21.1082 18.0072C20.9749 18.3939 20.8342 18.7642 20.6845 19.1198ZM16.0536 0.896641C16.0536 2.09691 15.6151 3.21761 14.741 4.25491C13.6862 5.48806 12.4104 6.20063 11.0269 6.08819C11.0093 5.94419 10.9991 5.79264 10.9991 5.63339C10.9991 4.48112 11.5007 3.24798 12.3915 2.23971C12.8362 1.72921 13.4018 1.30473 14.0877 0.966119C14.7721 0.632559 15.4195 0.448093 16.0284 0.416504C16.0462 0.576962 16.0536 0.73743 16.0536 0.896625V0.896641Z" fill="#2E343F" />
                                </svg>
                            </motion.a>
                            <motion.a href='#' whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.8503 0.416504H7.14973C3.20735 0.416504 0 3.62386 0 7.56623V17.2668C0 21.2092 3.20735 24.4165 7.14973 24.4165H16.8503C20.7926 24.4165 24 21.2092 24 17.2668V7.56623C24 3.62386 20.7926 0.416504 16.8503 0.416504ZM21.5856 17.2668C21.5856 19.882 19.4655 22.0021 16.8503 22.0021H7.14973C4.5345 22.0021 2.4144 19.882 2.4144 17.2668V7.56623C2.4144 4.95096 4.5345 2.8309 7.14973 2.8309H16.8503C19.4655 2.8309 21.5856 4.95096 21.5856 7.56623V17.2668Z" fill="#2E343F" />
                                    <path d="M12.0002 6.20947C8.57754 6.20947 5.79297 8.99404 5.79297 12.4167C5.79297 15.8393 8.57754 18.6239 12.0002 18.6239C15.4229 18.6239 18.2075 15.8394 18.2075 12.4167C18.2075 8.994 15.4229 6.20947 12.0002 6.20947ZM12.0002 16.2096C9.90547 16.2096 8.20737 14.5115 8.20737 12.4167C8.20737 10.322 9.90551 8.62387 12.0002 8.62387C14.095 8.62387 15.7931 10.322 15.7931 12.4167C15.7931 14.5114 14.0949 16.2096 12.0002 16.2096Z" fill="#2E343F" />
                                    <path d="M18.2188 7.74275C19.0402 7.74275 19.7061 7.07685 19.7061 6.25541C19.7061 5.43397 19.0402 4.76807 18.2188 4.76807C17.3974 4.76807 16.7314 5.43397 16.7314 6.25541C16.7314 7.07685 17.3974 7.74275 18.2188 7.74275Z" fill="#2E343F" />
                                </svg>
                            </motion.a>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Footer;