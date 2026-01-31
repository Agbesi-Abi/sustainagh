
import React from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="flex flex-col bg-white rounded-xl border border-stone-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden bg-stone-50 relative">
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-300" />
      </Link>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-lg text-stone-900 leading-tight group-hover:text-sustaina-green transition-colors">{product.name}</h3>
            {product.originalPrice && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">SALE</span>
            )}
          </div>
          <p className="text-sm text-stone-500 line-clamp-2">{product.description}</p>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-4">
            <p className="text-lg font-bold text-stone-900">GH₵{product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-xs text-stone-400 line-through">GH₵{product.originalPrice.toFixed(2)}</p>
            )}
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full py-3 bg-sustaina-green text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 active:scale-[0.98] transition-all"
          >
            <i className="fa-solid fa-cart-plus"></i>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
