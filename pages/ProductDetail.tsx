
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface ProductDetailProps {
  onAddToCart: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const found = PRODUCTS.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setSelectedImage(found.image);
    } else {
      navigate('/shop');
    }
  }, [id, navigate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.8)'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center',
      transform: 'scale(1)'
    });
  };

  if (!product) return null;

  const gallery = product.gallery || [product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Gallery & Zoom Section */}
        <div className="space-y-6">
          <div 
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 cursor-zoom-in group relative"
          >
            <img 
              src={selectedImage} 
              alt={product.name} 
              style={zoomStyle}
              className="w-full h-full object-cover transition-transform duration-200 ease-out"
            />
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
              <i className="fa-solid fa-magnifying-glass-plus"></i>
              Hover to Zoom
            </div>
          </div>
          
          {/* Gallery Thumbnails */}
          {gallery.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {gallery.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedImage(img)}
                  className={`relative shrink-0 w-24 aspect-square bg-stone-100 rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
                    selectedImage === img ? 'border-sustaina-green scale-95 shadow-lg' : 'border-transparent hover:border-stone-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  {selectedImage === img && (
                    <div className="absolute inset-0 bg-sustaina-green/10" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info & Purchase Section */}
        <div className="flex flex-col py-2">
          <div className="flex items-center space-x-2 text-sustaina-green font-bold text-xs uppercase tracking-widest mb-2">
            <i className="fa-solid fa-leaf"></i>
            <span>Fresh {product.category}</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-black text-stone-900 mb-4 tracking-tight">{product.name}</h1>
          
          <div className="flex items-baseline gap-4 mb-6">
            <p className="text-3xl font-black text-emerald-600">GH₵{product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-lg text-stone-400 line-through">GH₵{product.originalPrice.toFixed(2)}</p>
            )}
          </div>
          
          <p className="text-stone-600 leading-relaxed text-lg mb-8">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
            <div className="flex bg-stone-100 rounded-2xl p-1 w-full sm:w-auto">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-14 h-14 flex items-center justify-center hover:bg-white rounded-xl transition-all text-stone-500 hover:text-stone-900"
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <span className="w-16 flex items-center justify-center font-black text-xl text-stone-900">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="w-14 h-14 flex items-center justify-center hover:bg-white rounded-xl transition-all text-stone-500 hover:text-stone-900"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <button 
              onClick={() => {
                for(let i=0; i<quantity; i++) onAddToCart({ ...product });
              }}
              className="w-full flex-1 h-16 bg-sustaina-green text-white rounded-[2rem] font-black text-lg hover:bg-black transition-all shadow-xl shadow-sustaina-green/20 flex items-center justify-center gap-3"
            >
              <i className="fa-solid fa-basket-shopping"></i>
              Add to Basket — GH₵{(product.price * quantity).toFixed(2)}
            </button>
          </div>

          <div className="space-y-6 pt-10 border-t border-stone-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-truck-fast text-xs"></i>
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-stone-900">Delivery</span>
                </div>
                <p className="text-[10px] text-stone-500 font-bold leading-relaxed">Same day delivery available for orders placed before 12 PM in Accra.</p>
              </div>

              <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-shield-halved text-xs"></i>
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-stone-900">Guarantee</span>
                </div>
                <p className="text-[10px] text-stone-500 font-bold leading-relaxed">100% fresh or your money back. We guarantee farm-to-door quality.</p>
              </div>
            </div>

            <div className="bg-sustaina-green/5 rounded-[2.5rem] p-8 border border-sustaina-green/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-black text-stone-900 tracking-tight">Eco-Impact Rating</h3>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Sustainability Dashboard</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-sustaina-green">
                    {product.sustainabilityScore}
                  </span>
                  <span className="text-sm font-bold text-stone-400">/100</span>
                </div>
              </div>
              
              <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden mb-6">
                <div 
                  className="h-full bg-sustaina-green transition-all duration-1000" 
                  style={{ width: `${product.sustainabilityScore}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <i className="fa-solid fa-cloud-sun text-emerald-600 mb-2"></i>
                  <p className="text-[8px] font-black uppercase text-stone-400">Carbon Footprint</p>
                  <p className="text-[10px] font-bold text-stone-900">Ultra Low</p>
                </div>
                <div className="text-center">
                  <i className="fa-solid fa-droplet text-emerald-600 mb-2"></i>
                  <p className="text-[8px] font-black uppercase text-stone-400">Water Usage</p>
                  <p className="text-[10px] font-bold text-stone-900">Optimized</p>
                </div>
                <div className="text-center">
                  <i className="fa-solid fa-boxes-packing text-emerald-600 mb-2"></i>
                  <p className="text-[8px] font-black uppercase text-stone-400">Packaging</p>
                  <p className="text-[10px] font-bold text-stone-900">Recyclable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
