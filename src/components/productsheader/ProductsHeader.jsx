import React, { useEffect, useRef, useState } from 'react'
import style from './productsheader.module.css'
import axios from 'axios';
import { base_url } from '../../config/Base_url';
import { useAnimation } from 'framer-motion';

const ProductsHeader = ({ sectionAlign }) => {
    const [productMain, setProductMain] = useState([]);
    const ref = useRef(null);
    const controls = useAnimation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start('visible');
                    setIsVisible(true)
                } else {
                    controls.start('hidden');
                }
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
    }, [controls, sectionAlign]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${base_url}/productmain`);
            setProductMain(response.data?.data);
        } catch (error) {
            console.error('Error fetching home data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let timeout;
        if (isVisible) {
            timeout = setTimeout(() => {
                sectionAlign();
            }, 500);
        }

        return () => clearTimeout(timeout);
    }, [isVisible, sectionAlign]);

    return (
        <div className={style.products} ref={ref}>
            <h1 className={style.headingfont}>{productMain?.productTitle}</h1>
            <p className={style.content}>{productMain?.productDescription}</p>
        </div>
    );
}

export default ProductsHeader;