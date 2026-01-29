
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-48 h-48 bg-emerald-50 rounded-full flex items-center justify-center mb-10 animate-bounce duration-[3000ms]">
        <i className="fa-solid fa-seedling text-8xl text-sustaina-green"></i>
      </div>
      <h1 className="text-6xl font-black text-stone-900 mb-6 tracking-tight">404</h1>
      <h2 className="text-2xl font-bold text-stone-600 mb-8">Eish! This plot of land is empty.</h2>
      <p className="max-w-md text-stone-400 mb-12 font-medium">
        We couldn't find the page you're looking for. It might have been harvested already or never planted.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/" 
          className="px-10 py-4 bg-sustaina-green text-white font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-sustaina-green/20"
        >
          Back to Market
        </Link>
        <Link 
          to="/shop" 
          className="px-10 py-4 border-2 border-stone-200 text-stone-900 font-black rounded-2xl hover:bg-stone-50 transition-all"
        >
          Shop Produce
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
