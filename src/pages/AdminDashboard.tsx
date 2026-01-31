import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../../constants';
import { Product, Order } from '../types';
import { GoogleGenAI } from "@google/genai";
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { getOrders, updateOrderStatus, getProducts, addProduct, updateProduct, deleteProduct, getUsers, updateUser, deleteUser } from '../lib/firestore';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'farmers'>('overview');
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [liveOrders, setLiveOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [ordersData, productsData, usersData] = await Promise.all([
          getOrders(),
          getProducts(),
          getUsers()
        ]);
        setLiveOrders(ordersData);
        setProducts(productsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchAiAdvice = async () => {
    setIsAiLoading(true);
    try {
      const prompt = `You are a business consultant for Sustaina Ghana, an eco-conscious grocery marketplace. Recent orders: ${liveOrders.length} in last session. Stock highlights: ${PRODUCTS.slice(0, 3).map(p => p.name).join(', ')}. Suggest one high-impact operational strategy to increase our farmer network's efficiency in the next 30 days. Keep it to 2-3 sentences. Professional.`;
      const response = await getSustainaAdvice(prompt, []);
      setAiAdvice(response || 'No advice available right now.');
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
    // Close mobile sidebar when tab changes
    setIsSidebarOpen(false);
  }, [activeTab]);

  const handleUpdateStatus = async (orderId: string, status: Order['status']) => {
    try {
      await updateOrderStatus(orderId, status);
      setLiveOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setProducts(prev => prev.filter(p => p.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setShowUserModal(true);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(prev => prev.filter(u => u.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handlePromoteToAdmin = async (userId: string) => {
    if (window.confirm('Are you sure you want to promote this user to admin?')) {
      try {
        await updateUser(userId, { role: 'admin' });
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: 'admin' } : u));
        alert('User promoted to admin successfully!');
      } catch (error) {
        console.error('Error promoting user to admin:', error);
        alert('Failed to promote user to admin.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-sustaina-green text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
            <i className="fa-solid fa-leaf text-sustaina-yellow"></i>
          </div>
          <div>
            <span className="text-xl font-black tracking-tight">Sustaina</span>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Admin Control</p>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl hover:bg-white/20 transition-all"
        >
          <i className={`fa-solid ${isSidebarOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Sidebar - Mobile Overlay */}
      <aside className={`
        fixed inset-0 lg:relative lg:inset-auto z-40 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:w-72 bg-sustaina-green text-white p-4 lg:p-6 shrink-0 lg:h-screen lg:sticky lg:top-0 flex flex-col shadow-2xl
      `}>
        <div className="flex items-center justify-between lg:block mb-6 lg:mb-10 px-2">
          <div className="hidden lg:flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <i className="fa-solid fa-leaf text-sustaina-yellow"></i>
            </div>
            <div>
              <span className="text-xl font-black tracking-tight">Sustaina</span>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Admin Control</p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl hover:bg-white/20 transition-all"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="space-y-2 flex-grow">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: 'fa-chart-line' },
            { id: 'products', label: 'Inventory', icon: 'fa-boxes-stacked' },
            { id: 'orders', label: 'Live Orders', icon: 'fa-bag-shopping' },
            { id: 'farmers', label: 'Farmer Network', icon: 'fa-seedling' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center justify-between px-3 lg:px-4 py-3 rounded-xl lg:rounded-2xl transition-all duration-300 group ${
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

        <div className="mt-auto pt-6 lg:pt-8 border-t border-white/10">
          <div className="p-4 lg:p-5 bg-white/5 rounded-2xl lg:rounded-3xl border border-white/10">
             <div className="flex items-center gap-2 mb-2 lg:mb-3">
               <i className="fa-solid fa-cloud-arrow-up text-emerald-400 text-xs"></i>
               <span className="text-[10px] font-black uppercase tracking-widest">Sync Active</span>
             </div>
             <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-emerald-400"></div>
             </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-1 flex-wrap">
              <span>Market Management</span>
              <i className="fa-solid fa-chevron-right text-[8px] hidden md:inline"></i>
              <span className="text-sustaina-green md:inline">{activeTab}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 capitalize tracking-tight">
              {activeTab === 'overview' ? 'Real-time Insights' : activeTab}
            </h1>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-6 lg:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl sm:rounded-[3.5rem] border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full text-left min-w-[640px] sm:min-w-full">
                <thead className="bg-stone-50/50 text-stone-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <tr>
                    <th className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6">Customer</th>
                    <th className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 text-center">Location</th>
                    <th className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 text-right">Amount</th>
                    <th className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {liveOrders.map(order => (
                    <tr key={order.id} className="hover:bg-stone-50/30 transition-colors">
                      <td className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 min-w-[200px]">
                        <p className="font-black text-stone-900 truncate">{order.customerName}</p>
                        <p className="text-[10px] text-stone-400 font-medium truncate">{order.email}</p>
                      </td>
                      <td className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 text-center">
                        <span className="px-2 sm:px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-[9px] font-black uppercase tracking-widest inline-block">
                          {order.region}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 font-black text-stone-900 text-right">
                        GH₵{order.total?.toFixed(2)}
                      </td>
                      <td className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8">
                         <div className="flex justify-center">
                            <select 
                              value={order.status}
                              onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                              className={`text-[9px] font-black uppercase tracking-widest bg-stone-50 px-3 sm:px-4 py-2 rounded-xl border border-stone-100 focus:outline-none w-full max-w-[140px] ${
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

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">Inventory Management</h2>
              <button 
                onClick={handleAddProduct}
                className="bg-sustaina-green text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold hover:bg-sustaina-green/90 transition-all w-full sm:w-auto text-sm sm:text-base"
              >
                Add New Product
              </button>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-[3.5rem] border border-stone-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="w-full text-left min-w-[800px] sm:min-w-full">
                  <thead className="bg-stone-50/50 text-stone-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <tr>
                      <th className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6">Product</th>
                      <th className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6">Category</th>
                      <th className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 text-right">Price</th>
                      <th className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 text-center">Stock</th>
                      <th className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-stone-50/30 transition-colors">
                        <td className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <img src={product.image} alt={product.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl object-cover" />
                            <div className="min-w-0">
                              <p className="font-black text-stone-900 truncate">{product.name}</p>
                              <p className="text-[10px] text-stone-400 font-medium truncate max-w-[200px]">
                                {product.description.slice(0, 50)}...
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8">
                          <span className="px-2 sm:px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-[9px] font-black uppercase tracking-widest inline-block">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 font-black text-stone-900 text-right">
                          GH₵{product.price.toFixed(2)}
                        </td>
                        <td className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 text-center">
                          <span className="px-2 sm:px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest inline-block">
                            In Stock
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8">
                          <div className="flex justify-center gap-1 sm:gap-2">
                            <button 
                              onClick={() => handleEditProduct(product)} 
                              className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
                            >
                              <i className="fa-solid fa-edit text-xs"></i>
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id)} 
                              className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                            >
                              <i className="fa-solid fa-trash text-xs"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'farmers' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">Farmer Network</h2>
              <button 
                onClick={handleAddUser}
                className="bg-sustaina-green text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold hover:bg-sustaina-green/90 transition-all w-full sm:w-auto text-sm sm:text-base"
              >
                Add New Farmer
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {users.filter(user => user.role === 'user').map(user => (
                <div key={user.id} className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2.5rem] border border-stone-200 shadow-sm">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sustaina-green/10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-user text-sustaina-green"></i>
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-stone-900 truncate">{user.name}</p>
                      <p className="text-[10px] text-stone-400 font-medium truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="px-2 sm:px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-[9px] font-black uppercase tracking-widest">
                      {user.role}
                    </span>
                    <div className="flex gap-1 sm:gap-2">
                      {user.role === 'user' && (
                        <button 
                          onClick={() => handlePromoteToAdmin(user.id)} 
                          className="w-8 h-8 flex items-center justify-center bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all"
                          title="Promote to Admin"
                        >
                          <i className="fa-solid fa-user-shield text-xs"></i>
                        </button>
                      )}
                      <button 
                        onClick={() => handleEditUser(user)} 
                        className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
                      >
                        <i className="fa-solid fa-edit text-xs"></i>
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)} 
                        className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                      >
                        <i className="fa-solid fa-trash text-xs"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-3xl flex flex-col items-center gap-4">
              <i className="fa-solid fa-spinner animate-spin text-sustaina-green text-3xl"></i>
              <p className="text-stone-600 font-bold">Loading dashboard data...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;