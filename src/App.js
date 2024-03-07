import React, { useState, useEffect } from 'react';
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
import { base_url } from './config/Base_url';
import ContactUsForm from './components/contactusform/ContactUsForm';
import Sidebar from './components/sidebar/Sidebar';
import { Tooltip } from 'react-tooltip';
import ProductsHeader from './components/productsheader/ProductsHeader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './privateroute/PrivateRoute';
import HomeAd from './adminpages/homead/HomeAd';
import ProductAd from './adminpages/productad/ProductAd';
import ProcessAd from './adminpages/processad/ProcessAd';
import ExperienceAd from './adminpages/experiencead/ExperienceAd';
import BrandAd from './adminpages/brandad/BrandAd';
import ClientAd from './adminpages/clientad/ClientAd';
import LocationAd from './adminpages/locationad/LocationAd';
import ContactAd from './adminpages/contactad/ContactAd';
import PossibleAd from './adminpages/possiblead/PossibleAd';
import RevolutionAd from './adminpages/revolutionad/RevolutionAd';
import LoginAd from './adminpages/loginad/LoginAd';
import Layout from '../src/admincomponents/layout/Layout';
import Main from './pages/Main';

function App() {
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
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleHashChange = () => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        const isProductSection = element.id === 'product';
        if (isProductSection) {
          setIsSectionAlign(false);
        }

        if (isProductSection) {
          setTimeout(() => setIsSectionAlign(true), 1000);
        }
      }
    }
  };


  useEffect(() => {
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);


  const handleSectionAlign = () => {
    setIsSectionAlign(true);
  };

  const handleSectionAlignFalse = () => {
    setIsSectionAlign(false);
  };

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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exec element={<PrivateRoutes />}>
            <Route element={<Layout />}>
              <Route path="/admin/home" element={<HomeAd />} />
              <Route path="/admin/product" element={<ProductAd />} />
              <Route path="/admin/process" element={<ProcessAd />} />
              <Route path="/admin/experience" element={<ExperienceAd />} />
              <Route path="/admin/brand" element={<BrandAd />} />
              <Route path="/admin/client" element={<ClientAd />} />
              <Route path="/admin/location" element={<LocationAd />} />
              <Route path="/admin/contact" element={<ContactAd />} />
              <Route path="/admin/possible" element={<PossibleAd />} />
              <Route path="/admin/revolution" element={<RevolutionAd />} />
            </Route>
          </Route>
          <Route path="/login" element={<LoginAd />} />
          <Route path='/' element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;