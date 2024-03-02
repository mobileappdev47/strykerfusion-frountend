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
import ProductsHeader from './components/productsheader/ProductsHeader';

function App() {
  const allProductsRef = useRef(null);
  const [showNewSection, setShowNewSection] = useState(false);
  const [content, setContent] = useState("");
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

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

  const [isSectionAlign, setIsSectionAlign] = useState(false);

  useEffect(() => {
    const htmlTag = document.documentElement;
    const sectionTags = document.querySelectorAll('section');

    if (isSectionAlign) {
      htmlTag.style.scrollSnapType = 'y mandatory';
      sectionTags.forEach(section => {
        section.style.scrollSnapAlign = 'center';
      });
    } else {
      htmlTag.style.scrollSnapType = ''; // Reset scroll snap type if not aligned
      sectionTags.forEach(section => {
        section.style.scrollSnapAlign = 'none';
      });
    }
  }, [isSectionAlign]);


  const handleSectionAlign = () => {
    setIsSectionAlign(true);
  };
  const handleSectionAlignFalse = () => {
    setIsSectionAlign(false);
  };

  return (
    <>
      <section id='homepage'>{showNewSection ? <Sidebar /> : <Header />}<Handcraft /></section>
      <section id='brandandprocess'><OurBrand /> <Process /></section>
      <section id='revolution'><Revolution sectionAlignFalse={handleSectionAlignFalse} /></section>

      <div className='position-relative'>
        <ProductsHeader />
        <div>
          {products.map((item, index) => (
            <>
              <section key={index} id={`product`}>
                <Products item={item} index={index} sectionAlign={handleSectionAlign} />
              </section>
            </>
          ))}
        </div>
        <section id={`allproduct`}>
          <AllProducts products={products} sectionAlign={handleSectionAlign} />
        </section>
      </div>

      <section id='regexeprience'><Register sectionAlign={handleSectionAlign} /> <Experience /></section>
      <section id='map'>
        <Map setTooltipContent={setContent} sectionAlignFalse={handleSectionAlignFalse} />
        <Tooltip id="my-tooltip" >{content}</Tooltip>
      </section>
      <section id='ourclient'><OurClients /></section>
      {showNewSection && <section id='contactusform'><ContactUsForm /></section>}
      <section id='contactus'><ContactUs /><Footer /></section>
    </>
  );
}

export default App;