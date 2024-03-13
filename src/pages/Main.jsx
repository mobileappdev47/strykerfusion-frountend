import React, { useEffect, useState, useRef } from 'react';
import { base_url } from '../config/Base_url';
import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';
import Handcraft from '../components/handcraft/Handcraft';
import Process from '../components/process/Process';
import OurBrand from '../components/ourbrands/OurBrand';
import Revolution from '../components/revolution/Revolution';
import ProductsHeader from '../components/productsheader/ProductsHeader';
import Products from '../components/products/Products';
import AllProducts from '../components/allproducts/AllProducts';
import Register from '../components/register/Register';
import Experience from '../components/experience/Experience';
import Map from '../components/map/Map';
import { Tooltip } from 'react-bootstrap';
import OurClients from '../components/ourclients/OurClients';
import ContactUsForm from '../components/contactusform/ContactUsForm';
import Footer from '../components/footer/Footer';
import ContactUs from '../components/contactus/ContactUs';
import axios from 'axios';

const Main = () => {

  const [showNewSection, setShowNewSection] = useState(false);
  const [content, setContent] = useState('');
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isDelaying, setIsDelaying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/product`);
        setProducts(response?.data?.data || []);
        setIsDataFetched(true);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    if (!isDataFetched) {
      fetchData();
    }
  }, [isDataFetched]);

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

  const handleProductMouseEnter = () => {
    if (!isDelaying) { // Check if delaying is false before adding the class
      const productSections = document.querySelectorAll('.product-section');
      productSections.forEach(section => {
        section.classList.add('scroll-snap-center');
      });
    }
  };

  const handleProductMouseLeave = () => {
    const productSections = document.querySelectorAll('.product-section');
    productSections.forEach(section => {
      section.classList.remove('scroll-snap-center');
    });
  };

  return (
    <>
      <section id="homepage">{showNewSection ? <Sidebar /> : <Header setIsDelaying={setIsDelaying}/>}<Handcraft /></section>
      <section id="brandandprocess"><OurBrand /> <Process /></section>
      <section id="revolution" className="product-section" handleMouseEnter={handleProductMouseEnter}
        handleMouseLeave={handleProductMouseLeave}><Revolution /></section>
      <div className="position-relative">
        <ProductsHeader />
        {products.map((item, index) => (
          <section key={`product-${index}`} className="product-section" id='product'>
            <Products item={item} index={index} handleMouseEnter={handleProductMouseEnter}
              handleMouseLeave={handleProductMouseLeave} />
          </section>
        ))}
        {[...Array(Math.ceil(products.length / 4)).keys()].map((batchIndex, index) => (
          <section key={`allproduct-${index}`} className="product-section" id='allproduct'>
            <AllProducts
              key={`batch-${batchIndex}`}
              products={products.slice(batchIndex * 4, (batchIndex + 1) * 4)}
              handleMouseEnter={handleProductMouseEnter}
              handleMouseLeave={handleProductMouseLeave}
            />
          </section>
        ))}
      </div>
      <section id="regexeprience" className="product-section"><Register /> <Experience /></section>
      <section id="map">
        <Map setTooltipContent={setContent} />
        <Tooltip id="my-tooltip">{content}</Tooltip>
      </section>
      <section id="ourclient"><OurClients /></section>
      {showNewSection && <section id="contactusform"><ContactUsForm /></section>}
      <section id="contactus"><ContactUs /><Footer setIsDelaying={setIsDelaying}/></section>
    </>
  );
};

export default Main;
