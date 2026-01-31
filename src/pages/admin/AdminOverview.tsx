import React, { useState, useEffect } from 'react';
import { Order } from '../../types';
import { getOrders } from '../../lib/firestore';

const AdminOverview: React.FC = () => {
  const [liveOrders, setLiveOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders().then(setLiveOrders).catch(console.error);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <header>
        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
          Admin / Overview
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
          Dashboard
        </h1>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Orders', value: liveOrders.length, icon: 'fa-cart-flatbed' },
          {
            label: 'Revenue',
            value: `GH₵${liveOrders.reduce((s, o) => s + (o.total || 0), 0).toFixed(0)}`,
            icon: 'fa-money-bill-wave',
          },
          { label: 'Farms', value: '280', icon: 'fa-people-group' },
          { label: 'CO₂ Saved', value: '1,240kg', icon: 'fa-leaf' },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-stone-200 rounded-xl p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500">
              <i className={`fa-solid ${item.icon}`} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase text-stone-400">
                {item.label}
              </p>
              <p className="text-xl font-black text-stone-900">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-stone-900">Recent Orders</h2>
            <span className="text-xs text-stone-400 font-bold">
              {liveOrders.length}
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[280px] pr-1">
            {liveOrders.slice(0, 5).map(order => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-stone-50 transition"
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-stone-900 truncate">
                    {order.customerName}
                  </p>
                  <p className="text-[10px] uppercase text-stone-400 truncate">
                    {order.region}
                  </p>
                </div>
                <p className="text-sm font-black text-stone-900">
                  GH₵{order.total?.toFixed(0)}
                </p>
              </div>
            ))}

            {liveOrders.length === 0 && (
              <p className="text-center text-stone-400 text-xs py-10">
                No orders yet
              </p>
            )}
          </div>
        </div>
    </div>
  );
};

export default AdminOverview;
