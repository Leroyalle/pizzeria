import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './scss/app.scss';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { ErrorDisplay } from './components/ErrorDisplay';
function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<ErrorDisplay type={'notFound'} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
