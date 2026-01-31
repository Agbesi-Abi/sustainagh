import React, { useState, useEffect } from 'react';
import { Order } from '../../types';
import { GoogleGenAI } from "@google/genai";
import { getOrders } from '../../lib/firestore';

const AdminOverview: React.FC = () => {
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [liveOrders, setLiveOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await getOrders();
        setLiveOrders(ordersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const fetchAiAdvice = async () => {
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-3-flash-preview';
      const prompt = `
        As a business consultant for Sustaina Ghana.
        Recent orders: ${liveOrders.length} in last session.
        Stock highlights: Various fresh local groceries.
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
    if (!aiAdvice) {
      fetchAiAdvice();
    }
  }, [aiAdvice]);

  return (
    <div className="space-y-6 lg:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-1 flex-wrap">
            <span>Market Management</span>
            <i className="fa-solid fa-chevron-right text-[8px] hidden md:inline"></i>
            <span className="text-sustaina-green md:inline">Real-time Insights</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 capitalize tracking-tight">
            Real-time Insights
          </h1>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: 'Active Orders', value: liveOrders.length.toString(), icon: 'fa-cart-flatbed', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Est. Revenue', value: 'GH₵' + liveOrders.reduce((sum, o) => sum + (o.total || 0), 0).toFixed(0), icon: 'fa-money-bill-trend-up', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Network Farms', value: '280', icon: 'fa-people-group', color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'CO2 Saved (Kg)', value: '1,240', icon: 'fa-cloud-sun', color: 'text-sustaina-green', bg: 'bg-sustaina-green/5' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border border-stone-200 shadow-sm transition-all hover:shadow-lg">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${stat.bg} flex items-center justify-center mb-4 sm:mb-6 ${stat.color}`}>
              <i className={`fa-solid ${stat.icon} text-xl sm:text-2xl`}></i>
            </div>
            <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest mb-1 truncate">{stat.label}</p>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 bg-sustaina-green rounded-2xl sm:rounded-[3.5rem] p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl">
          <i className="fa-solid fa-bolt absolute -right-4 sm:-right-10 -bottom-4 sm:-bottom-10 text-white/5 text-8xl sm:text-[15rem] -rotate-12"></i>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-10 gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner">
                  <i className="fa-solid fa-wand-magic-sparkles text-sustaina-yellow text-lg sm:text-xl"></i>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">AI Advisor</h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Gemini Flash 3.0</p>
                </div>
              </div>
              <button onClick={fetchAiAdvice} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 rounded-xl hover:bg-white/20 transition-all border border-white/10 self-start sm:self-auto">
                <i className={`fa-solid fa-rotate-right ${isAiLoading ? 'animate-spin' : ''}`}></i>
              </button>
            </div>
            <div className="min-h-[120px] sm:min-h-[160px] max-w-none text-white/90 text-lg sm:text-2xl font-medium leading-relaxed font-serif italic">
              {isAiLoading ? (
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="h-3 sm:h-4 bg-white/20 rounded-full animate-pulse w-3/4"></div>
                  <div className="h-3 sm:h-4 bg-white/20 rounded-full animate-pulse w-1/2"></div>
                </div>
              ) : (
                `"${aiAdvice || 'Connect to see live business intelligence suggestions.'}"`
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-[3.5rem] p-4 sm:p-6 lg:p-10 border border-stone-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight">Recent Orders</h2>
            <span className="text-xs text-stone-400 font-bold">{liveOrders.length} total</span>
          </div>
          <div className="space-y-4 sm:space-y-6 flex-grow overflow-y-auto max-h-[300px] sm:max-h-[400px] pr-2 no-scrollbar">
            {liveOrders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between group hover:bg-stone-50 p-3 rounded-xl sm:rounded-2xl transition-all">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-400 group-hover:bg-sustaina-green group-hover:text-white transition-all shrink-0">
                    <i className="fa-solid fa-receipt text-xs"></i>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-stone-900 truncate">{order.customerName}</p>
                    <p className="text-[9px] text-stone-400 font-bold uppercase tracking-tighter truncate">{order.region}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-black text-stone-900">GH₵{order.total?.toFixed(0)}</p>
                </div>
              </div>
            ))}
            {liveOrders.length === 0 && (
              <div className="text-center py-10 sm:py-20 text-stone-300 font-bold uppercase tracking-widest text-[10px]">
                No orders yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
