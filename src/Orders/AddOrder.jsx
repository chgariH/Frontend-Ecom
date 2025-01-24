import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AddOrder = () => {
  const location = useLocation();
  const product = location.state?.product;

  
  const [order, setOrder] = useState({
    orderId: "", 
    orderDate: "",
    orderTime: "",
    quantity: 1,
    totalPrice: product?.price || 0,
    productId: product?.id || null,
  });

  
  const getNextOrderId = () => {
    const lastOrderId = localStorage.getItem("lastOrderId");
    const nextOrderId = lastOrderId ? parseInt(lastOrderId) + 1 : 1; 
    localStorage.setItem("lastOrderId", nextOrderId); 
    return `ORD-${nextOrderId}`;
  };

  useEffect(() => {
    if (product) {
      
      const currentDate = new Date();
      const date = currentDate.toISOString().split("T")[0]; 
      const time = currentDate.toTimeString().split(" ")[0]; 

   
      const orderId = getNextOrderId();

      setOrder((prevOrder) => ({
        ...prevOrder,
        orderId, 
        orderDate: date,
        orderTime: time,
      }));
    }
  }, [product]);

  if (!product) {
    return <div className="p-6 text-red-500">Aucun produit sélectionné.</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
      totalPrice: name === "quantity" ? value * product.price : prevOrder.totalPrice,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8082/addorders", order);
      console.log("Order created successfully:", response.data);
      alert("Commande ajoutée avec succès !");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Erreur lors de la création de la commande.");
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-2xl space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={`data:${product.imageType};base64,${product.image}`}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg shadow-lg"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-bold text-green-600">{product.price} DH</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold">Date</label>
              <input
                type="date"
                name="orderDate"
                value={order.orderDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Heure</label>
              <input
                type="time"
                name="orderTime"
                value={order.orderTime}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold">Quantité</label>
              <input
                type="number"
                name="quantity"
                value={order.quantity}
                onChange={handleInputChange}
                min="1"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Prix Total</label>
              <input
                type="text"
                value={`${order.totalPrice} DH`}
                disabled
                className="w-full px-4 py-2 border-2 bg-gray-100 text-gray-500 rounded-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg hover:from-teal-600 hover:to-teal-500 transition-all text-lg font-semibold"
          >
            Confirmer la commande
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOrder;
