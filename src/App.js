import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Handcraft from './components/handcraft/Handcraft';
import Header from './components/header/Header';
import OurBrand from './components/ourbrands/OurBrand';
import Process from './components/process/Process';
import Revolution from './components/revolution/Revolution';
import Products from './components/products/Products';
import AllProducts from './components/allproducts/AllProducts';
import Register from './components/register/Register';
import Experience from './components/experience/Experience';
import Map from './components/map/Map';
import OurClients from './components/ourclients/OurClients';
import ContactUs from './components/contactus/ContactUs';
import Footer from './components/footer/Footer';
import axios from 'axios';
import { base_url } from './components/config/Base_url';
import ContactUsForm from './components/contactusform/ContactUsForm';
import Sidebar from './components/sidebar/Sidebar';
import { Tooltip } from 'react-tooltip';

function App() {
  const allProductsRef = useRef(null);
  const [showNewSection, setShowNewSection] = useState(false);
  const [content, setContent] = useState("");


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 990) {
        setShowNewSection(true);
      } else {
        setShowNewSection(false);
      }
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <section id='homepage'>{showNewSection ? <Sidebar /> : <Header />}<Handcraft /></section>
      <section id='brandandprocess'><OurBrand /> <Process /></section>
      <section id='revolution'><Revolution /></section>
      <section id={`product`}>
        <Products />
      </section>
      <section id='regexeprience'><Register /> <Experience /></section>
      <section id='map'>
        <Map setTooltipContent={setContent} />
        <Tooltip id="my-tooltip" >{content}</Tooltip>
      </section>
      <section id='ourclient'><OurClients /></section>
      {showNewSection && <section id='contactusform'><ContactUsForm /></section>}
      <section id='contactus'><ContactUs /><Footer /></section>
    </>
  );
}

export default App;