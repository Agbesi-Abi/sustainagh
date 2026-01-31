import React from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
      
      {/* Image */}
      <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Sale badge */}
        {product.originalPrice && (
          <span className="absolute top-4 left-4 text-[10px] tracking-wide uppercase bg-black/70 text-white px-3 py-1 rounded-full backdrop-blur">
            Sale
          </span>
        )}

        {/* Hover Add to Cart */}
        <button
          onClick={() => onAddToCart(product)}
          className="absolute inset-x-4 bottom-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-white/90 backdrop-blur-md text-stone-900 rounded-full py-3 text-sm font-medium shadow-lg hover:bg-white"
        >
          Add to Cart
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-medium text-stone-900 leading-snug truncate">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-semibold text-stone-900">
            GH₵{product.price.toFixed(2)}
          </span>

          {product.originalPrice && (
            <span className="text-sm text-stone-400 line-through">
              GH₵{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
