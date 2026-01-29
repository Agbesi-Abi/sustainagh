
import React from 'react';
import { PRODUCTS } from '../../constants';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface DealsProps {
  onAddToCart: (p: Product) => void;
}

const Deals: React.FC<DealsProps> = ({ onAddToCart }) => {
  const deals = PRODUCTS.filter(p => p.originalPrice);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="bg-sustaina-yellow/10 rounded-[3rem] p-12 mb-16 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-4 py-2 bg-sustaina-yellow text-stone-900 font-bold rounded-full text-xs uppercase tracking-widest mb-6">Market Surplus Deals</span>
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-6 leading-tight">Save on Freshness, Reduce Food Waste.</h1>
          <p className="text-lg text-stone-600">Our deals feature high-quality surplus produce from our partner farms. By buying these, you help farmers reduce waste and get amazing prices.</p>
        </div>
        <i className="fa-solid fa-tag absolute top-1/2 -right-10 -translate-y-1/2 text-sustaina-yellow/10 text-[20rem] rotate-12"></i>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {deals.map(product => (
          <div key={product.id} className="relative">
            <div className="absolute top-4 left-4 z-10 bg-rose-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              Save {Math.round((1 - product.price / (product.originalPrice || 1)) * 100)}%
            </div>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
      
      {deals.length === 0 && (
        <div className="text-center py-32">
          <p className="text-stone-500 italic">No surplus deals today. Check back tomorrow!</p>
        </div>
      )}
    </div>
  );
};

export default Deals;
