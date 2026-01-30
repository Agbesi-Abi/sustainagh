
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../constants';

interface HomeProps {
  onAddToCart: (p: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <div className="relative h-[600px] md:h-[700px] w-full rounded-[3rem] overflow-hidden group shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=2000" 
            alt="Tomatoes Background" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent"></div>
          
          <div className="relative h-full flex flex-col justify-center px-8 md:px-20 text-white max-w-4xl">
            <div className="flex items-center gap-3 mb-6 animate-in slide-in-from-left duration-700">
              <span className="px-4 py-1.5 bg-sustaina-yellow text-stone-900 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">New Harvest Season</span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter animate-in slide-in-from-left duration-1000">
              Fresh, Local <br /><span className="text-sustaina-yellow">Soil-to-Soul.</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-12 text-stone-100/90 max-w-xl leading-relaxed">
              We bridge the gap between Ghana's finest smallholder farms and your kitchen table. Sustainable, traceable, and delicious.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/shop" 
                className="inline-block px-12 py-5 bg-sustaina-yellow text-stone-900 font-black rounded-2xl text-lg hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-stone-900/50"
              >
                Shop the Market
              </Link>
              <Link 
                to="/about" 
                className="inline-block px-12 py-5 bg-white/10 backdrop-blur-md text-white font-black border border-white/20 rounded-2xl text-lg hover:bg-white/20 transition-all"
              >
                Our Farmers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-stone-900 tracking-tight">Shop by Source</h2>
            <p className="text-stone-500 mt-2">Discover curated produce from across Ghana.</p>
          </div>
          <Link to="/shop" className="hidden sm:block text-sustaina-green font-bold hover:underline">View All Produce →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {CATEGORIES.map((cat, i) => (
            <Link 
              key={i} 
              to={`/shop?category=${cat.name}`} 
              className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-transparent to-transparent group-hover:from-sustaina-green/90 transition-colors"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-white font-black text-xl leading-tight block">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* The Sustaina Way (USPs) */}
      <section className="bg-stone-50 py-32 mt-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-20">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-sustaina-green mb-4 block">The Mission</span>
            <h2 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight">The Sustaina Way</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: 'fa-hand-holding-heart', title: 'Direct to Farmer', desc: 'We skip the middlemen. 85% of every cedi goes directly to our smallholder farmer partners.', bg: 'bg-emerald-50', text: 'text-emerald-600' },
              { icon: 'fa-truck-fast', title: 'Carbon-Neutral Loop', desc: 'Our delivery routes are optimized by AI to minimize emissions. Eco-friendly packaging is standard.', bg: 'bg-sustaina-yellow/20', text: 'text-stone-900' },
              { icon: 'fa-award', title: 'Certified Fresh', desc: 'Picked today, at your door tomorrow. We guarantee maximum nutrient density in every bite.', bg: 'bg-blue-50', text: 'text-blue-600' },
            ].map((usp, i) => (
              <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100 text-center">
                <div className={`w-20 h-20 rounded-3xl ${usp.bg} ${usp.text} flex items-center justify-center mx-auto mb-8 text-3xl`}>
                  <i className={`fa-solid ${usp.icon}`}></i>
                </div>
                <h3 className="text-2xl font-black text-stone-900 mb-4">{usp.title}</h3>
                <p className="text-stone-500 leading-relaxed font-medium">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-stone-900 tracking-tight">Seasonal Picks</h2>
            <p className="text-stone-500 mt-2">The best of this week's harvest.</p>
          </div>
          <Link to="/shop" className="text-sustaina-green font-bold hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* Farmer Spotlight */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-32">
        <div className="bg-sustaina-green rounded-[4rem] overflow-hidden flex flex-col lg:flex-row relative">
          <div className="lg:w-1/2 p-12 lg:p-24 text-white relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sustaina-yellow mb-6 block">Farmer of the Month</span>
            <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">Meet Emmanuel <br /> from Techiman.</h2>
            <p className="text-xl text-stone-200/80 mb-12 leading-relaxed">
              "Farming is a legacy. With Sustaina, I can finally focus on soil health instead of worrying about who will buy my tomatoes."
            </p>
            <Link 
              to="/about" 
              className="inline-block px-10 py-4 bg-white text-sustaina-green font-black rounded-2xl hover:bg-sustaina-yellow hover:text-stone-900 transition-all"
            >
              Read His Story
            </Link>
          </div>
          <div className="lg:w-1/2 aspect-square lg:aspect-auto">
            <img 
              src="https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
              alt="Farmer Emmanuel"
            />
          </div>
        </div>
      </section>

      {/* App Stats / Social Proof */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-32 py-20 border-t border-stone-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <h4 className="text-4xl font-black text-stone-900 mb-2">15k+</h4>
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Happy Kitchens</p>
          </div>
          <div>
            <h4 className="text-4xl font-black text-stone-900 mb-2">280</h4>
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Farmer Partners</p>
          </div>
          <div>
            <h4 className="text-4xl font-black text-stone-900 mb-2">GH₵2M</h4>
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Returned to Farms</p>
          </div>
          <div>
            <h4 className="text-4xl font-black text-stone-900 mb-2">94%</h4>
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Eco-Score Avg</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
