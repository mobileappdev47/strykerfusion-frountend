import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import style from './header.module.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <>
      <div className={style.maindiv}>
        <nav className={`navbar navbar-expand-lg navbar-light bg-light ${style.header}`}>
          <div className='d-flex align-items-center'>
            <div><img src={logo} alt="" className={`${style.profileimg}`} /></div>
          </div>
          <button className={`navbar-toggler border-0 ${style.togglebtn}`} type="button" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M27.5 42.5H47.5M12.5 30H47.5M27.5 17.5H47.5" stroke="#265EE1" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className={`collapse navbar-collapse justify-content-end ${menuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <Link className={`nav-link ${style.headermenu}`} to="/" onClick={toggleMenu}>
                  How It Works
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${style.headermenu}`} to="/" onClick={toggleMenu}>
                  Our Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${style.headermenu}`} to="/" onClick={toggleMenu}>
                  Why Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${style.headermenu}`} to="/" onClick={toggleMenu}>
                  Find Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${style.headermenu}`} to="/" onClick={toggleMenu}>
                  Technology
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${style.headermenu}`} to="/" onClick={toggleMenu}>
                  <button className={`btn btn-primary ms-5 ${style.getquotebtn}`}>Contact Us</button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Header;