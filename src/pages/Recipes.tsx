
import React from 'react';
import { RECIPES, PRODUCTS } from '../../constants';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface RecipesProps {
  onAddToCart: (p: Product) => void;
}

const Recipes: React.FC<RecipesProps> = ({ onAddToCart }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-stone-900 mb-4">Farm-to-Table Recipes</h1>
        <p className="text-stone-500 max-w-xl">Learn how to make the best of your fresh Ghanaian produce with our curated collection of traditional and modern recipes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {RECIPES.map(recipe => (
          <div key={recipe.id} className="bg-white rounded-[2.5rem] border border-stone-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
            <div className="aspect-[16/9] overflow-hidden relative">
              <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-4 py-2 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-stone-900 shadow-sm">{recipe.prepTime}</span>
                <span className="px-4 py-2 bg-sustaina-green text-white rounded-full text-xs font-bold shadow-sm">{recipe.difficulty}</span>
              </div>
            </div>
            
            <div className="p-8 md:p-10">
              <h2 className="text-2xl font-bold text-stone-900 mb-4">{recipe.name}</h2>
              <p className="text-stone-600 mb-8 leading-relaxed">{recipe.description}</p>
              
              <div className="mb-8">
                <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-widest mb-4">Required Ingredients</h3>
                <div className="flex flex-wrap gap-3">
                  {recipe.ingredients.map(prodId => {
                    const product = PRODUCTS.find(p => p.id === prodId);
                    if (!product) return null;
                    return (
                      <div key={prodId} className="flex items-center gap-3 bg-stone-50 p-2 pr-2 rounded-xl border border-stone-100 group/item hover:border-sustaina-green/30 hover:bg-white transition-all">
                        <Link 
                          to={`/product/${product.id}`} 
                          className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-grow"
                          title={`View ${product.name}`}
                        >
                          <img src={product.image} alt={product.name} className="w-8 h-8 rounded-lg object-cover shadow-sm" />
                          <span className="text-xs font-bold text-stone-700 group-hover/item:text-sustaina-green transition-colors">{product.name}</span>
                        </Link>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            onAddToCart(product);
                          }}
                          className="ml-2 w-7 h-7 bg-sustaina-green text-white rounded-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shrink-0 shadow-sm"
                          title={`Add ${product.name} to basket`}
                        >
                          <i className="fa-solid fa-plus text-[10px]"></i>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-widest mb-2">Instructions</h3>
                {recipe.instructions.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="shrink-0 w-6 h-6 bg-sustaina-yellow/20 text-sustaina-yellow rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                    <p className="text-sm text-stone-600 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
