import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

const Navbar = () => {
  const navigate = useNavigate(); // Hook pour la navigation

  const handleNavigate = (path) => {
    navigate(path); // Rediriger vers le chemin spécifié
  };

  const handleLogout = () => {
    // Suppression du token ou autres données utilisateur (si nécessaires)
    localStorage.removeItem('authToken'); // Exemple si vous stockez un token
    navigate('/auth'); // Rediriger vers la page d'authentification
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-teal-500 cursor-pointer"
        onClick={() => handleNavigate('/home')} // Exemple : rediriger vers la page d'accueil
      >
        Ecom-Hamza
      </div>

      {/* Navbar Links */}
      <div className="flex space-x-6">
        <button
          className="text-teal-500 font-semibold hover:text-teal-600 focus:outline-none"
          onClick={() => handleNavigate('/products')} // Redirige vers la page des produits
        >
          Products
        </button>
        <button
          className="text-teal-500 font-semibold hover:text-teal-600 focus:outline-none"
          onClick={() => handleNavigate('/orders')} // Redirige vers la page des commandes
        >
          Orders
        </button>
        <button
          className="text-teal-500 font-semibold hover:text-teal-600 focus:outline-none"
          onClick={() => handleNavigate('/addproduct')} // Redirige vers la page d'ajout de produits
        >
          Add Products
        </button>
      </div>

      {/* Connexion & Logout */}
      <div className="flex space-x-4">
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          onClick={() => handleNavigate('/auth')} // Redirige vers la page de connexion
        >
          Connexion
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleLogout} // Déconnecte et redirige vers la page de connexion
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
