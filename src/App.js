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

function App() {
  const [showProducts, setShowProducts] = useState(true);
  const allProductsRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/product`);
        setProducts(response?.data?.data || []);
        setIsDataFetched(true);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching product data:', error);
      }
    };

    if (!isDataFetched) {
      fetchData();
    }
  }, [isDataFetched]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowProducts(false);
        }
      },
      {
        threshold: 0, // Adjust as needed
      }
    );

    if (allProductsRef.current) {
      observer.observe(allProductsRef.current);
    }

    return () => {
      if (allProductsRef.current) {
        observer.unobserve(allProductsRef.current);
      }
    };
  }, []);

  return (
    <>
      <section id='homepage'><Header /><Handcraft /></section>
      <section id='brandandprocess'><OurBrand /> <Process /></section>
      <section id='revolution'><Revolution /></section>
      {showProducts && products.map((item, index) => (
        <section id='products' key={index}>
          <Products item={item} index={index} />
        </section>
      ))}
      <section id='allproducts' ref={allProductsRef}>
        <AllProducts products={products} />
      </section>
      <section id='regexeprience'><Register /> <Experience /></section>
      <section id='map'><Map /></section>
      <section id='ourclient'><OurClients /></section>
      <section id='contactus'><ContactUs /><Footer /></section>
    </>
  );
}

export default App;