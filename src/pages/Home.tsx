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
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProductsAsync(),
          getCategoriesAsync(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="bg-stone-50">
      {/* ================= HERO ================= */}
      <section className="px-4 sm:px-6 lg:px-8 pt-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-stone-900">
            <img
              src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1800&q=80"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              alt="Fresh Ghana produce"
            />

            <div className="relative px-6 py-20 sm:px-12 lg:px-20 max-w-2xl text-white">
              <span className="inline-block mb-4 text-xs tracking-widest uppercase text-white/70">
                Farm to Table
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
                Premium Ghanaian
                <span className="block text-sustaina-yellow">Farm Produce</span>
              </h1>

              {/* <p className="mt-6 text-white/80 text-base sm:text-lg leading-relaxed">
                Carefully sourced from trusted farms across Ghana. Fresh, traceable,
                and delivered with care.
              </p> */}

              <Link
                to="/shop"
                className="inline-flex mt-10 items-center justify-center rounded-full bg-white text-stone-900 px-8 py-4 font-medium hover:bg-stone-100 transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="px-4 sm:px-6 lg:px-8 mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-semibold text-stone-900">
                Seasonal Selection
              </h2>
              <p className="text-stone-500 mt-2">
                Handpicked produce from this week’s harvest
              </p>
            </div>

            <Link
              to="/shop"
              className="hidden sm:inline text-sm font-medium text-stone-700 hover:text-black"
            >
              View all →
            </Link>
          </div>

<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.slice(0, 4).map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          <div className="mt-12 sm:hidden text-center">
            <Link
              to="/shop"
              className="inline-block px-8 py-4 rounded-full border border-stone-300 text-stone-900"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="px-4 sm:px-6 lg:px-8 mt-28 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-stone-900">
              Shop by Category
            </h2>
            <p className="text-stone-500 mt-2">
              Explore our diverse range of fresh produce
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat, i) => (
              <Link
                key={i}
                to={`/shop?category=${cat.name}`}
                className="group relative rounded-2xl overflow-hidden bg-stone-900 aspect-[3/4]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-0 p-4">
                  <p className="text-white font-medium text-lg">
                    {cat.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
