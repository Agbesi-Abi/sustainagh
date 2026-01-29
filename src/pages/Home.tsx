import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { getProductsAsync, getCategoriesAsync } from '../../constants';

interface HomeProps {
  onAddToCart: (p: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ name: string; image: string }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProductsAsync(),
          getCategoriesAsync()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);
  return (
    <div className="pb-16">
      {/* Compact Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <div className="relative h-[400px] w-full rounded-3xl overflow-hidden group shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=1800" 
            alt="Fresh produce from Ghana" 
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/85 via-stone-900/50 to-transparent"></div>
          
          <div className="relative h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 text-white max-w-xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Fresh from Ghana's <span className="text-sustaina-yellow">Finest Farms</span>
            </h1>
            <p className="text-base md:text-lg text-stone-100/90 mb-8 leading-relaxed">
              Sustainable, traceable produce delivered to your kitchen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                to="/shop" 
                className="inline-flex items-center justify-center px-8 py-3.5 bg-sustaina-yellow text-stone-900 font-bold rounded-xl hover:bg-white hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-lg"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid - More Accessible */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-stone-900">Shop Categories</h2>
            <p className="text-stone-600 mt-2">Curated produce from local farms</p>
          </div>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 text-sustaina-green font-semibold hover:gap-3 transition-all"
          >
            Browse all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={i}
              to={`/shop?category=${cat.name}`}
              className="group"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-sm hover:shadow-md transition-all duration-300">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white font-semibold text-lg">{cat.name}</span>
                  <div className="h-0.5 w-6 bg-sustaina-yellow mt-2 transform translate-y-1 opacity-0 group-hover:translate-y-2 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products - Cleaner Design */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-stone-900">Featured Products</h2>
            <p className="text-stone-600 mt-2">This week's top picks</p>
          </div>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 text-sustaina-green font-semibold hover:gap-3 transition-all"
          >
            View all products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              className="hover:shadow-lg transition-shadow duration-300"
            />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      {/* <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-20">
        <div className="rounded-2xl bg-stone-50 p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-sustaina-green mb-2">100+</div>
              <div className="text-stone-600">Local Farms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sustaina-green mb-2">24h</div>
              <div className="text-stone-600">Fresh Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sustaina-green mb-2">Traceable</div>
              <div className="text-stone-600">Supply Chain</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sustaina-green mb-2">Eco-Friendly</div>
              <div className="text-stone-600">Packaging</div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;