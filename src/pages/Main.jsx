import React, { useEffect, useState} from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';
import Handcraft from '../components/handcraft/Handcraft';
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

  

  return (
    <>
      <section id="homepage">{showNewSection ? <Sidebar /> : <Header />}<Handcraft /></section>
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
    </>
  );
};

export default Main;
