import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';
import Process from '../components/process/Process';
import OurBrand from '../components/ourbrands/OurBrand';
import Revolution from '../components/revolution/Revolution';
import ProductsHeader from '../components/productsheader/ProductsHeader';
import Products from '../components/products/Products';
import Register from '../components/register/Register';
import Experience from '../components/experience/Experience';
import Map from '../components/map/Map';
import { Tooltip } from 'react-bootstrap';
import OurClients from '../components/ourclients/OurClients';
import ContactUsForm from '../components/contactusform/ContactUsForm';
import Footer from '../components/footer/Footer';
import ContactUs from '../components/contactus/ContactUs';
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import HeroBanner from '../components/herobanner/HeroBanner';
import Express from '../components/express/Express';
import Game from '../components/game/Game';
import Fly from '../components/fly/Fly';
import Laugh from '../components/laugh/Laugh';
import Live from '../components/live/Live';
import Sky from '../components/sky/Sky';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Main = () => {
  const [showNewSection, setShowNewSection] = useState(false);
  const [content, setContent] = useState('');


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 990) {
        setShowNewSection(true);
      } else {
        setShowNewSection(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on('scroll', () => {
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }, []);

  // useEffect(() => {
  //   const myCarousel = document.querySelector('#carouselExampleControlsNoTouching');
  //   const carousel = new window.bootstrap.Carousel(myCarousel, {
  //     interval: 5000, // Adjust interval time in milliseconds
  //     wrap: true // Enable looping
  //   });
  // }, []);

  return (
    <div className=''>
      <section id="homepage">{showNewSection ? <Sidebar /> : <Header />}
        {/* <HeroBanner />
        <Express /> 
        <Game />
        <Fly />
        <Laugh />
        <Live />
        <Sky /> */}
        {/* <div className='slidermain' style={{  }}>
          <div className='heroslider'>
            <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false" data-bs-interval="false">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={skybg} className="d-block w-100 sliderimg" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={skybg} className="d-block w-100 sliderimg" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={skybg} className="d-block w-100 sliderimg" alt="..." />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div> */}
        <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="4000">
              <HeroBanner />
            </div>
            <div className="carousel-item" data-bs-interval="4000">
              <Express />
            </div>
            <div className="carousel-item" data-bs-interval="4000">
              <Game />
            </div>
            <div className="carousel-item" data-bs-interval="4000">
              <Fly />
            </div>
            <div className="carousel-item" data-bs-interval="4000">
              <Laugh />
            </div>
            <div className="carousel-item" data-bs-interval="4000">
              <Live />
            </div>
            <div className="carousel-item" data-bs-interval="4000">
              <Sky />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      <section id="brandandprocess"><OurBrand /> <Process /></section>
      <section id="revolution" className="product-section"><Revolution /></section>
      <div className='position-relative'>
        <ProductsHeader />
        <section key={`product`} className="mt-0" id='product'>
          <Products />
        </section>
      </div>
      <section id="regexeprience" className="mt-5"><Register /> <Experience /></section>
      <section id="map">
        <Map setTooltipContent={setContent} />
        <Tooltip id="my-tooltip">{content}</Tooltip>
      </section>
      <section id="ourclient"><OurClients /></section>
      {showNewSection && <section id="contactusform"><ContactUsForm /></section>}
      <section id="contactus"><ContactUs /><Footer /></section>
    </div>
  );
};

export default Main;