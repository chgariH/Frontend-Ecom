import React from 'react';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-6">
      {/* Nom de l'application */}
      <h1 className="text-5xl font-extrabold text-teal-600 mb-6">
        Bienvenue sur <span className="text-teal-500">Ecom-Hamza</span>
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-700 text-center max-w-3xl leading-relaxed mb-10">
        Ecom-Hamza est votre plateforme idéale pour la vente de produits digitaux. 
        Découvrez une large gamme de technologies innovantes qui répondent à tous vos besoins, 
        de la simplicité à l'excellence. Nous vous accompagnons pour réussir dans le monde du e-commerce !
      </p>

      {/* Illustration ou Call-to-Action */}
      <div className="flex flex-col items-center space-y-6">
      
        <button className="bg-teal-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-teal-600 transition">
          Explorer nos produits
        </button>
      </div>
    </div>
  );
};

export default Home;
