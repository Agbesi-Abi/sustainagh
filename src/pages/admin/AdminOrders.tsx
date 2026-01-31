import React, { useState, useEffect } from 'react';
import { Order } from '../../types';
import { getOrders, updateOrderStatus } from '../../lib/firestore';

const AdminOrders: React.FC = () => {
  const [liveOrders, setLiveOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders();
        setLiveOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, status: Order['status']) => {
    try {
      await updateOrderStatus(orderId, status);
      setLiveOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-1 flex-wrap">
            <span>Market Management</span>
            <i className="fa-solid fa-chevron-right text-[8px] hidden md:inline"></i>
            <span className="text-sustaina-green md:inline">Live Orders</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 capitalize tracking-tight">
            Live Orders
          </h1>
        </div>
      </header>

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
    </div>
  );
};

export default AdminOrders;
