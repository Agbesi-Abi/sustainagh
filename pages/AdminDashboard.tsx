
import React, { useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Product } from '../types';
import { GoogleGenAI } from "@google/genai";
// import { db } from '../lib/firebase';
// import * as firebaseFirestoreExports from 'firebase/firestore';

// const { collection, query, orderBy, limit, onSnapshot, doc, updateDoc } = firebaseFirestoreExports as any;

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'farmers'>('overview');
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [liveOrders, setLiveOrders] = useState<any[]>([]);

  useEffect(() => {
    /*
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot: any) => {
      const orders = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
      setLiveOrders(orders);
    });
    return () => unsubscribe();
    */
  }, []);

  const fetchAiAdvice = async () => {
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-3-flash-preview';
      const prompt = `
        As a business consultant for Sustaina Ghana. 
        Recent orders: ${liveOrders.length} in last session. 
        Stock highlights: ${PRODUCTS.slice(0, 3).map(p => p.name).join(', ')}.
        Suggest one high-impact operational strategy to increase our farmer network's efficiency in the next 30 days.
        Keep it to 2-3 sentences. Professional.
      `;
      const response = await ai.models.generateContent({ model, contents: prompt });
      setAiAdvice(response.text || 'No advice available right now.');
    } catch (e) {
      setAiAdvice('Eish, I couldn\'t reach the advisor. Check your connection!');
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'overview' && !aiAdvice) {
      fetchAiAdvice();
    }
  }, [activeTab]);

  const handleUpdateStatus = async (orderId: string, status: string) => {
    /*
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status });
    */
    setLiveOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-72 bg-sustaina-green text-white p-6 shrink-0 md:h-screen md:sticky md:top-0 flex flex-col shadow-2xl z-40">
        <div className="flex items-center space-x-3 mb-10 px-2">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
            <i className="fa-solid fa-leaf text-sustaina-yellow"></i>
          </div>
          <div>
            <span className="text-xl font-black tracking-tight">Sustaina</span>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Admin Control</p>
          </div>
        </div>

        <nav className="space-y-2 flex-grow">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: 'fa-chart-line' },
            { id: 'products', label: 'Inventory Management', icon: 'fa-boxes-stacked' },
            { id: 'orders', label: 'Live Orders', icon: 'fa-bag-shopping' },
            { id: 'farmers', label: 'Farmer Network', icon: 'fa-seedling' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                ? 'bg-white text-sustaina-green font-bold shadow-lg shadow-black/10' 
                : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <i className={`fa-solid ${item.icon} w-5 text-center ${activeTab === item.id ? 'text-sustaina-green' : 'text-white/40 group-hover:text-white/80'}`}></i>
                <span className="text-sm font-bold">{item.label}</span>
              </div>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10">
          <div className="p-5 bg-white/5 rounded-3xl border border-white/10">
             <div className="flex items-center gap-2 mb-3">
               <i className="fa-solid fa-cloud-arrow-up text-emerald-400 text-xs"></i>
               <span className="text-[10px] font-black uppercase tracking-widest">Sync Active</span>
             </div>
             <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-emerald-400"></div>
             </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-1">
              <span>Market Management</span>
              <i className="fa-solid fa-chevron-right text-[8px]"></i>
              <span className="text-sustaina-green">{activeTab}</span>
            </div>
            <h1 className="text-4xl font-black text-stone-900 capitalize tracking-tight">
              {activeTab === 'overview' ? 'Real-time Insights' : activeTab}
            </h1>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Active Orders', value: liveOrders.length.toString(), icon: 'fa-cart-flatbed', color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Est. Revenue', value: 'GH₵' + liveOrders.reduce((sum, o) => sum + (o.total || 0), 0).toFixed(0), icon: 'fa-money-bill-trend-up', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Network Farms', value: '280', icon: 'fa-people-group', color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'CO2 Saved (Kg)', value: '1,240', icon: 'fa-cloud-sun', color: 'text-sustaina-green', bg: 'bg-sustaina-green/5' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm transition-all hover:shadow-lg">
                  <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center mb-6 ${stat.color}`}>
                    <i className={`fa-solid ${stat.icon} text-2xl`}></i>
                  </div>
                  <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black text-stone-900 tracking-tight">{stat.value}</h3>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-sustaina-green rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
                <i className="fa-solid fa-bolt absolute -right-10 -bottom-10 text-white/5 text-[15rem] -rotate-12"></i>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner">
                        <i className="fa-solid fa-wand-magic-sparkles text-sustaina-yellow text-xl"></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-black tracking-tight">AI Advisor</h2>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Gemini Flash 3.0</p>
                      </div>
                    </div>
                    <button onClick={fetchAiAdvice} className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl hover:bg-white/20 transition-all border border-white/10">
                      <i className={`fa-solid fa-rotate-right ${isAiLoading ? 'animate-spin' : ''}`}></i>
                    </button>
                  </div>
                  <div className="min-h-[160px] max-w-none text-white/90 text-2xl font-medium leading-relaxed font-serif italic">
                    {isAiLoading ? (
                      <div className="flex flex-col gap-4">
                        <div className="h-4 bg-white/20 rounded-full animate-pulse w-3/4"></div>
                        <div className="h-4 bg-white/20 rounded-full animate-pulse w-1/2"></div>
                      </div>
                    ) : (
                      `"${aiAdvice || 'Connect to see live business intelligence suggestions.'}"`
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[3.5rem] p-10 border border-stone-200 shadow-sm flex flex-col">
                <h2 className="text-xl font-black text-stone-900 tracking-tight mb-8">Recent Traffic</h2>
                <div className="space-y-6 flex-grow overflow-y-auto max-h-[400px] pr-2 no-scrollbar">
                  {liveOrders.map(order => (
                    <div key={order.id} className="flex items-center justify-between group hover:bg-stone-50 p-3 rounded-2xl transition-all -mx-3">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-400 group-hover:bg-sustaina-green group-hover:text-white transition-all">
                          <i className="fa-solid fa-receipt text-xs"></i>
                        </div>
                        <div>
                          <p className="text-sm font-black text-stone-900 truncate max-w-[120px]">{order.customerName}</p>
                          <p className="text-[9px] text-stone-400 font-bold uppercase tracking-tighter">{order.region}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-stone-900">GH₵{order.total?.toFixed(0)}</p>
                      </div>
                    </div>
                  ))}
                  {liveOrders.length === 0 && (
                    <div className="text-center py-20 text-stone-300 font-bold uppercase tracking-widest text-[10px]">
                      No orders yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-[3.5rem] border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-stone-50/50 text-stone-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <tr>
                    <th className="px-10 py-6">Customer</th>
                    <th className="px-10 py-6 text-center">Location</th>
                    <th className="px-10 py-6 text-right">Amount</th>
                    <th className="px-10 py-6 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {liveOrders.map(order => (
                    <tr key={order.id} className="hover:bg-stone-50/30 transition-colors">
                      <td className="px-10 py-8">
                        <p className="font-black text-stone-900">{order.customerName}</p>
                        <p className="text-[10px] text-stone-400 font-medium">{order.email}</p>
                      </td>
                      <td className="px-10 py-8 text-center">
                        <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-[9px] font-black uppercase tracking-widest">{order.region}</span>
                      </td>
                      <td className="px-10 py-8 font-black text-stone-900 text-right">GH₵{order.total?.toFixed(2)}</td>
                      <td className="px-10 py-8">
                         <div className="flex justify-center">
                            <select 
                              value={order.status}
                              onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                              className={`text-[9px] font-black uppercase tracking-widest bg-stone-50 px-4 py-2 rounded-xl border border-stone-100 focus:outline-none ${
                                order.status === 'Delivered' ? 'text-emerald-600' : 'text-amber-500'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other tabs remain consistent with the design ... */}
      </main>
    </div>
  );
};

export default AdminDashboard;
