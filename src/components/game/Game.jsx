import React, { useEffect, useRef, useState } from 'react';
import style from './game.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import gamebg from '../../assets/gamebg.png';
import gametext from '../../assets/gametext.png';
import gameauthor from '../../assets/gameauthor.png';
import gamequote from '../../assets/gamequote.png';
import game1 from '../../assets/game1.png';
import game2 from '../../assets/game2.png';

const Game = () => {
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
            <div ref={ref} className={style.gamebanner}>
                <div className={`row ${style.gamemain}`}>
                    <div className={`col-12 ${style.imgSection}`}>
                        <div className="">
                            <img src={gamebg} alt="" className={style.gameimg} />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                            transition={{ duration: 1, delay: 0.1 }}
                            className={style.gamecontent}
                        >
                            <motion.img
                                src={gametext}
                                alt=""
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className={`${style.textimg}`}
                            />
                            <motion.img
                                src={gamequote}
                                alt=""
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                className={`${style.quoteimg}`}
                            />
                            <motion.img
                                src={gameauthor}
                                alt=""
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                                className={style.authorimg}
                            />
                            {/* AnimatePresence for Image Animations */}
                            <AnimatePresence>
                                {isVisible && (
                                    <>
                                        <motion.img
                                            key="game1"
                                            src={game1}
                                            alt=""
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, x: 0 }}
                                            transition={{ duration: 1, delay: 1.2 }}
                                            className={style.game1}
                                        />
                                        <motion.img
                                            key="game2"
                                            src={game2}
                                            alt=""
                                            initial={{ opacity: 0, x: '5%' }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: '10%' }}
                                            transition={{ duration: 1, delay: 1.2 }}
                                            className={style.game2}
                                        />
                                    </>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Game;
