import axios from 'axios';
import React, { useEffect, useState } from 'react'
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

const Main = () => {

  const [isSectionAlign, setIsSectionAlign] = useState(false);
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
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSectionAlign = () => {
    setIsSectionAlign(true);
  };

  const handleSectionAlignFalse = () => {
    setIsSectionAlign(false);
  };

  useEffect(() => {
    const sectionTags = document.querySelectorAll('section');

    if (isSectionAlign) {
      sectionTags.forEach(section => {
        section.style.scrollSnapAlign = 'center';
      });
    } else {
      sectionTags.forEach(section => {
        section.style.scrollSnapAlign = 'none';
      });
    }
  }, [isSectionAlign]);
  console.log(isSectionAlign)
  return (
    <>
      <section id='homepage'>{showNewSection ? <Sidebar /> : <Header />}<Handcraft /></section>
      <section id='brandandprocess'><OurBrand /> <Process /></section>
      <section id='revolution'><Revolution sectionAlignFalse={handleSectionAlignFalse} /></section>
      <div className='position-relative'>
        <ProductsHeader />
        <div>
          {products.map((item, index) => (
            <section key={`product-${index}`} id={`product`}>
              <Products sectionAlign={handleSectionAlign}  item={item} index={index} />
            </section>
          ))}
        </div>
        {[...Array(Math.ceil(products.length / 4)).keys()].map((batchIndex, index) => (
          <section key={`allproduct`} id={`allproduct`}>
            <AllProducts
              key={`batch-${batchIndex}`}
              products={products.slice(batchIndex * 4, (batchIndex + 1) * 4)}
            />
          </section>
        ))}
      </div>
      <section id='regexeprience'><Register sectionAlign={handleSectionAlign} /> <Experience /></section>
      <section id='map'>
        <Map sectionAlign={handleSectionAlignFalse} setTooltipContent={setContent} />
        <Tooltip id="my-tooltip" >{content}</Tooltip>
      </section>
      <section id='ourclient'><OurClients /></section>
      {showNewSection && <section id='contactusform'><ContactUsForm /></section>}
      <section id='contactus'><ContactUs /><Footer /></section>
    </>
  )
}

export default Main
