import React, { useEffect, useState } from 'react'
import style from './productsheader.module.css'
import axios from 'axios';
import { base_url } from '../config/Base_url';

const ProductsHeader = () => {
    const [productMain, setProductMain] = useState([]);

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

    return (
        <>
            <div className={style.products}>
                <h1 className={style.headingfont}>{productMain?.productTitle}</h1>
                <p className={style.content}>{productMain?.productDescription}</p>
            </div>

        </>

    )
}

export default ProductsHeader
