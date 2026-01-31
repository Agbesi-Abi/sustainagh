import React, { useEffect, useState } from 'react';
import { Order } from '../../types';
import { getOrders, updateOrderStatus } from '../../lib/firestore';

const statusStyles: Record<Order['status'], string> = {
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Processing: 'bg-blue-50 text-blue-700 border-blue-200',
  Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (id: string, status: Order['status']) => {
    await updateOrderStatus(id, status);
    setOrders(prev =>
      prev.map(order => (order.id === id ? { ...order, status } : order))
    );
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
          Operations
        </p>
        <h1 className="text-2xl font-semibold text-stone-900">
          Orders
        </h1>
        <p className="text-sm text-stone-500 max-w-xl">
          Track, manage, and update customer orders in real time.
        </p>
      </header>

      {/* Table Card */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-sm text-stone-500">Loading orders…</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-sm text-stone-500">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Region</th>
                  <th className="px-6 py-4 text-right">Total</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-stone-50">
                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-stone-900">
                        {order.customerName}
                      </div>
                      <div className="text-xs text-stone-500">
                        {order.email}
                      </div>
                    </td>

                    {/* Region */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-stone-100 text-stone-600">
                        {order.region}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 text-right font-medium text-stone-900">
                      GH₵{order.total?.toFixed(2)}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value as Order['status'])
                        }
                        className={`
                          text-xs font-semibold rounded-md px-3 py-2 border
                          focus:outline-none focus:ring-2 focus:ring-stone-300
                          ${statusStyles[order.status]}
                        `}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminOrders;
