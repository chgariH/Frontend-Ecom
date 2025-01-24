import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // État pour basculer entre Login et Register
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '', // Champ uniquement pour Register
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login
        const response = await axios.post(
          'http://localhost:8083/auth/login',
          { username: formData.username, password: formData.password }
        );
        // Ne pas afficher le token, juste rediriger vers la page home
        // Enregistrez le token dans le localStorage ou state si nécessaire
        // localStorage.setItem('token', response.data.token); // Si vous souhaitez le stocker
        navigate('/home'); // Rediriger vers la page d'accueil après un login réussi
      } else {
        // Register
        const response = await axios.post(
          'http://localhost:8083/auth/register',
          formData
        );
        setMessage('User registered successfully! Redirecting to login...');
        setTimeout(() => {
          setIsLogin(true); // Switch to Login after registration
        }, 2000);
      }
    } catch (err) {
      setMessage(
        isLogin
          ? 'Invalid credentials'
          : 'Registration failed, please try again'
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-teal-500 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        {message && (
          <p className={`text-sm mb-4 ${isLogin ? 'text-red-500' : 'text-teal-500'}`}>
            {message}
          </p>
        )}
        {/* Champ Username */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-teal-300"
            required
          />
        </div>
        {/* Champ Password */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-teal-300"
            required
          />
        </div>
        {/* Champ Role (uniquement pour Register) */}
        {!isLogin && (
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-teal-300"
              required
            />
          </div>
        )}
        {/* Bouton Submit */}
        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
        {/* Bascule Login/Register */}
        <p className="text-sm text-gray-600 text-center mt-4">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <span
                onClick={() => setIsLogin(false)}
                className="text-teal-500 cursor-pointer hover:underline"
              >
                Register here
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setIsLogin(true)}
                className="text-teal-500 cursor-pointer hover:underline"
              >
                Login here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
