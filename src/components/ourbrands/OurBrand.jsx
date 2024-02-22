import React, { useEffect, useState } from 'react'
import style from './ourbrands.module.css'
import Marquee from 'react-fast-marquee'
import { base_url } from '../config/Base_url'
import axios from 'axios'

const OurBrand = () => {

    const [brands, setBrands] = useState()
    const [ourBrands, setOurBrands] = useState()
    const [error, setError] = useState()

    const fetchData = async () => {
        try {
            const response = await axios.get(`${base_url}/ourbrands`);
            setBrands(response.data?.brand?.brandImages);
        } catch (error) {
            setError(error);
            console.error('Error fetching home data:', error);
        }
    };
    const fetchOurBrandsMain = async () => {
        try {
            const response = await axios.get(`${base_url}/ourbrandsmain`);
            setOurBrands(response.data?.data);
        } catch (error) {
            setError(error);
            console.error('Error fetching home data:', error);
        }
    };
    useEffect(() => {
        fetchData()
        fetchOurBrandsMain()
    }, [])

    return (
        <div className={style.maindiv}>
            <h1 className={style.heading}>{ourBrands?.brandTitle}</h1>
            <Marquee>
                {
                    brands?.map((item, index) => (
                        <img key={index} src={`${base_url}/${item}`} className={style.brands} alt='apple' />
                    ))
                }
            </Marquee>
        </div>
    )
}

export default OurBrand