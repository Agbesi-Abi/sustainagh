
import React from 'react';
import { CartItem } from '../types';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, q: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full">
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-stone-900 flex items-center">
              <i className="fa-solid fa-basket-shopping mr-2 text-emerald-600"></i>
              Your Fresh Basket
            </h2>
            <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-900">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fa-solid fa-carrot text-stone-300 text-3xl"></i>
                </div>
                <p className="text-stone-500 italic">Your basket is empty. Let's find some fresh local produce!</p>
                <button 
                  onClick={onClose}
                  className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all"
                >
                  Shop Fresh
                </button>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="flex space-x-4 pb-6 border-b border-stone-100 last:border-0">
                  <div className="w-20 h-20 rounded-lg bg-stone-100 overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-stone-900 text-sm">{item.name}</h4>
                      <p className="font-bold text-sm text-emerald-900">GH₵{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3 bg-stone-100 px-3 py-1 rounded-full">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="text-stone-500 hover:text-emerald-700"
                        >
                          <i className="fa-solid fa-minus text-xs"></i>
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="text-stone-500 hover:text-emerald-700"
                        >
                          <i className="fa-solid fa-plus text-xs"></i>
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-xs text-rose-500 hover:text-rose-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 space-y-4 bg-stone-50">
              <div className="flex justify-between items-center text-stone-600 text-sm">
                <span>Supporting local farmers:</span>
                <span className="text-emerald-600 font-bold flex items-center">
                  <i className="fa-solid fa-hand-holding-heart mr-1"></i>
                  Direct-to-farm
                </span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg text-stone-900">
                <span>Subtotal</span>
                <span>GH₵{subtotal.toFixed(2)}</span>
              </div>
              <Link 
                to="/checkout" 
                onClick={onClose}
                className="block w-full text-center py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
              >
                Proceed to Checkout
              </Link>
              <p className="text-center text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                Freshness guaranteed or your money back
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
