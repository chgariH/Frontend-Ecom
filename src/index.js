import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Navbar'; // Navbar visible sur toutes les pages sauf Auth
import Home from './Home'; 
import AddProduct from './Products/AddProduct';
import ProductList from './Products/ProductList';
import AddOrder from './Orders/AddOrder';
import AuthPage from './AuthPage'; // Page d'authentification
import OrdersPage from './Orders/OrdersPage';

const App = () => {
  const location = useLocation();

  // Vérifier si la page actuelle est la page de connexion
  const isAuthPage = location.pathname === '/' || location.pathname === '/auth';

  return (
    <div>
      {!isAuthPage && <Navbar />} {/* Affiche Navbar sauf si on est sur AuthPage */}
      <Routes>
        <Route path="/" element={<AuthPage />} /> {/* Page d'authentification par défaut */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/addOrder" element={<AddOrder />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
