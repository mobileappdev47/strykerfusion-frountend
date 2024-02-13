import React from 'react'
import style from './ourbrands.module.css'
import Marquee from 'react-fast-marquee'
import apple from '../../assets/apple.png'
import google from '../../assets/google.png'
import testl from '../../assets/teslr.png'
import slack from '../../assets/slack.png'
import reddit from '../../assets/reddit.png'

const OurBrand = () => {
    return (
        <div className=''>
            <h1 className={style.heading}>Some of Our Brands</h1>
           <div className='mt-3'>
           <Marquee>
                <img src={apple} className={style.brands} alt='apple' />
                <img src={reddit} className={style.brands} alt='apple' />
                <img src={testl} className={style.brands} alt='apple' />
                <img src={slack} className={style.brands} alt='apple' />
                <img src={apple} className={style.brands} alt='apple' />
                <img src={reddit} className={style.brands} alt='apple' />
                <img src={testl} className={style.brands} alt='apple' />
                <img src={slack} className={style.brands} alt='apple' />
            </Marquee>
           </div>
        </div>
    )
}

export default OurBrand