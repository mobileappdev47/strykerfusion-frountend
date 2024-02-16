import React from 'react';
import { motion } from 'framer-motion';
import wave from '../../assets/Clip path group.png';
import styles from './register.module.css';

const Register = () => {
    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <img
                    src={wave}
                    alt="background"
                    className={styles.image}
                />
            </div>
            <div className={styles.content}>
                <h1 className={styles.headingfont}>Unlock a World of New Possibilities</h1>
                <p className={`${styles.contentfont} w-sm-50 w-100`}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident id, doloremque fugiat minima exercitationem nihil.
                </p>
                <div className={`d-flex gap-5`}>
                    <button className={`${styles.registerbtn}`}>Register Now</button>
                    <button className={`${styles.contactbtn}`}>Contact Us</button>
                </div>
            </div>
        </div>
    );
};

export default Register;
