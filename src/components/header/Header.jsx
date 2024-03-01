import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/logo.png';
import style from './header.module.css';
import { motion } from 'framer-motion';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const menuItems = [
    { text: "How It Works", link: "brandandprocess" },
    { text: "Our Products", link: "product" },
    { text: "Why Us", link: "regexeprience" },
    { text: "Find Us", link: "contactus" },
    { text: "Client Speake", link: "ourclient" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
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

  return (
    <>
      <motion.div initial={{ y: -100 }} animate={{ y: isVisible ? 0 : -20 }}>
        <div>
          <nav ref={ref} className={`navbar navbar-expand-lg navbar-light bg-light ${style.header}`}>
            <div className='d-flex align-items-center'>
              <a href='/'><img src={logo} alt="" className={`${style.profileimg}`} /></a>
            </div>
            <div className={`collapse navbar-collapse justify-content-end`}>
              <ul className="navbar-nav align-items-center">
                {menuItems.map((item, index) => (
                  <motion.li
                    className="nav-item"
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }} // Smooth transition on hover
                    whileTap={{ scale: 0.95 }}
                  >
                    <a className={`nav-link ${style.headermenu}`} href={`#${item.link}`} >
                      {item.text}
                    </a>
                  </motion.li>
                ))}
                <li className="nav-item">
                  <motion.a className={`nav-link ${style.headermenu}`} href="#contactus"
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button className={`btn btn-primary ms-5 ${style.getquotebtn}`}>Contact Us</button>
                  </motion.a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </motion.div>
    </>
  );
}

export default Header;