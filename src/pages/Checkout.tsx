
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
// import { db } from '../lib/firebase';
// import * as firebaseFirestoreExports from 'firebase/firestore';

// const { collection, addDoc, serverTimestamp } = firebaseFirestoreExports as any;

interface CheckoutProps {
  items: CartItem[];
  clearCart: () => void;
  user: any | null;
}

const Checkout: React.FC<CheckoutProps> = ({ items, clearCart, user }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.displayName?.split(' ')[0] || '',
    lastName: user?.displayName?.split(' ')[1] || '',
    momoNumber: '',
    address: '',
    region: 'Greater Accra'
  });
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = total > 200 ? 0 : 25.00;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      /*
      // Save order to Firestore
      const orderData = {
        userId: user?.uid || 'guest',
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: user?.email || 'guest@sustaina.com',
        items: items.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price })),
        total: total + shipping,
        shipping,
        address: formData.address,
        region: formData.region,
        momoNumber: formData.momoNumber,
        status: 'Pending',
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, "orders"), orderData);
      */

      // Simulate a small delay for "payment processing"
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Order failed", error);
      alert("Something went wrong with your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center animate-in fade-in duration-700">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <i className="fa-solid fa-check text-4xl"></i>
        </div>
        <h1 className="text-4xl font-bold text-stone-900 mb-4">Freshness on the way!</h1>
        <p className="text-lg text-stone-600 mb-8">
          Your order has been confirmed and stored in our network. Our delivery team will be at your doorstep within 4-6 hours (Accra/Tema).
        </p>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg"
        >
          Return to Market
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fa-solid fa-basket-shopping text-stone-300"></i>
        </div>
        <h1 className="text-2xl font-bold text-stone-900 mb-4">Your basket is empty.</h1>
        <button 
          onClick={() => navigate('/shop')}
          className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all"
        >
          Go to Market
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-stone-900 tracking-tight">Checkout</h1>
        <p className="text-stone-500 mt-2">Almost there! Complete your order details below.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-3">
              <span className="w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center text-sm">1</span>
              Delivery Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" placeholder="First Name" required className="p-4 bg-white border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all" />
              <input name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" placeholder="Last Name" required className="p-4 bg-white border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all" />
            </div>
            <input name="momoNumber" value={formData.momoNumber} onChange={handleInputChange} type="tel" placeholder="Mobile Money Number (MTN / Telecel / AT)" required className="w-full p-4 bg-white border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all" />
            <input name="address" value={formData.address} onChange={handleInputChange} type="text" placeholder="Street / Digital Address (e.g. GA-123-4567)" required className="w-full p-4 bg-white border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all" />
            <select name="region" value={formData.region} onChange={handleInputChange} required className="w-full p-4 bg-white border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none cursor-pointer">
                <option value="Greater Accra">Greater Accra</option>
                <option value="Ashanti">Ashanti</option>
                <option value="Central">Central</option>
                <option value="Western">Western</option>
                <option value="Eastern">Eastern</option>
                <option value="Northern">Northern</option>
            </select>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-3">
              <span className="w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center text-sm">2</span>
              Payment Method
            </h2>
            <div className="p-8 border-2 border-emerald-600 bg-emerald-50 rounded-3xl relative overflow-hidden group">
              <i className="fa-solid fa-mobile-screen absolute -right-4 -bottom-4 text-emerald-100 text-8xl -rotate-12 transition-transform group-hover:scale-110"></i>
              <div className="relative z-10 flex items-center justify-between mb-4">
                <span className="font-black text-emerald-900 uppercase tracking-widest text-sm">Mobile Money (Momo)</span>
                <div className="flex gap-1">
                  <div className="w-8 h-4 bg-amber-400 rounded-sm"></div>
                  <div className="w-8 h-4 bg-rose-500 rounded-sm"></div>
                </div>
              </div>
              <p className="relative z-10 text-sm text-emerald-800/70 leading-relaxed">
                You will receive a <strong>direct authorization prompt</strong> on your mobile device to complete the GH₵{(total + shipping).toFixed(2)} payment.
              </p>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isProcessing}
            className="w-full py-6 bg-sustaina-green text-white rounded-[2rem] font-black text-xl hover:bg-black transition-all disabled:opacity-50 shadow-2xl shadow-sustaina-green/20"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-4">
                <i className="fa-solid fa-spinner animate-spin"></i>
                Processing...
              </span>
            ) : (
              `Pay GH₵${(total + shipping).toFixed(2)}`
            )}
          </button>
        </form>

        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white p-10 rounded-[3rem] border border-stone-200 shadow-xl shadow-stone-200/20">
            <h2 className="text-2xl font-black text-stone-900 mb-8 tracking-tight">Basket Summary</h2>
            <div className="space-y-6 mb-10">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-50 border border-stone-100">
                      <img src={item.image} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-stone-900 block">{item.name}</span>
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-black text-stone-900">GH₵{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 pt-10 border-t border-stone-100">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-stone-400 uppercase tracking-widest">Subtotal</span>
                <span className="text-stone-900">GH₵{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span className="text-stone-400 uppercase tracking-widest">Eco-Delivery</span>
                <span className="text-stone-900">{shipping === 0 ? <span className="text-emerald-600">FREE</span> : `GH₵${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-2xl font-black pt-6 text-stone-900">
                <span className="tracking-tight">Total Due</span>
                <span className="text-emerald-600">GH₵{(total + shipping).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-10 p-4 bg-emerald-50 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
                <i className="fa-solid fa-leaf"></i>
              </div>
              <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">You're supporting 4 local farms with this order!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
