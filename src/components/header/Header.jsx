import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import style from './header.module.css';
import { motion } from 'framer-motion';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const menuItems = [
    { text: "How It Works", link: "brandandprocess" },
    { text: "Our Products", link: "allproducts" },
    { text: "Why Us", link: "ourclient" },
    { text: "Find Us", link: "contactus" },
    { text: "Technology", link: "regexeprience" }
  ];

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

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
              <div><img src={logo} alt="" className={`${style.profileimg}`} /></div>
            </div>
            <button className={`navbar-toggler border-0 ${style.togglebtn}`} data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button" >
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M27.5 42.5H47.5M12.5 30H47.5M27.5 17.5H47.5" stroke="#265EE1" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
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
                    <a className={`nav-link ${style.headermenu}`} href={`#${item.link}`} onClick={toggleMenu}>
                      {item.text}
                    </a>
                  </motion.li>
                ))}
                <li className="nav-item">
                  <motion.a className={`nav-link ${style.headermenu}`} href="#contactus" onClick={toggleMenu}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button className={`btn ms-5 ${style.getquotebtn}`}>Contact Us</button>
                  </motion.a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </motion.div>
      <div className={`offcanvas offcanvas-end ${style.togglesidebar}`} tabIndex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="true">
        <div className="offcanvas-header justify-content-center">
          <div className='d-flex align-items-center'>
            <div><img src={logo} alt="" className={`${style.profileimg}`} /></div>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
        </div>
        <div className="offcanvas-body px-0">
          <ul className={`${style.togglemenulist} nav nav-pills flex-column mb-sm-auto mb-0 align-items-start`} id="menu">
            {menuItems.map((item, index) => (
              <li className="nav-item" key={index}>
                <a href={`#${item.link}`} className={`${style.headermenutoggle} nav-link text-truncate`} onClick={() => setMenuOpen(!menuOpen)}>
                  <span className="ms-1 d-sm-inline">{item.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;

