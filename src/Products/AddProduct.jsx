import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      name,
      price: parseFloat(price),
      description,
    };

    const formData = new FormData();
    formData.append("products", JSON.stringify(productData));
    formData.append("imageFile", imageFile);

    try {
      const response = await axios.post(
        "http://localhost:8081/addproduct",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Product added successfully!");
      console.log("Product added:", response.data);
      setName("");
      setPrice("");
      setDescription("");
      setImageFile(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grille de deux colonnes pour Name et Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Price (DH)</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <span className="px-2 text-gray-700">DH</span>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter product price"
                  className="w-full p-2 text-sm border-none focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="2"
              required
            ></textarea>
          </div>

          {/* Image File */}
          <div>
            <label className="block text-gray-700 font-medium">Product Image</label>
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
              accept="image/*"
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Bouton de Soumission - Taille Moyenne et Style élégant */}
          <button
            type="submit"
            className={`w-full py-2 px-6 text-white rounded-lg transition-colors duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
