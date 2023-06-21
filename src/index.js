import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';

import Home from './components/home/home';
import Header from './components/header/header';
import Footer from './components/footer/footer'
import WebApp from './components/webapp/webapp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Router>
      <Routes>
        <Route path='/' element={<div className='overflow-hidden flex items-center justify-center bg-white align-middle'><Home /></div>} />
        <Route path='/app' element={<WebApp />} />
      </Routes>
    </Router>
    <Footer />
  </React.StrictMode>
);
