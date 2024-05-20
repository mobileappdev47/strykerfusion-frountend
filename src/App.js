import React from 'react';
import './App.css';
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
  

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route exec element={<PrivateRoutes />}>
              <Route element={<Layout />}>
                {/* <Route path="/admin/home" element={<HomeAd />} />
                <Route path="/admin/product" element={<ProductAd />} />
                <Route path="/admin/process" element={<ProcessAd />} />
                <Route path="/admin/experience" element={<ExperienceAd />} />
                <Route path="/admin/brand" element={<BrandAd />} />
                <Route path="/admin/client" element={<ClientAd />} />
                <Route path="/admin/location" element={<LocationAd />} />
                <Route path="/admin/contact" element={<ContactAd />} />
                <Route path="/admin/possible" element={<PossibleAd />} />
                <Route path="/admin/revolution" element={<RevolutionAd />} /> */}
              </Route>
            </Route>
            {/* <Route path="/admin/login" element={<LoginAd />} /> */}
            <Route path='/' element={<Main />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;