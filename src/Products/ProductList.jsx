import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyNow = (product) => {
    navigate("/addOrder", { state: { product } });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl overflow-hidden relative"
        >
          <div className="relative w-full h-72">
            <img
              src={`data:${product.imageType};base64,${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover transform transition-all duration-300 hover:scale-110"
            />
            {product.isOnSale && (
              <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold py-2 px-4 rounded-br-xl">
                -{product.discountPercentage}%
              </span>
            )}
          </div>
          <div className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
          </div>
          <div className="p-6 pt-0 flex justify-between items-center">
            <span className="text-xl font-semibold text-gray-900">{product.price} DH</span>
            <button
              onClick={() => handleBuyNow(product)}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded-lg hover:from-green-600 hover:to-green-500 transition-all duration-300 flex items-center justify-center text-sm"
            >
              <FaShoppingCart className="mr-2 text-lg" />
              <span>Acheter</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
