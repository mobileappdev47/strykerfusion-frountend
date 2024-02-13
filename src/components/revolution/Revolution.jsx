import React from 'react'
import style from './revolution.module.css'
import revolutionman from '../../assets/revolutionman.png'

const Revolution = () => {
    return (
        <div className={style.maindiv}>
            <div className={`card mb-3 ${style.card}`}>
                <div className="row g-0">
                    <div className="col-md-6 text-center">
                        <img src={revolutionman} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-6 d-flex">
                        <div className="card-body d-flex flex-column justify-content-center">
                            <h1 className={`card-title ${style.headingfont}`}>Don't Just Level Up, Leap Forward with our Value Revolution</h1>
                            <p className={`card-text mt-4 ${style.content}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                            <p className={`card-text mt-4 ${style.subcontent}`}>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.3751 13.4986C20.6251 17.2486 17.7978 20.779 13.8291 21.5684C9.86043 22.3579 5.83311 20.5118 3.84055 16.99C1.848 13.4682 2.33991 9.06537 5.06059 6.07014C7.78128 3.0749 12.3751 2.24858 16.1251 3.74858" stroke="#265EE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.625 11.9985L12.375 15.7485L21.375 5.99854" stroke="#265EE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                &nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                            <p className={`card-text ${style.subcontent}`}>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.3751 13.4986C20.6251 17.2486 17.7978 20.779 13.8291 21.5684C9.86043 22.3579 5.83311 20.5118 3.84055 16.99C1.848 13.4682 2.33991 9.06537 5.06059 6.07014C7.78128 3.0749 12.3751 2.24858 16.1251 3.74858" stroke="#265EE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.625 11.9985L12.375 15.7485L21.375 5.99854" stroke="#265EE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                &nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                            <p className={`card-text ${style.subcontent}`}>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.3751 13.4986C20.6251 17.2486 17.7978 20.779 13.8291 21.5684C9.86043 22.3579 5.83311 20.5118 3.84055 16.99C1.848 13.4682 2.33991 9.06537 5.06059 6.07014C7.78128 3.0749 12.3751 2.24858 16.1251 3.74858" stroke="#265EE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.625 11.9985L12.375 15.7485L21.375 5.99854" stroke="#265EE1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                &nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                            <button className={`btn mt-5 ${style.getstartedbtn}`}>Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Revolution
