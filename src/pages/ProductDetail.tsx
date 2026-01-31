import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../lib/firestore';
import { Product } from '../types';

interface ProductDetailProps {
  onAddToCart: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    getProductById(id)
      .then(p => {
        if (!p) return navigate('/shop');
        setProduct(p);
        setSelectedImage(p.image);
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) return null;

  const gallery = product.gallery || [product.image];

  return (
    <main className="bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* ===== IMAGE COLUMN ===== */}
          <div className="space-y-6">
            <div
              ref={imageRef}
              className="aspect-square max-h-[520px] bg-white rounded-3xl overflow-hidden shadow-sm"
            >
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {gallery.length > 1 && (
              <div className="flex gap-4">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 aspect-square rounded-xl overflow-hidden ${
                      selectedImage === img
                        ? 'ring-2 ring-stone-900'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ===== INFO COLUMN ===== */}
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-stone-500 mb-3">
              {product.category}
            </span>

            <h1 className="text-4xl lg:text-5xl font-semibold text-stone-900 leading-tight">
              {product.name}
            </h1>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-2xl font-medium text-stone-900">
                GH₵{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-stone-400 line-through">
                  GH₵{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="mt-8 text-stone-600 leading-relaxed max-w-xl">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mt-10 flex items-center gap-6">
              <div className="flex items-center bg-white rounded-full shadow-sm">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-12 h-12 text-stone-500 hover:text-black"
                >
                  −
                </button>
                <span className="w-12 text-center font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-12 h-12 text-stone-500 hover:text-black"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) onAddToCart(product);
              }}
              className="mt-10 h-16 rounded-full bg-stone-900 text-white font-medium hover:bg-black transition"
            >
              Add to Cart — GH₵{(product.price * quantity).toFixed(2)}
            </button>

            {/* Trust */}
            <div className="mt-16 grid grid-cols-2 gap-8 text-sm text-stone-500">
              <div>
                <p className="font-medium text-stone-900 mb-1">Fast Delivery</p>
                <p>Same-day delivery in Accra</p>
              </div>
              <div>
                <p className="font-medium text-stone-900 mb-1">Fresh Guarantee</p>
                <p>100% farm-to-door quality</p>
              </div>
            </div>

            {/* Sustainability */}
            <div className="mt-16 bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between mb-4">
                <span className="font-medium text-stone-900">
                  Sustainability Score
                </span>
                <span className="font-medium">
                  {product.sustainabilityScore}/100
                </span>
              </div>
              <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600"
                  style={{ width: `${product.sustainabilityScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
