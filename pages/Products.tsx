
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../constants';

interface ProductsProps {
  onAddToCart: (p: Product) => void;
}

const Products: React.FC<ProductsProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  // Clear category if searching
  useEffect(() => {
    if (searchQuery) {
      setActiveCategory('All');
    }
  }, [searchQuery]);

  const filteredProducts = PRODUCTS
    .filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery) || 
        p.description.toLowerCase().includes(searchQuery) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'score') return b.sustainabilityScore - a.sustainabilityScore;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header & Search Summary */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 tracking-tight">
          {searchQuery ? `Results for "${searchQuery}"` : 'The Sustaina Market'}
        </h1>
        <p className="text-stone-500 mt-1">Showing {filteredProducts.length} local items found</p>
      </div>

      {/* Filter & Sort Bar */}
      <div className="sticky top-[80px] z-30 bg-[#fdfdfd]/80 backdrop-blur-md -mx-4 px-4 py-4 mb-8 border-b border-stone-100 md:relative md:top-0 md:bg-transparent md:border-none md:p-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <button
              onClick={() => setActiveCategory('All')}
              className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeCategory === 'All'
                  ? 'bg-sustaina-green text-white border-sustaina-green shadow-lg shadow-sustaina-green/20'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-sustaina-green hover:text-sustaina-green'
              }`}
            >
              All Items
            </button>
            {CATEGORIES.map(cat => {
              const count = PRODUCTS.filter(p => p.category === cat.name || (cat.name === 'Fresh Vegetables' && p.category === 'Vegetables')).length;
              // Simple mapping check
              const realCatName = cat.name === 'Fresh Vegetables' ? 'Vegetables' : cat.name;

              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(realCatName)}
                  className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border flex items-center gap-2 ${
                    activeCategory === realCatName
                      ? 'bg-sustaina-green text-white border-sustaina-green shadow-lg shadow-sustaina-green/20'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-sustaina-green hover:text-sustaina-green'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Sort Control */}
          <div className="flex items-center shrink-0">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-stone-200 shadow-sm">
              <i className="fa-solid fa-arrow-down-wide-short text-stone-400 text-xs"></i>
              <label className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest hidden sm:inline">Sort By</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm font-bold text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="score">Sustainability Score</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Banner Sidebar */}
        <aside className="hidden lg:block w-64 space-y-6 shrink-0">
          <div className="p-6 bg-sustaina-green rounded-2xl text-white relative overflow-hidden group">
            <i className="fa-solid fa-seedling absolute -right-4 -bottom-4 text-white/10 text-8xl transition-transform group-hover:scale-110"></i>
            <h4 className="font-bold text-lg mb-3">Freshness Guarantee</h4>
            <p className="text-xs text-white/80 leading-relaxed mb-6">
              Every item is harvested within 24 hours of delivery. We support 100% organic local methods.
            </p>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[2rem] border border-dashed border-stone-200">
              <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-magnifying-glass text-stone-200 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">No items found</h3>
              <p className="text-stone-500 max-w-xs mx-auto">Try a different search term or select another category.</p>
            </div>
          )}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default Products;
