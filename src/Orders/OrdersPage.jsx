import React, { useState, useEffect } from "react";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8082/orders");
        setOrders(response.data); // Assurez-vous que la réponse contient les données des commandes
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes:", error);
        setError("Une erreur s'est produite lors de la récupération des commandes.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-teal-500">
        Chargement des commandes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Liste des commandes</h2>
      
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">Aucune commande trouvée.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="px-4 py-2 border">ID Commande</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Heure</th>
                <th className="px-4 py-2 border">Produit</th>
                <th className="px-4 py-2 border">Quantité</th>
                <th className="px-4 py-2 border">Prix Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId} className="border-b">
                  <td className="px-4 py-2 text-center">{order.orderId}</td>
                  <td className="px-4 py-2 text-center">{order.orderDate}</td>
                  <td className="px-4 py-2 text-center">{order.orderTime}</td>
                  <td className="px-4 py-2 text-center">{order.product.name}</td>
                  <td className="px-4 py-2 text-center">{order.quantity}</td>
                  <td className="px-4 py-2 text-center">{order.totalPrice} DH</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
